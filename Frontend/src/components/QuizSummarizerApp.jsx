import React, { useState, useRef } from 'react';
import { Upload, FileText, Youtube, Brain, Search, Download, ChevronRight, CheckCircle, XCircle, RotateCcw, ArrowLeft, ArrowRight, Globe } from 'lucide-react';

function QuizSummarizerApp () {
  const [step, setStep] = useState('select'); // 'select', 'upload', 'configure', 'results'
  const [contentType, setContentType] = useState(''); // 'pdf', 'youtube', or 'websearch'
  const [file, setFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [webSearchQuery, setWebSearchQuery] = useState('');
  const [processing, setProcessing] = useState(false);
  const [summary, setSummary] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [specificTopic, setSpecificTopic] = useState('');
  const [actionType, setActionType] = useState(''); // 'summarize' or 'quiz'
  const fileInputRef = useRef(null);

  // Sample quiz data for demonstration - different difficulties
  const generateSampleQuiz = (numQuestions, difficulty) => {
    const questionPools = {
      easy: [
        {
          id: 1,
          question: "What is the main topic discussed in the content?",
          options: ["Technology", "Science", "History", "Literature"],
          correct: 0,
          difficulty: "easy"
        },
        {
          id: 2,
          question: "Which field is primarily covered?",
          options: ["Medicine", "Engineering", "Arts", "Business"],
          correct: 1,
          difficulty: "easy"
        },
        {
          id: 3,
          question: "What type of content is this?",
          options: ["Educational", "Entertainment", "News", "Fiction"],
          correct: 0,
          difficulty: "easy"
        },
        {
          id: 4,
          question: "Is this content factual or opinion-based?",
          options: ["Factual", "Opinion", "Mixed", "Unclear"],
          correct: 0,
          difficulty: "easy"
        },
        {
          id: 5,
          question: "What is the primary format of the content?",
          options: ["Text", "Video", "Audio", "Interactive"],
          correct: 0,
          difficulty: "easy"
        }
      ],
      medium: [
        {
          id: 6,
          question: "Which concept is most emphasized in the content?",
          options: ["Innovation", "Tradition", "Analysis", "Implementation"],
          correct: 2,
          difficulty: "medium"
        },
        {
          id: 7,
          question: "What methodology is primarily discussed?",
          options: ["Qualitative research", "Quantitative analysis", "Mixed methods", "Theoretical framework"],
          correct: 1,
          difficulty: "medium"
        },
        {
          id: 8,
          question: "How does the content approach problem-solving?",
          options: ["Systematic", "Creative", "Traditional", "Experimental"],
          correct: 0,
          difficulty: "medium"
        },
        {
          id: 9,
          question: "What is the scope of the discussion?",
          options: ["Local", "Regional", "National", "Global"],
          correct: 3,
          difficulty: "medium"
        },
        {
          id: 10,
          question: "Which stakeholders are primarily addressed?",
          options: ["Students", "Professionals", "Researchers", "General public"],
          correct: 2,
          difficulty: "medium"
        }
      ],
      hard: [
        {
          id: 11,
          question: "What are the underlying theoretical implications of the presented framework?",
          options: ["Paradigm shift in methodology", "Incremental improvement", "Validation of existing theories", "Complete theoretical overhaul"],
          correct: 0,
          difficulty: "hard"
        },
        {
          id: 12,
          question: "How do the presented findings challenge conventional wisdom?",
          options: ["They don't challenge it", "Partial contradiction", "Complete refutation", "Contextual disagreement"],
          correct: 2,
          difficulty: "hard"
        },
        {
          id: 13,
          question: "What are the epistemological foundations of the arguments presented?",
          options: ["Empiricism", "Rationalism", "Constructivism", "Pragmatism"],
          correct: 2,
          difficulty: "hard"
        },
        {
          id: 14,
          question: "Which critical analysis framework best applies to this content?",
          options: ["Deconstructive", "Comparative", "Systematic", "Meta-analytical"],
          correct: 3,
          difficulty: "hard"
        },
        {
          id: 15,
          question: "What are the long-term implications for the field discussed?",
          options: ["Minimal impact", "Moderate evolution", "Significant transformation", "Revolutionary change"],
          correct: 2,
          difficulty: "hard"
        }
      ]
    };

    const pool = questionPools[difficulty];
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(numQuestions, pool.length));
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    }
  };

  const addWebSearchTopic = () => {
    // Removed - no longer needed
  };

  const removeWebSearchTopic = (index) => {
    // Removed - no longer needed
  };

  const updateWebSearchTopic = (index, value) => {
    // Removed - no longer needed
  };

  const processContent = async (type) => {
    setProcessing(true);
    setSummary('');
    setQuiz([]);
    setAnswers({});
    setShowResults(false);
    setCurrentQuestion(0);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock summary generation based on content type
    let mockSummary = '';
    if (type === 'summarize') {
      switch (contentType) {
        case 'pdf':
          mockSummary = `This PDF document covers key concepts in the uploaded material. The main themes include comprehensive analysis of the subject matter, detailed explanations of core principles, and practical applications. The document provides structured information that serves as a valuable reference for understanding the topic in depth.`;
          break;
        case 'youtube':
          mockSummary = `This YouTube video (${youtubeUrl}) presents educational content with clear explanations and visual demonstrations. The main points covered include step-by-step processes, expert insights, and practical examples. The video format allows for engaging presentation of complex topics through multimedia elements.`;
          break;
        case 'websearch':
          mockSummary = `Based on web search results for "${webSearchQuery}", the content covers current information and diverse perspectives on the subject. The research includes recent developments, expert opinions, and comprehensive coverage of the specified topic.`;
          break;
        default:
          mockSummary = "Content processed successfully with comprehensive analysis of key themes and concepts.";
      }
    }

    // Mock quiz generation
    const mockQuiz = type === 'quiz' ? generateSampleQuiz(numQuestions, difficulty) : [];

    if (type === 'summarize') {
      setSummary(mockSummary);
    } else {
      setQuiz(mockQuiz);
    }

    setProcessing(false);
    setStep('results');
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.forEach(q => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const resetApp = () => {
    setStep('select');
    setContentType('');
    setFile(null);
    setYoutubeUrl('');
    setWebSearchQuery('');
    setSummary('');
    setQuiz([]);
    setAnswers({});
    setShowResults(false);
    setCurrentQuestion(0);
    setActionType('');
    setSpecificTopic('');
  };

  const canProceedFromUpload = () => {
    if (contentType === 'pdf') return file;
    if (contentType === 'youtube') return youtubeUrl.trim();
    if (contentType === 'websearch') return webSearchQuery.trim();
    return false;
  };

  const getUploadStepName = () => {
    switch (contentType) {
      case 'pdf': return 'Upload PDF';
      case 'youtube': return 'Enter URL';
      case 'websearch': return 'Web Search';
      default: return 'Input';
    }
  };

  const getUploadStepIcon = () => {
    switch (contentType) {
      case 'pdf': return FileText;
      case 'youtube': return Youtube;
      case 'websearch': return Globe;
      default: return Search;
    }
  };

  // Step indicator component
  const StepIndicator = () => {
    const steps = [
      { id: 'select', name: 'Select Type', icon: Brain },
      { id: 'upload', name: getUploadStepName(), icon: getUploadStepIcon() },
      { id: 'configure', name: 'Configure', icon: Search },
      { id: 'results', name: 'Results', icon: CheckCircle }
    ];

    const currentStepIndex = steps.findIndex(s => s.id === step);

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((stepItem, index) => {
          const Icon = stepItem.icon;
          const isActive = step === stepItem.id;
          const isCompleted = index < currentStepIndex;

          return (
            <div key={stepItem.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                isActive 
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : isCompleted 
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 text-gray-400'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`ml-2 text-sm font-medium ${
                isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
              }`}>
                {stepItem.name}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-4 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Quiz Generator & Summarizer
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform your PDFs, YouTube videos, or web research into interactive quizzes and comprehensive summaries
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator />

        {/* Step 1: Content Type Selection */}
        {step === 'select' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Content Source</h2>
              <p className="text-gray-600">Select how you want to provide content for processing</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* PDF Option */}
              <div
                onClick={() => {
                  setContentType('pdf');
                  setStep('upload');
                }}
                className="bg-white rounded-xl shadow-lg p-8 cursor-pointer border-2 border-transparent hover:border-blue-300 hover:shadow-xl transition-all group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                    <FileText className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">PDF Document</h3>
                  <p className="text-gray-600 mb-4">Upload PDF files to extract text and generate content</p>
                  <div className="text-sm text-gray-500">
                    <div className="font-medium mb-2">Perfect for:</div>
                    <ul className="text-left space-y-1">
                      <li>• Research papers</li>
                      <li>• Textbooks & articles</li>
                      <li>• Reports & documents</li>
                      <li>• Academic materials</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* YouTube Option */}
              <div
                onClick={() => {
                  setContentType('youtube');
                  setStep('upload');
                }}
                className="bg-white rounded-xl shadow-lg p-8 cursor-pointer border-2 border-transparent hover:border-red-300 hover:shadow-xl transition-all group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                    <Youtube className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">YouTube Video</h3>
                  <p className="text-gray-600 mb-4">Process YouTube videos using transcripts and captions</p>
                  <div className="text-sm text-gray-500">
                    <div className="font-medium mb-2">Perfect for:</div>
                    <ul className="text-left space-y-1">
                      <li>• Educational videos</li>
                      <li>• Lectures & tutorials</li>
                      <li>• Documentaries</li>
                      <li>• Online courses</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Web Search Option */}
              <div
                onClick={() => {
                  setContentType('websearch');
                  setStep('upload');
                }}
                className="bg-white rounded-xl shadow-lg p-8 cursor-pointer border-2 border-transparent hover:border-green-300 hover:shadow-xl transition-all group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <Globe className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Web Search</h3>
                  <p className="text-gray-600 mb-4">Research topics using web search to gather comprehensive information</p>
                  <div className="text-sm text-gray-500">
                    <div className="font-medium mb-2">Perfect for:</div>
                    <ul className="text-left space-y-1">
                      <li>• Current topics</li>
                      <li>• Research questions</li>
                      <li>• Latest developments</li>
                      <li>• Comprehensive overviews</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Content Upload/Input */}
        {step === 'upload' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {contentType === 'pdf' && 'Upload Your PDF'}
                {contentType === 'youtube' && 'Enter YouTube URL'}
                {contentType === 'websearch' && 'Configure Web Search'}
              </h2>
              <p className="text-gray-600">
                {contentType === 'pdf' && 'Drag and drop your PDF file or click to browse'}
                {contentType === 'youtube' && 'Paste the YouTube video URL you want to process'}
                {contentType === 'websearch' && 'Enter your main search query and specific topics to research'}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* PDF Upload */}
              {contentType === 'pdf' && (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  {file ? (
                    <div>
                      <p className="text-lg font-medium text-green-600 mb-2">{file.name}</p>
                      <p className="text-sm text-gray-500">File size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg text-gray-600 mb-2">Drop your PDF here or click to browse</p>
                      <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}

              {/* YouTube URL */}
              {contentType === 'youtube' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
                    <Youtube className="w-6 h-6 text-red-600" />
                    <span className="text-red-700 font-medium">YouTube Video URL</span>
                  </div>
                  <input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  />
                  <div className="text-sm text-gray-600">
                    <p className="mb-1"><strong>Supported formats:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-gray-500">
                      <li>https://www.youtube.com/watch?v=VIDEO_ID</li>
                      <li>https://youtu.be/VIDEO_ID</li>
                      <li>https://www.youtube.com/embed/VIDEO_ID</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Web Search Configuration */}
              {contentType === 'websearch' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                    <Globe className="w-6 h-6 text-green-600" />
                    <span className="text-green-700 font-medium">Web Search for Quiz Generation</span>
                  </div>
                  
                  {/* Main Search Query */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Search Topic <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Machine Learning in Healthcare, Climate Change Solutions, World War II, etc."
                      value={webSearchQuery}
                      onChange={(e) => setWebSearchQuery(e.target.value)}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Enter the main topic you want to create quiz questions about
                    </p>
                  </div>

                  {/* Search Strategy Info */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">How Web Search Quiz Generation Works:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Searches multiple reliable sources for comprehensive information</li>
                      <li>• Focuses on recent and accurate content</li>
                      <li>• Generates quiz questions based on current knowledge</li>
                      <li>• Creates questions covering different aspects of your topic</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep('select')}
                className="flex items-center px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <button
                onClick={() => setStep('configure')}
                disabled={!canProceedFromUpload()}
                className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Configure Action */}
        {step === 'configure' && contentType !== 'websearch' && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Action</h2>
              <p className="text-gray-600">What would you like to do with your content?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Summarize Option - Only for PDF and YouTube */}
              {contentType !== 'websearch' && (
                <div className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all cursor-pointer ${
                  actionType === 'summarize' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                }`} onClick={() => setActionType('summarize')}>
                  <div className="text-center mb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      actionType === 'summarize' ? 'bg-green-200' : 'bg-green-100'
                    }`}>
                      <FileText className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Generate Summary</h3>
                    <p className="text-gray-600 mt-2">Create a comprehensive summary of your content</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Key points extraction</li>
                      <li>Main themes identification</li>
                      <li>Structured overview</li>
                      <li>Exportable format</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Quiz Option */}
              <div className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all cursor-pointer ${
                actionType === 'quiz' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
              } ${contentType === 'websearch' ? 'md:col-span-2' : ''}`} onClick={() => setActionType('quiz')}>
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    actionType === 'quiz' ? 'bg-blue-200' : 'bg-blue-100'
                  }`}>
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Generate Quiz</h3>
                  <p className="text-gray-600 mt-2">
                    {contentType === 'websearch' 
                      ? 'Create interactive questions based on web research of your topic'
                      : 'Create interactive questions from your content'
                    }
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Multiple choice questions</li>
                    <li>Instant feedback</li>
                    <li>Score tracking</li>
                    <li>Customizable difficulty</li>
                    {contentType === 'websearch' && <li>Based on current web information</li>}
                  </ul>
                </div>
              </div>
            </div>

            {/* Auto-select quiz for web search */}
            {contentType === 'websearch' && actionType === '' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> Web search is designed specifically for quiz generation. 
                  The quiz option will be automatically selected for you.
                </p>
              </div>
            )}

            {/* Quiz Configuration - Only for PDF and YouTube */}
            {actionType === 'quiz' && contentType !== 'websearch' && (
              <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-6">Quiz Configuration</h3>
                
                <div className="space-y-6">
                  {/* Specific Topic/Area */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Specific Topic or Area <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Focus on specific chapters, concepts, or time periods..."
                      value={specificTopic}
                      onChange={(e) => setSpecificTopic(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Specify a particular subject area or topic to focus the quiz questions on. Leave blank to generate questions from the entire content.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Number of Questions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Number of Questions
                      </label>
                      <select
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={3}>3 Questions</option>
                        <option value={5}>5 Questions</option>
                        <option value={10}>10 Questions</option>
                        <option value={15}>15 Questions</option>
                        <option value={20}>20 Questions</option>
                      </select>
                    </div>

                    {/* Difficulty Level */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Difficulty Level
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setDifficulty('easy')}
                          className={`p-3 text-sm font-medium rounded-lg border transition-all ${
                            difficulty === 'easy'
                              ? 'bg-green-100 border-green-500 text-green-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-green-300'
                          }`}
                        >
                          Easy
                        </button>
                        <button
                          type="button"
                          onClick={() => setDifficulty('medium')}
                          className={`p-3 text-sm font-medium rounded-lg border transition-all ${
                            difficulty === 'medium'
                              ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-yellow-300'
                          }`}
                        >
                          Medium
                        </button>
                        <button
                          type="button"
                          onClick={() => setDifficulty('hard')}
                          className={`p-3 text-sm font-medium rounded-lg border transition-all ${
                            difficulty === 'hard'
                              ? 'bg-red-100 border-red-500 text-red-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-red-300'
                          }`}
                        >
                          Hard
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep('upload')}
                className="flex items-center px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <button
                onClick={() => processContent(actionType)}
                disabled={!actionType || processing}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    {actionType === 'quiz' ? 'Generate Quiz' : 'Generate Summary'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Web Search Configuration - Direct to Quiz Generation */}
        {step === 'configure' && contentType === 'websearch' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Configuration</h2>
              <p className="text-gray-600">Configure your quiz settings for web search results</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg mb-6">
                <Globe className="w-6 h-6 text-green-600" />
                <div>
                  <span className="text-green-700 font-medium">Search Topic: </span>
                  <span className="text-green-800">{webSearchQuery}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Number of Questions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Number of Questions
                    </label>
                    <select
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value={3}>3 Questions</option>
                      <option value={5}>5 Questions</option>
                      <option value={10}>10 Questions</option>
                      <option value={15}>15 Questions</option>
                      <option value={20}>20 Questions</option>
                    </select>
                  </div>

                  {/* Difficulty Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Difficulty Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setDifficulty('easy')}
                        className={`p-3 text-sm font-medium rounded-lg border transition-all ${
                          difficulty === 'easy'
                            ? 'bg-green-100 border-green-500 text-green-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-green-300'
                        }`}
                      >
                        Easy
                      </button>
                      <button
                        type="button"
                        onClick={() => setDifficulty('medium')}
                        className={`p-3 text-sm font-medium rounded-lg border transition-all ${
                          difficulty === 'medium'
                            ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-yellow-300'
                        }`}
                      >
                        Medium
                      </button>
                      <button
                        type="button"
                        onClick={() => setDifficulty('hard')}
                        className={`p-3 text-sm font-medium rounded-lg border transition-all ${
                          difficulty === 'hard'
                            ? 'bg-red-100 border-red-500 text-red-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-red-300'
                        }`}
                      >
                        Hard
                      </button>
                    </div>
                  </div>
                </div>

                {/* Web Search Info */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Quiz Generation Process:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Searches the web for comprehensive information about "{webSearchQuery}"</li>
                    <li>• Analyzes multiple reliable sources and current content</li>
                    <li>• Generates {numQuestions} {difficulty} difficulty questions</li>
                    <li>• Creates questions covering different aspects of the topic</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep('upload')}
                className="flex items-center px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <button
                onClick={() => processContent('quiz')}
                disabled={processing}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating Quiz...
                  </>
                ) : (
                  <>
                    Generate Quiz
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 'results' && (
          <div className="max-w-4xl mx-auto">
            {processing && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-600">Processing your content...</p>
              </div>
            )}

            {/* Summary Results */}
            {summary && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Summary</h3>
                  <div className="flex space-x-3">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      <Download className="w-4 h-4 inline mr-2" />
                      Export
                    </button>
                    <button
                      onClick={resetApp}
                      className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      New Content
                    </button>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">{summary}</p>
                </div>
              </div>
            )}

            {/* Quiz Results */}
            {quiz.length > 0 && !showResults && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Quiz</h3>
                  <div className="text-sm text-gray-500">
                    Question {currentQuestion + 1} of {quiz.length}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
                  />
                </div>

                {/* Current Question */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-medium">
                      {quiz[currentQuestion]?.question}
                    </h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      quiz[currentQuestion]?.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      quiz[currentQuestion]?.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {quiz[currentQuestion]?.difficulty?.charAt(0).toUpperCase() + quiz[currentQuestion]?.difficulty?.slice(1)}
                    </span>
                  </div>
                  <div className="grid gap-3">
                    {quiz[currentQuestion]?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(quiz[currentQuestion].id, index)}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                          answers[quiz[currentQuestion].id] === index
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextQuestion}
                    disabled={!answers[quiz[currentQuestion]?.id]}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {currentQuestion === quiz.length - 1 ? 'Finish' : 'Next'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Results */}
            {showResults && quiz.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                  <div className="text-4xl font-bold text-blue-500 mb-2">
                    {calculateScore()}/{quiz.length}
                  </div>
                  <p className="text-gray-600 mb-2">
                    You scored {Math.round((calculateScore() / quiz.length) * 100)}%
                  </p>
                  <div className="flex justify-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <div className="w-3 h-3 bg-green-100 rounded-full mr-1"></div>
                      Easy: {quiz.filter(q => q.difficulty === 'easy').length}
                    </span>
                    <span className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-100 rounded-full mr-1"></div>
                      Medium: {quiz.filter(q => q.difficulty === 'medium').length}
                    </span>
                    <span className="flex items-center">
                      <div className="w-3 h-3 bg-red-100 rounded-full mr-1"></div>
                      Hard: {quiz.filter(q => q.difficulty === 'hard').length}
                    </span>
                  </div>
                </div>

                {/* Answer Review */}
                <div className="space-y-4 mb-8">
                  {quiz.map((q, index) => (
                    <div key={q.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start">
                        {answers[q.id] === q.correct ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{q.question}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                              q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                              q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {q.difficulty?.charAt(0).toUpperCase() + q.difficulty?.slice(1)}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-600">Your answer: </span>
                            <span className={answers[q.id] === q.correct ? 'text-green-600' : 'text-red-600'}>
                              {q.options[answers[q.id]]}
                            </span>
                            {answers[q.id] !== q.correct && (
                              <div className="mt-1">
                                <span className="text-gray-600">Correct answer: </span>
                                <span className="text-green-600">{q.options[q.correct]}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake Quiz
                  </button>
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Export Results
                  </button>
                  <button
                    onClick={resetApp}
                    className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center"
                  >
                    New Content
                  </button>
                </div>
              </div>
            )}

            {!processing && !summary && quiz.length === 0 && (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Processing complete. Results will appear here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSummarizerApp;