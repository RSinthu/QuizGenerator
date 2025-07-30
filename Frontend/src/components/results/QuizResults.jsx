import React from 'react';
import QuizQuestion from './QuizQuestion';
import QuizComplete from './QuizComplete';

function QuizResults ({ state, actions }) {
  const { quiz, showResults } = state;

  if (showResults) {
    return <QuizComplete state={state} actions={actions} />;
  }

  return <QuizQuestion state={state} actions={actions} />;
};

export default QuizResults;