import fitz  # PyMuPDF
from langchain_core.documents import Document
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import torch
import numpy as np
from langchain.chat_models import init_chat_model
from langchain.prompts import PromptTemplate
from langchain.schema.messages import HumanMessage
from sklearn.metrics.pairwise import cosine_similarity
import os
import base64
import io
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS


device = "cuda" if torch.cuda.is_available() else "cpu"
clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32").to(device).eval()
clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

### Embedding functions
def embed_image(image_data):
    """Embed image using CLIP"""
    if isinstance(image_data, str):  # If path
        image = Image.open(image_data).convert("RGB")
    else:  # If PIL Image
        image = image_data
    
    inputs=clip_processor(images=image,return_tensors="pt")
    with torch.no_grad():
        features = clip_model.get_image_features(**inputs)
        # Normalize embeddings to unit vector
        features = features / features.norm(dim=-1, keepdim=True)
        return features.squeeze().numpy()
    
def embed_text(text):
    """Embed text using CLIP."""
    inputs = clip_processor(
        text=text, 
        return_tensors="pt", 
        padding=True,
        truncation=True,
        max_length=77  # CLIP's max token length
    )
    with torch.no_grad():
        features = clip_model.get_text_features(**inputs)
        # Normalize embeddings
        features = features / features.norm(dim=-1, keepdim=True)
        return features.squeeze().numpy()
    


def get_related_docs(path,query):
    doc=fitz.open(path)
    # Storage for all documents and embeddings
    all_docs = []
    all_embeddings = []
    image_data_store = {}  # Store actual image data for LLM

    # Text splitter
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)

    for i,page in enumerate(doc):
        ## process text
        text=page.get_text()
        if text.strip():
            ##create temporary document for splitting
            temp_doc = Document(page_content=text, metadata={"page": i, "type": "text"})
            text_chunks = splitter.split_documents([temp_doc])

            #Embed each chunk using CLIP
            for chunk in text_chunks:
                embedding = embed_text(chunk.page_content)
                all_embeddings.append(embedding)
                all_docs.append(chunk)



        ## process images
        ##Three Important Actions:

        ##Extract and convert PDF images to a usable format (PIL Image)
        ##Store the image bytes for later multimodal use (Gemini inline_data)
        ##Create CLIP embedding for retrieval

        for img_index, img in enumerate(page.get_images(full=True)):
            try:
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]

                pil_image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

                image_id = f"page_{i}_img_{img_index}"

                # Store PNG bytes (not base64) for Gemini inline_data
                buffered = io.BytesIO()
                pil_image.save(buffered, format="PNG")
                img_bytes = buffered.getvalue()
                image_data_store[image_id] = img_bytes

                # Embed image using CLIP
                embedding = embed_image(pil_image)
                all_embeddings.append(embedding)

                image_doc = Document(
                    page_content=f"[Image: {image_id}]",
                    metadata={"page": i, "type": "image", "image_id": image_id}
                )
                all_docs.append(image_doc)

            except Exception as e:
                print(f"Error processing image {img_index} on page {i}: {e}")
                continue

    doc.close()

    embeddings_array = np.array(all_embeddings, dtype=np.float32)

    vector_store = FAISS.from_embeddings(
        text_embeddings=[(doc.page_content, emb) for doc, emb in zip(all_docs, embeddings_array)],
        embedding=None,
        metadatas=[doc.metadata for doc in all_docs]
    )

    query_embedding = embed_text(query)

    results = vector_store.similarity_search_by_vector(
        embedding=query_embedding,
        k=5
    )

    parts = []
    parts.append(f"Question: {query}\n\nContext:\n")

    text_docs = [doc for doc in results if doc.metadata.get("type") == "text"]
    image_docs = [doc for doc in results if doc.metadata.get("type") == "image"]

    if text_docs:
        text_context = "\n\n".join([
            f"[Page {doc.metadata['page']}]: {doc.page_content}"
            for doc in text_docs
        ])
        parts.append(f"Text excerpts:\n{text_context}\n")

    for doc in image_docs:
        image_id = doc.metadata.get("image_id")
        if image_id and image_id in image_data_store:
            parts.append(f"\n[Image from page {doc.metadata['page']}]:\n")
            parts.append({
                "inline_data": {
                    "mime_type": "image/png",
                    "data": image_data_store[image_id]  # raw bytes for Gemini
                }
            })

    return parts