import React from 'react';
import { Download } from 'lucide-react';

function SummaryResults ({ summary, resetApp }) {
  return (
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
  );
};

export default SummaryResults;