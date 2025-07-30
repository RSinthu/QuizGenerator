import React from 'react';
import { Globe } from 'lucide-react';

function WebSearchUpload ({ state, actions }){
  const { webSearchQuery } = state;
  const { setWebSearchQuery } = actions;

  return (
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
  );
};

export default WebSearchUpload;