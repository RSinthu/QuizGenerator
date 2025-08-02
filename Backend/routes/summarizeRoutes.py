from fastapi import APIRouter, HTTPException, UploadFile, File
from schemas.summarySchema import youtubeRequest
from langchain.chains.summarize import load_summarize_chain
from langchain_community.document_loaders import  PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaLLM
import validators
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os
import tempfile
from utils.helpers import get_youtube_content

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")
router = APIRouter()
llm = ChatGroq(model="llama-3.3-70b-versatile" , api_key=groq_api_key)

llm2 = OllamaLLM(model="tinyllama:latest")

@router.post("/youtube")
async def summarizeYoutube(request:youtubeRequest):
    if not validators.url(request.url):
        raise HTTPException(status_code=400, detail="Invalid URL")
    
    try:
        docs = get_youtube_content(request.url)
        summarize_chain = load_summarize_chain(llm=llm,chain_type="stuff")
        results = summarize_chain.invoke(docs)
        return {"summary":results["output_text"]}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error summarizing video: {str(e)}")

@router.post("/pdf")
async def summarizePDF(file: UploadFile = File(...)):
    # Save to a temporary file 
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        contents = await file.read()
        tmp.write(contents)
        tmp_path = tmp.name

    try:
        # Load and split PDF into documents
        loader = PyPDFLoader(tmp_path)
        documents = loader.load()

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size = 1000,
            chunk_overlap = 200
        )
        docs = text_splitter.split_documents(documents)

        summarize_chain = load_summarize_chain(llm=llm,chain_type="stuff")
        results = summarize_chain.invoke(docs)
        return {"summary":results["output_text"]}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error summarizing PDF: {str(e)}")
    
    finally:
        #clean up temp file
        os.remove(tmp_path)

