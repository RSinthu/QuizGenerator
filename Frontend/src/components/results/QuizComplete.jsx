import React from 'react';
import { CheckCircle, XCircle, RotateCcw, Download } from 'lucide-react';

function QuizComplete ({ state, actions }) {
  const { quiz, answers } = state;
  const { setAnswers, setCurrentQuestion, setShowResults, resetApp } = actions;

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

  const score = calculateScore();
  const percentage = Math.round((score / quiz.length) * 100);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
        <div className="text-4xl font-bold text-blue-500 mb-2">
          {score}/{quiz.length}
        </div>
        <p className="text-gray-600 mb-2">
          You scored {percentage}%
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
  );
};

export default QuizComplete;