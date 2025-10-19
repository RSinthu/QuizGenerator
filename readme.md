# Quiz Generator & Summarizer

A full-stack web application that transforms PDFs and YouTube videos into interactive quizzes and comprehensive summaries using advanced AI-powered content processing with multimodal support.

## 🚀 Features

### Content Processing
- **PDF Upload**: Upload PDF documents up to 10MB with advanced multimodal processing
  - Text extraction and chunking
  - Image detection and processing
  - OCR capabilities for image-heavy documents
- **YouTube Integration**: Process YouTube videos using multiple fallback methods
  - Transcript extraction via YouTube API
  - Fallback to video descriptions when transcripts unavailable
  - Support for various YouTube URL formats
- **Drag & Drop Interface**: Intuitive file upload with drag-and-drop functionality

### AI-Powered Functionality
- **Smart Summarization**: 
  - Comprehensive summaries with key points extraction
  - Multimodal analysis (text + images for PDFs)
  - Structured overviews with main themes
  - Support for both text-only and image-rich documents
- **Interactive Quiz Generation**: 
  - Multiple-choice questions with customizable parameters
  - Context-aware question generation using vector similarity search
  - CLIP-based multimodal retrieval for relevant content sections
- **Advanced Content Analysis**: 
  - FAISS vector database for similarity search
  - CLIP embeddings for text and image understanding
  - Semantic chunking and retrieval

### Quiz Features
- **Customizable Configuration**:
  - Number of questions (3, 5, 10, 15, or 20)
  - Difficulty levels (Easy, Medium, Hard) with visual indicators
  - Specific topic focusing with context-aware generation
  - Topic-specific content filtering
- **Interactive Experience**:
  - Real-time progress tracking with animated progress bars
  - Instant feedback with correct/incorrect indicators
  - Score calculation and performance analytics
  - Question review with detailed explanations
  - Difficulty badges for each question
- **Quiz Navigation**:
  - Previous/Next question navigation
  - Answer persistence across navigation
  - Final results with comprehensive review

### Export & Sharing
- **Multiple Export Formats**:
  - PDF export with professional formatting and styling
  - Markdown format for documentation
  - Plain text for simple sharing
- **Copy to Clipboard**: Quick sharing functionality
- **Summary Statistics**: Word count, character count, and generation timestamps
- **Rich Text Formatting**: GitHub Flavored Markdown support with custom styling

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **Vite 7** - Lightning-fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework with Vite plugin
- **Lucide React** - Beautiful icon library (530+ icons)
- **React Markdown** - Markdown rendering with GitHub Flavored Markdown support
- **Remark GFM** - GitHub Flavored Markdown plugin
- **Axios** - HTTP client for API communication

### Backend
- **FastAPI** - Modern Python web framework with automatic API documentation
- **LangChain 0.2.16** - AI/ML framework for document processing and chains
- **Groq API** - High-performance LLM inference (Llama 3.3 70B)
- **Google Gemini 2.0 Flash** - Multimodal AI for image + text processing
- **FAISS** - Vector database for document similarity search
- **HuggingFace Transformers** - Embedding models and NLP tools

### AI/ML Libraries
- **OpenAI CLIP** - Multimodal embeddings for text and image understanding
- **sentence-transformers** - Text embedding generation (all-MiniLM-L6-v2)
- **PyTorch** - Deep learning framework for CLIP model inference
- **scikit-learn** - Cosine similarity calculations
- **youtube-transcript-api** - YouTube transcript extraction
- **yt-dlp** - YouTube video information extraction
- **PyMuPDF (fitz)** - Advanced PDF processing with image extraction
- **Pillow (PIL)** - Image processing and format conversion

### Data Processing
- **RecursiveCharacterTextSplitter** - Intelligent text chunking
- **Vector Stores** - FAISS-based similarity search
- **Multimodal Chains** - Custom implementation for text + image processing
- **CORS Middleware** - Cross-origin resource sharing support

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **Groq API Key** (for LLM processing)
- **Google API Key** (for Gemini multimodal processing)

## 🚀 Installation

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd QuizGenerator/Backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment configuration**
   ```bash
   # Create .env file
   echo "GROQ_API_KEY=your_groq_api_key_here" > .env
   echo "GOOGLE_API_KEY=your_google_api_key_here" >> .env
   ```

5. **Start the backend server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   ```
   http://localhost:5173
   ```

## 🎯 Usage Guide

### Step 1: Choose Content Source
- Select between **PDF Document** or **YouTube Video**
- Each option shows supported formats and perfect use cases
- Visual icons and descriptions guide selection

### Step 2: Upload Content
- **PDF**: Drag & drop or browse for PDF files (max 10MB)
  - Supports text-heavy documents
  - Processes images and diagrams
  - Handles mixed content types
- **YouTube**: Paste video URL in supported formats:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `https://www.youtube.com/embed/VIDEO_ID`

### Step 3: Configure Action
- **Generate Summary**: 
  - Creates comprehensive content overview
  - Includes visual elements analysis for PDFs
  - Structured with main topics and key points
- **Generate Quiz**: 
  - Interactive questions with context-aware generation
  - Custom question count (3-20 questions)
  - Difficulty selection with color-coded indicators
  - Specific topic focusing (required field)

### Step 4: Review Results
- **Summary Results**: 
  - Formatted with ReactMarkdown
  - Multiple export options (PDF, Markdown, TXT)
  - Copy to clipboard functionality
  - Word/character count statistics
- **Quiz Experience**: 
  - Interactive quiz with progress tracking
  - Difficulty badges for each question
  - Navigation between questions
  - Answer persistence
- **Performance Analysis**: 
  - Comprehensive results review
  - Correct/incorrect answer indicators
  - Score percentage calculation
  - Option to retake quiz or start new content

## 📁 Project Structure

```
QuizGenerator/
├── Backend/
│   ├── main.py                    # FastAPI application entry point
│   ├── routes/
│   │   ├── summarizeRoutes.py     # Summary generation endpoints
│   │   └── quizRoutes.py          # Quiz generation endpoints (multimodal)
│   ├── controllers/
│   │   ├── summarizeController.py # Multimodal summarization logic
│   │   └── quizController.py      # CLIP-based retrieval and quiz logic
│   ├── schemas/
│   │   ├── summarySchema.py       # Pydantic models for summaries
│   │   └── quizScehma.py          # Pydantic models for quizzes
│   ├── utils/
│   │   └── helpers.py             # YouTube content extraction utilities
│   └── requirements.txt           # Python dependencies
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── configure/         # Action selection and quiz configuration
    │   │   │   ├── ActionSelection.jsx
    │   │   │   └── QuizConfiguration.jsx
    │   │   ├── results/           # Results display components
    │   │   │   ├── QuizComplete.jsx
    │   │   │   ├── QuizQuestion.jsx
    │   │   │   ├── QuizResults.jsx
    │   │   │   └── SummaryResults.jsx
    │   │   ├── upload/            # File upload components
    │   │   │   ├── PDFUpload.jsx
    │   │   │   └── YouTubeUpload.jsx
    │   │   ├── ConfigureAction.jsx
    │   │   ├── ContentTypeSelection.jsx
    │   │   ├── ContentUpload.jsx
    │   │   ├── Results.jsx
    │   │   └── StepIndicator.jsx
    │   ├── api/
    │   │   └── api.js             # Axios configuration
    │   ├── App.jsx                # Main application component
    │   ├── main.jsx               # React root
    │   └── index.css              # Global styles with custom ReactMarkdown styling
    ├── package.json               # Node.js dependencies
    ├── vite.config.js             # Vite configuration with Tailwind plugin
    └── index.html                 # HTML entry point
```

## 🔧 API Endpoints

### Summary Generation
- `POST /summary/youtube` - Generate summary from YouTube URL
- `POST /summary/pdf` - Generate multimodal summary from uploaded PDF

### Quiz Generation
- `POST /quiz/youtube` - Generate quiz from YouTube URL with topic focusing
- `POST /quiz/pdf` - Generate quiz from uploaded PDF with multimodal content retrieval

### Request/Response Schemas
- **YouTube Quiz**: `{url, specificArea, no, difficulty}`
- **PDF Quiz**: Form data with file, specificArea, no, difficulty
- **Quiz Response**: Array of questions with id, question, options, correct, difficulty

## 🎨 Advanced Features

### Multimodal Content Processing
- **PDF Image Extraction**: PyMuPDF-based image detection and extraction
- **CLIP Embeddings**: Text and image embeddings for semantic similarity
- **Vector Similarity Search**: FAISS-powered content retrieval
- **Gemini Integration**: Google's multimodal AI for image + text understanding

### Smart Quiz Generation
- **Context-Aware Questions**: Questions generated from most relevant content sections
- **Difficulty-Based Styling**: Color-coded difficulty indicators (green/yellow/red)
- **Topic Filtering**: Specific area focusing with vector search
- **Fallback Mechanisms**: Multiple content extraction strategies

### Enhanced UI/UX
- **Step-by-Step Wizard**: Clear progression through content processing
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Animated spinners and processing indicators
- **Error Handling**: Graceful fallbacks and user feedback

### Export Capabilities
- **Professional PDF Export**: Styled document generation with print functionality
- **Markdown Export**: GitHub-compatible markdown with metadata
- **Statistics Display**: Word count, character count, generation timestamps
- **Copy to Clipboard**: One-click sharing functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **LangChain** for comprehensive document processing capabilities
- **Groq** for high-performance LLM inference
- **Google Gemini** for advanced multimodal AI processing
- **OpenAI CLIP** for text-image understanding
- **Tailwind CSS** for beautiful, responsive design
- **React** ecosystem for modern frontend development
- **FastAPI** for robust API development
- **FAISS** for efficient vector similarity search