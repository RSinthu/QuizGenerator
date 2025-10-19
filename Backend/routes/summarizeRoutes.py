import os
from fastapi import APIRouter, HTTPException, UploadFile, File
from schemas.summarySchema import youtubeRequest
from langchain.chains.summarize import load_summarize_chain
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import validators
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import tempfile
from utils.helpers import get_youtube_content
import google.generativeai as genai
import fitz
from langchain_core.documents import Document
from controllers.summarizeController import extract_multimodal_documents, MultimodalSummarizeChain

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")
google_api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=google_api_key)

router = APIRouter()
llm = ChatGroq(model="llama-3.3-70b-versatile", api_key=groq_api_key)
gemini_llm = genai.GenerativeModel('gemini-2.0-flash-exp')


@router.post("/youtube")
async def summarizeYoutube(request: youtubeRequest):
    if not validators.url(request.url):
        raise HTTPException(status_code=400, detail="Invalid URL")
    
    try:
        docs = get_youtube_content(request.url)
        summarize_chain = load_summarize_chain(llm=llm, chain_type="stuff")
        results = summarize_chain.invoke(docs)
        return {"summary": results["output_text"]}
    
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
        # Check if PDF contains images
        doc = fitz.open(tmp_path)
        has_images = any(page.get_images() for page in doc)
        doc.close()
        
        if has_images:
            # Use multimodal approach
            documents = extract_multimodal_documents(tmp_path)
            
            # Split text documents while preserving image documents
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000,
                chunk_overlap=200
            )
            
            processed_docs = []
            for doc in documents:
                if doc.metadata.get("type") == "text":
                    split_docs = text_splitter.split_documents([doc])
                    processed_docs.extend(split_docs)
                else:
                    processed_docs.append(doc)
            
            # Use custom multimodal chain
            multimodal_chain = MultimodalSummarizeChain(chain_type="map_reduce")
            results = multimodal_chain.invoke(processed_docs)
            
            return {
                "summary": results["output_text"]
            }
        
        else:
            # Use standard LangChain approach for text-only PDFs
            loader = PyPDFLoader(tmp_path)
            documents = loader.load()

            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000,
                chunk_overlap=200
            )
            docs = text_splitter.split_documents(documents)

            summarize_chain = load_summarize_chain(llm=llm, chain_type="stuff")
            results = summarize_chain.invoke(docs)
            
            return {
                "summary": results["output_text"]
            }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error summarizing PDF: {str(e)}")
    
    finally:
        # Clean up temp file
        try:
            os.remove(tmp_path)
        except Exception:
            pass