import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ActionSelection from './configure/ActionSelection';
import QuizConfiguration from './configure/QuizConfiguration';

function ConfigureAction ({ state, actions }){
  const { actionType, processing } = state;
  const { setStep, processContent } = actions;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Action</h2>
        <p className="text-gray-600">What would you like to do with your content?</p>
      </div>

      <ActionSelection state={state} actions={actions} />

      {actionType === 'quiz' && (
        <QuizConfiguration state={state} actions={actions} />
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
          onClick={() => processContent(actionType)}
          disabled={!actionType || processing}
          className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            <>
              {actionType === 'quiz' ? 'Generate Quiz' : 'Generate Summary'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ConfigureAction;