import React from 'react';
import { ChevronRight } from 'lucide-react';

function QuizQuestion ({ state, actions }) {
  const { quiz, currentQuestion, answers } = state;
  const { setAnswers, setCurrentQuestion, setShowResults } = actions;

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
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

  const currentQ = quiz[currentQuestion];

  return (
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
            {currentQ?.question}
          </h4>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            currentQ?.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
            currentQ?.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {currentQ?.difficulty?.charAt(0).toUpperCase() + currentQ?.difficulty?.slice(1)}
          </span>
        </div>
        <div className="grid gap-3">
          {currentQ?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQ.id, index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                answers[currentQ.id] === index
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
          disabled={!answers[currentQ?.id]}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {currentQuestion === quiz.length - 1 ? 'Finish' : 'Next'}
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;