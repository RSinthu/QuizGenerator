import React from 'react';

function QuizConfiguration({ state, actions }) {
  const { numQuestions, difficulty, specificTopic } = state;
  const { setNumQuestions, setDifficulty, setSpecificTopic } = actions;

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
    <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-6">Quiz Configuration</h3>
      
      <div className="space-y-6">
        {/* Specific Topic/Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Specific Topic or Area <span className="text-gray-500">(Required)</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Focus on specific chapters, concepts, or time periods..."
            value={specificTopic}
            onChange={(e) => setSpecificTopic(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
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
      </div>
    </div>
  );
};

export default QuizConfiguration;