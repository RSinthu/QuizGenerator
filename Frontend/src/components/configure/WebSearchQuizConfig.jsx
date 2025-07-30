import React from 'react';
import { Globe } from 'lucide-react';

function WebSearchQuizConfig ({ state, actions }) {
  const { webSearchQuery, numQuestions, difficulty } = state;
  const { setNumQuestions, setDifficulty } = actions;

  const difficultyOptions = [
    { id: 'easy', label: 'Easy', color: 'green' },
    { id: 'medium', label: 'Medium', color: 'yellow' },
    { id: 'hard', label: 'Hard', color: 'red' }
  ];

  const getDifficultyClasses = (option) => {
    const isSelected = difficulty === option.id;
    const colors = {
      green: isSelected 
        ? 'bg-green-100 border-green-500 text-green-700' 
        : 'bg-white border-gray-300 text-gray-700 hover:border-green-300',
      yellow: isSelected 
        ? 'bg-yellow-100 border-yellow-500 text-yellow-700' 
        : 'bg-white border-gray-300 text-gray-700 hover:border-yellow-300',
      red: isSelected 
        ? 'bg-red-100 border-red-500 text-red-700' 
        : 'bg-white border-gray-300 text-gray-700 hover:border-red-300'
    };
    return colors[option.color];
  };

  return (
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
              {difficultyOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setDifficulty(option.id)}
                  className={`p-3 text-sm font-medium rounded-lg border transition-all ${getDifficultyClasses(option)}`}
                >
                  {option.label}
                </button>
              ))}
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
  );
};

export default WebSearchQuizConfig;