import React, { useState, useRef } from 'react';
import StepIndicator from './components/StepIndicator';
import ContentTypeSelection from './components/ContentTypeSelection';
import ContentUpload from './components/ContentUpload';
import ConfigureAction from './components/ConfigureAction';
import Results from './components/Results';
import api from './api/api';

function QuizSummarizerApp() {
  const [step, setStep] = useState('select');
  const [contentType, setContentType] = useState('');
  const [file, setFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [processing, setProcessing] = useState(false);
  const [summary, setSummary] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState('medium');
  const [specificTopic, setSpecificTopic] = useState('');
  const [actionType, setActionType] = useState('');
  const fileInputRef = useRef(null);

  // Your existing API functions...
  const fetchSummaryYoutube = async (url) =>{
    try {
        const response = await api.post("/summary/youtube", {"url":url});
        return response.data.summary;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
  };

  const uploadAndSummarizePDF = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/summary/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.summary;
    } catch (err) {
      console.error("Error summarizing PDF:", err.response?.data || err.message);
      throw err;
    }
  };

  const fetchQuizYoutube = async (url, specificTopic, numQuestions, difficulty) => {
    try {
      const response = await api.post(`/quiz/youtube`, {
        url,
        specificArea: specificTopic, 
        no: numQuestions,              
        difficulty,
      });
      return response.data.quiz;
    } catch (err) {
      console.error("Error generating quiz:", err.response?.data || err.message);
      throw err;
    }
  }

  const fetchPDFQuiz = async (file, specificTopic, numQuestions, difficulty) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('specificArea', specificTopic);
      formData.append('no', numQuestions);
      formData.append('difficulty', difficulty);
      const response = await api.post(`/quiz/pdf`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
      return response.data.quiz;
    } catch (err) {
      console.error("Error generating quiz:", err.response?.data || err.message);
      throw err;
    }
  }

  const processContent = async (type) => {
    setProcessing(true);
    setSummary('');
    setQuiz([]);
    setAnswers({});
    setShowResults(false);
    setCurrentQuestion(0);

    try {
      // summary generation based on content type
      let Summary = '';
      if (type === 'summarize') {
        switch (contentType) {
          case 'pdf':
            Summary = await uploadAndSummarizePDF(file);
            break;
          case 'youtube':
            Summary = await fetchSummaryYoutube(youtubeUrl);
            break;
          default:
            Summary = "Content processed successfully with comprehensive analysis of key themes and concepts.";
        }
      }

      // quiz generation
      let Quiz = [];
      if(type === 'quiz'){
        switch (contentType) {
          case 'pdf':
            Quiz = await fetchPDFQuiz(file,specificTopic,numQuestions,difficulty);
            break;
          case 'youtube':
            Quiz = await fetchQuizYoutube(youtubeUrl, specificTopic, numQuestions, difficulty);
            break;
          default:
            Quiz = [];
        }
      }

      if (type === 'summarize') {
        setSummary(Summary);
      } else {
        setQuiz(Quiz);
      }

      setProcessing(false);
      setStep('results');
    } catch (error) {
      console.error('Error processing content:', error);
      setProcessing(false);
      // You might want to show an error message to the user here
      alert('Error processing content. Please try again.');
    }
  };

  const resetApp = () => {
    setStep('select');
    setContentType('');
    setFile(null);
    setYoutubeUrl('');
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
             Transform your PDFs and YouTube videos into interactive quizzes and comprehensive summaries
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