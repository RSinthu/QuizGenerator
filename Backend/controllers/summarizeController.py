import os
from langchain.chains.summarize import load_summarize_chain
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import google.generativeai as genai
import fitz
import io
from PIL import Image
from langchain_core.documents import Document

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")
google_api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=google_api_key)

llm = ChatGroq(model="llama-3.3-70b-versatile", api_key=groq_api_key)
gemini_llm = genai.GenerativeModel('gemini-2.0-flash-exp')

class MultimodalSummarizeChain:
    """Custom summarization chain for multimodal content"""
    
    def __init__(self, chain_type="stuff"):
        self.chain_type = chain_type
        self.model = gemini_llm
        self.fallback_llm = llm
    
    def invoke(self, documents):
        """Process documents similar to load_summarize_chain"""
        if self.chain_type == "stuff":
            return self._stuff_chain(documents)
        elif self.chain_type == "map_reduce":
            return self._map_reduce_chain(documents)
        else:
            raise ValueError(f"Unsupported chain type: {self.chain_type}")
    
    def _stuff_chain(self, documents):
        """Stuff all documents into a single prompt"""
        text_parts = []
        image_parts = []
        
        for doc in documents:
            if doc.metadata.get("type") == "image":
                image_parts.append(doc.metadata["image_data"])
            else:
                page_info = f"[Page {doc.metadata.get('page', 'Unknown')}]" if doc.metadata.get('page') is not None else ""
                text_parts.append(f"{page_info}\n{doc.page_content}")
        
        # Create summarization prompt
        prompt = f"""Please provide a comprehensive summary of the following document. 
        Include insights from both text content and any visual elements.

        Structure your summary with:
        1. Main Topic/Overview  
        2. Key Points
        3. Important Details
        4. Visual Elements (if any)
        5. Conclusion

        Document Content:
        {chr(10).join(text_parts)}
        """
        
        try:
            if image_parts:
                # Use Gemini for multimodal content
                content_parts = [prompt] + image_parts
                response = self.model.generate_content(content_parts)
                return {"output_text": response.text}
            else:
                # Use fallback LLM for text-only
                text_doc = Document(page_content=chr(10).join(text_parts))
                chain = load_summarize_chain(llm=self.fallback_llm, chain_type="stuff")
                return chain.invoke([text_doc])
                
        except Exception as e:
            # Fallback to text-only processing
            text_doc = Document(page_content=chr(10).join(text_parts))
            chain = load_summarize_chain(llm=self.fallback_llm, chain_type="stuff")
            return chain.invoke([text_doc])
    
    def _map_reduce_chain(self, documents):
        """Map-reduce approach for large documents"""
        # First, summarize each chunk
        chunk_summaries = []
        
        # Group documents by type and process in chunks
        current_chunk = []
        current_chunk_size = 0
        max_chunk_size = 10000  # characters
        
        for doc in documents:
            doc_size = len(doc.page_content)
            
            if current_chunk_size + doc_size > max_chunk_size and current_chunk:
                # Process current chunk
                chunk_summary = self._stuff_chain(current_chunk)
                chunk_summaries.append(chunk_summary["output_text"])
                current_chunk = [doc]
                current_chunk_size = doc_size
            else:
                current_chunk.append(doc)
                current_chunk_size += doc_size
        
        # Process remaining chunk
        if current_chunk:
            chunk_summary = self._stuff_chain(current_chunk)
            chunk_summaries.append(chunk_summary["output_text"])
        
        # Combine chunk summaries
        combined_text = "\n\n".join([f"Section {i+1}: {summary}" for i, summary in enumerate(chunk_summaries)])
        
        final_prompt = f"""Based on these section summaries, create a comprehensive final summary:

{combined_text}

Provide a well-structured final summary that combines all sections."""
        
        try:
            response = self.model.generate_content(final_prompt)
            return {"output_text": response.text}
        except Exception:
            # Fallback
            final_doc = Document(page_content=combined_text)
            chain = load_summarize_chain(llm=self.fallback_llm, chain_type="stuff")
            return chain.invoke([final_doc])

def extract_multimodal_documents(pdf_path):
    """Extract documents in LangChain-compatible format with multimodal support"""
    doc = fitz.open(pdf_path)
    documents = []
    
    for page_num, page in enumerate(doc):
        # Extract text
        text = page.get_text()
        if text.strip():
            text_doc = Document(
                page_content=text,
                metadata={"page": page_num, "type": "text"}
            )
            documents.append(text_doc)
        
        # Extract images
        for img_index, img in enumerate(page.get_images(full=True)):
            try:
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                
                # Convert to format Gemini expects
                pil_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
                buffered = io.BytesIO()
                pil_image.save(buffered, format="PNG")
                img_bytes = buffered.getvalue()
                
                # Create document with image reference
                image_doc = Document(
                    page_content=f"[Image {img_index + 1} on page {page_num + 1}]",
                    metadata={
                        "page": page_num,
                        "type": "image", 
                        "image_data": {
                            "inline_data": {
                                "mime_type": "image/png",
                                "data": img_bytes
                            }
                        }
                    }
                )
                documents.append(image_doc)
                
            except Exception as e:
                print(f"Error processing image {img_index} on page {page_num}: {e}")
                continue
    
    doc.close()
    return documents