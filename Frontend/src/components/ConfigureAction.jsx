import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ActionSelection from './configure/ActionSelection';
import QuizConfiguration from './configure/QuizConfiguration';
import WebSearchQuizConfig from './configure/WebSearchQuizConfig';

function ConfigureAction ({ state, actions }){
  const { contentType, actionType, processing, webSearchQuery } = state;
  const { setStep, processContent } = actions;

  const isWebSearch = contentType === 'websearch';

  return (
    <div className="max-w-3xl mx-auto">
      {!isWebSearch ? (
        <>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Action</h2>
            <p className="text-gray-600">What would you like to do with your content?</p>
          </div>

          <ActionSelection state={state} actions={actions} />

          {actionType === 'quiz' && (
            <QuizConfiguration state={state} actions={actions} />
          )}
        </>
      ) : (
        <>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz Configuration</h2>
            <p className="text-gray-600">Configure your quiz settings for web search results</p>
          </div>

          <WebSearchQuizConfig state={state} actions={actions} />
        </>
      )}

      {/* Auto-select quiz for web search */}
      {isWebSearch && actionType === '' && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> Web search is designed specifically for quiz generation. 
            The quiz option will be automatically selected for you.
          </p>
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
          onClick={() => processContent(isWebSearch ? 'quiz' : actionType)}
          disabled={(!isWebSearch && !actionType) || processing}
          className={`flex items-center px-8 py-3 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all ${
            isWebSearch 
              ? 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
          }`}
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {isWebSearch ? 'Generating Quiz...' : 'Processing...'}
            </>
          ) : (
            <>
              {isWebSearch ? 'Generate Quiz' : actionType === 'quiz' ? 'Generate Quiz' : 'Generate Summary'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ConfigureAction;