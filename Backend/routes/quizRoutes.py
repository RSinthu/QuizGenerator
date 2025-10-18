from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from schemas.quizScehma import youtubeQuiz, QuizResponse
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import validators
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os
import tempfile
from utils.helpers import get_youtube_content
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.prompts import PromptTemplate
import json
from controllers.pdfController import get_related_docs
import google.generativeai as genai

genai.configure(api_key = os.getenv("GOOGLE_API_KEY"))
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")
router = APIRouter()
llm = ChatGroq(model="llama-3.3-70b-versatile", api_key=groq_api_key)

# llm = OllamaLLM(model="tinyllama:latest")

# Fixed prompt template with proper structure and formatting
prompt = PromptTemplate(
    template="""\
You are a quiz generation bot. Generate a properly formatted JSON array of quiz questions.

Constraints:
- Topic: {area}
- Number of Questions: {no}
- Difficulty: {difficulty}

Context:
{context}

IMPORTANT: Your response must be ONLY a JSON array in this exact format with no additional text:
[
  {{
    "id": 1,
    "question": "Question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "difficulty": "{difficulty}"
  }},
  {{
    "id": 2,
    "question": "Next question here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 1,
    "difficulty": "{difficulty}"
  }}
]

Do not include any other text, explanation, or formatting outside the JSON array.
""",
    input_variables=["area", "no", "difficulty", "context"]
)

def create_quiz_prompt(area, no, difficulty):
    return f"""You are a quiz generation bot. Generate a properly formatted JSON array of quiz questions.

Constraints:
- Topic: {area}
- Number of Questions: {no}
- Difficulty: {difficulty}

IMPORTANT: Your response must be ONLY a JSON array in this exact format with no additional text:
[
  {{
    "id": 1,
    "question": "Question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "difficulty": "{difficulty}"
  }}
]

Do not include any other text, explanation, or formatting outside the JSON array.
Create the question based on provided context:
"""



def retrieval_chain(documents):
    # Split documents into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=100
    )
    docs = text_splitter.split_documents(documents)

        
    # Create FAISS vector store with embedding model
    faiss_db = FAISS.from_documents(docs, embedding_model)
    retriever = faiss_db.as_retriever(search_type="mmr", search_kwargs={"k": 5})

    # Create document chain
    combine_docs_chain = create_stuff_documents_chain(llm, prompt)

    # Create retrieval chain
    retrieval_chain = create_retrieval_chain(retriever, combine_docs_chain)

    return retrieval_chain




@router.post("/youtube", response_model = QuizResponse)
async def youtubeQuiz(request: youtubeQuiz):
    if not validators.url(request.url):
        raise HTTPException(status_code=400, detail="Invalid URL")
    
    try:
        specificArea = request.specificArea
        noQuestions = request.no
        difficultyLevel = request.difficulty

        # Get YouTube content
        documents = get_youtube_content(request.url)

        # Create retrieval chain
        chain = retrieval_chain(documents)

        # Generate quiz
        result = chain.invoke({
            "input": f"Generate {noQuestions} quiz questions about {specificArea} at {difficultyLevel} difficulty",
            "area": specificArea,
            "no": noQuestions,
            "difficulty": difficultyLevel
        })
        
        parsed_quiz = json.loads(result["answer"])
        return {"quiz": parsed_quiz}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating quiz: {str(e)}")
    

@router.post("/pdf", response_model = QuizResponse)
async def pdfQuiz(
    file: UploadFile = File(...),
    specificArea: str = Form(...),
    no: int = Form(...),
    difficulty: str = Form(...)
):
    # Save to a temporary file 
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        contents = await file.read()
        tmp.write(contents)
        tmp_path = tmp.name

    try:

        context_parts = get_related_docs(tmp_path, specificArea)
        
        # Separate text and image parts
        text_parts = [part for part in context_parts if isinstance(part, str)]
        image_parts = [part for part in context_parts if isinstance(part, dict)]
        
        # Create proper Gemini input
        full_prompt = create_quiz_prompt(specificArea, no, difficulty) + "\n".join(text_parts)
        
        contents = [full_prompt] + image_parts
        
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        response = model.generate_content(contents)


        response_text = (response.text or "").strip()
        if response_text.startswith("```"):
            # remove code fences like ```json ... ```
            response_text = response_text.strip("`")
            if response_text.lower().startswith("json"):
                response_text = response_text[4:].strip()
        # extract the JSON array
        start = response_text.find("[")
        end = response_text.rfind("]")
        if start == -1 or end == -1:
            raise ValueError("Model did not return a JSON array.")
        payload = response_text[start:end+1]
        parsed_quiz = json.loads(payload)

        return {"quiz": parsed_quiz}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating quiz from PDF: {str(e)}")
    finally:
        try:
            os.remove(tmp_path)
        except Exception:
            pass