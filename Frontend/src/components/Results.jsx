import React from 'react';
import { Brain } from 'lucide-react';
import SummaryResults from './results/SummaryResults';
import QuizResults from './results/QuizResults';

function Results ({ state, actions }) {
  const { processing, summary, quiz } = state;

  if (processing) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Processing your content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Summary Results */}
      {summary && (
        <SummaryResults 
          summary={summary}
          resetApp={actions.resetApp}
        />
      )}

      {/* Quiz Results */}
      {quiz.length > 0 && (
        <QuizResults 
          state={state}
          actions={actions}
        />
      )}

      {/* No Results */}
      {!processing && !summary && quiz.length === 0 && (
        <div className="text-center py-12">
          <Brain className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Processing complete. Results will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default Results;