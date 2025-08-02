# Quiz Generator & Summarizer

A full-stack web application that transforms PDFs and YouTube videos into interactive quizzes and comprehensive summaries using AI-powered content processing.

![Project Banner](https://via.placeholder.com/800x200/4F46E5/FFFFFF?text=Quiz+Generator+%26+Summarizer)

## 🚀 Features

### Content Processing
- **PDF Upload**: Upload PDF documents up to 10MB for text extraction and processing
- **YouTube Integration**: Process YouTube videos using transcripts, captions, or descriptions
- **Drag & Drop Interface**: Intuitive file upload with drag-and-drop functionality

### AI-Powered Functionality
- **Smart Summarization**: Generate comprehensive summaries with key points extraction and structured overviews
- **Interactive Quiz Generation**: Create multiple-choice questions with customizable difficulty levels
- **Content Analysis**: Extract main themes and concepts from uploaded content

### Quiz Features
- **Customizable Configuration**:
  - Number of questions (3, 5, 10, 15, or 20)
  - Difficulty levels (Easy, Medium, Hard)
  - Specific topic focusing
- **Interactive Experience**:
  - Real-time progress tracking
  - Instant feedback with correct/incorrect indicators
  - Score calculation and performance analytics
  - Question review with explanations

### Export & Sharing
- **Multiple Export Formats**:
  - PDF export with professional formatting
  - Markdown format for documentation
  - Plain text for simple sharing
- **Copy to Clipboard**: Quick sharing functionality
- **Summary Statistics**: Word count, character count, and generation timestamps

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **React Markdown** - Markdown rendering with GitHub Flavored Markdown support
- **Axios** - HTTP client for API communication

### Backend
- **FastAPI** - Modern Python web framework
- **LangChain** - AI/ML framework for document processing
- **Groq API** - High-performance LLM inference
- **Ollama** - Local LLM support
- **FAISS** - Vector database for document similarity search
- **HuggingFace Transformers** - Embedding models

### AI/ML Libraries
- **sentence-transformers** - Text embedding generation
- **youtube-transcript-api** - YouTube transcript extraction
- **yt-dlp** - YouTube video information extraction
- **PyPDF** - PDF text extraction
- **Validators** - URL and input validation

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **Groq API Key** (for LLM processing)

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
- Each option shows supported formats and use cases

### Step 2: Upload Content
- **PDF**: Drag & drop or browse for PDF files (max 10MB)
- **YouTube**: Paste video URL in supported formats:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `https://www.youtube.com/embed/VIDEO_ID`

### Step 3: Configure Action
- **Generate Summary**: Create comprehensive content overview
- **Generate Quiz**: Create interactive questions with:
  - Custom question count (3-20 questions)
  - Difficulty selection (Easy/Medium/Hard)
  - Optional topic focusing

### Step 4: Review Results
- **Summary Results**: View, copy, or export in multiple formats
- **Quiz Experience**: Take interactive quiz with progress tracking
- **Performance Analysis**: Review answers with detailed explanations

## 📁 Project Structure

```
QuizGenerator/
├── Backend/
│   ├── main.py                 # FastAPI application entry point
│   ├── routes/
│   │   ├── summarizeRoutes.py  # Summary generation endpoints
│   │   └── quizRoutes.py       # Quiz generation endpoints
│   ├── schemas/
│   │   ├── summarySchema.py    # Pydantic models for summaries
│   │   └── quizScehma.py       # Pydantic models for quizzes
│   ├── utils/
│   │   └── helpers.py          # YouTube content extraction utilities
│   └── requirements.txt        # Python dependencies
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── configure/      # Configuration components
    │   │   ├── results/        # Results display components
    │   │   └── upload/         # File upload components
    │   ├── api/
    │   │   └── api.js          # Axios configuration
    │   └── App.jsx             # Main application component
    ├── package.json            # Node.js dependencies
    └── vite.config.js          # Vite configuration
```

## 🔧 API Endpoints

### Summary Generation
- `POST /summary/youtube` - Generate summary from YouTube URL
- `POST /summary/pdf` - Generate summary from uploaded PDF

### Quiz Generation
- `POST /quiz/youtube` - Generate quiz from YouTube URL
- `POST /quiz/pdf` - Generate quiz from uploaded PDF

## 🎨 Features in Detail

### Smart Content Processing
- **PDF Text Extraction**: Advanced parsing with chunking for large documents
- **YouTube Transcript**: Multi-fallback approach (transcripts → descriptions)
- **Vector Search**: FAISS-powered similarity search for relevant content sections

### Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Accessibility**: Screen reader friendly with proper ARIA labels

### Performance Optimization
- **Lazy Loading**: Components loaded on demand
- **Caching**: Efficient API response caching
- **Chunked Processing**: Large documents processed in manageable chunks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **LangChain** for document processing capabilities
- **Groq** for high-performance LLM inference
- **Tailwind CSS** for beautiful, responsive design
- **React** ecosystem for modern frontend development

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Made with ❤️ using React, FastAPI, and AI**