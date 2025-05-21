"use client";

import React, { useState, KeyboardEvent } from 'react';
import { siteConfig } from '@/config/site';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [question, setQuestion] = useState('');

  const handleSend = () => {
    if (question.trim() && !isLoading) {
      onSendMessage(question);
      setQuestion('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  return (
    <div className="input-area">
      <input
        type="text"
        className="question-input"
        placeholder={siteConfig.questions.placeholder}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />
      <button
        className="send-button"
        onClick={handleSend}
        disabled={isLoading}
      >
        {isLoading ? siteConfig.questions.sending : siteConfig.questions.send}
      </button>
    </div>
  );
};

export default InputArea;