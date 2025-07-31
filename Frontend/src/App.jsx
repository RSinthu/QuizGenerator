import React, { useState, useRef } from 'react';
import StepIndicator from './components/StepIndicator';
import ContentTypeSelection from './components/ContentTypeSelection';
import ContentUpload from './components/ContentUpload';
import ConfigureAction from './components/ConfigureAction';
import Results from './components/Results';
import { generateSampleQuiz } from './utils/quizUtils';
import api from './api/api';

function QuizSummarizerApp() {
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


  const fetchSummaryYoutube = async (url) =>{
    try {
        const response = await api.post("/summary/youtube", {"url":url});
        return response.data.summary;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
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

    // summary generation based on content type
    let Summary = '';
    if (type === 'summarize') {
      switch (contentType) {
        case 'pdf':
          Summary = `This PDF document covers key concepts in the uploaded material. The main themes include comprehensive analysis of the subject matter, detailed explanations of core principles, and practical applications. The document provides structured information that serves as a valuable reference for understanding the topic in depth.`;
          break;
        case 'youtube':
          Summary = await fetchSummaryYoutube(youtubeUrl);
          break;
        default:
          Summary = "Content processed successfully with comprehensive analysis of key themes and concepts.";
      }
    }

    // Mock quiz generation
    const mockQuiz = type === 'quiz' ? generateSampleQuiz(numQuestions, difficulty) : [];

    if (type === 'summarize') {
      setSummary(Summary);
    } else {
      setQuiz(mockQuiz);
    }

    setProcessing(false);
    setStep('results');
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

  const appState = {
    step,
    contentType,
    file,
    youtubeUrl,
    webSearchQuery,
    processing,
    summary,
    quiz,
    currentQuestion,
    answers,
    showResults,
    numQuestions,
    difficulty,
    specificTopic,
    actionType,
    fileInputRef
  };

  const appActions = {
    setStep,
    setContentType,
    setFile,
    setYoutubeUrl,
    setWebSearchQuery,
    setProcessing,
    setSummary,
    setQuiz,
    setCurrentQuestion,
    setAnswers,
    setShowResults,
    setNumQuestions,
    setDifficulty,
    setSpecificTopic,
    setActionType,
    processContent,
    resetApp
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
        <StepIndicator step={step} contentType={contentType} />

        {/* Step 1: Content Type Selection */}
        {step === 'select' && (
          <ContentTypeSelection
            setContentType={setContentType}
            setStep={setStep}
          />
        )}

        {/* Step 2: Content Upload/Input */}
        {step === 'upload' && (
          <ContentUpload
            state={appState}
            actions={appActions}
          />
        )}

        {/* Step 3: Configure Action */}
        {step === 'configure' && (
          <ConfigureAction
            state={appState}
            actions={appActions}
          />
        )}

        {/* Step 4: Results */}
        {step === 'results' && (
          <Results
            state={appState}
            actions={appActions}
          />
        )}
      </div>
    </div>
  );
}

export default QuizSummarizerApp;