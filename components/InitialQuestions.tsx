"use client";

import React from 'react';
import { siteConfig } from '@/config/site';

interface InitialQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const InitialQuestions: React.FC<InitialQuestionsProps> = ({ onQuestionClick }) => {
  return (
    <div className="initial-questions">
      <h3>{siteConfig.questions.header}</h3>
      {siteConfig.initialQuestions.map((question, index) => (
        <button 
          key={index}
          className="question-button"
          onClick={() => onQuestionClick(question)}
        >
          {question}
        </button>
      ))}
    </div>
  );
};

export default InitialQuestions;