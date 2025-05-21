"use client";

import React from 'react';
import InitialQuestions from './InitialQuestions';
import MessageGroup from './MessageGroup';
import LoadingIndicator from './LoadingIndicator';

interface ChatSectionProps {
  messages: Array<{
    role: string;
    content: string;
    isHtml?: boolean;
    isError?: boolean;
  }>;
  questionCount: number;
  showInitialQuestions: boolean;
  isLoading: boolean;
  expanded: boolean;
  onInitialQuestionClick: (question: string) => void;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  messages,
  questionCount,
  showInitialQuestions,
  isLoading,
  expanded,
  onInitialQuestionClick
}) => {
  return (
    <div className={`chat ${expanded ? 'expanded' : ''}`}>
      {showInitialQuestions ? (
        <InitialQuestions onQuestionClick={onInitialQuestionClick} />
      ) : (
        <>
          {messages.map((msg, index) => {
            // Add divider before each user message except the first one
            const isUserMessage = msg.role === 'user';
            const isFirstUserMessage = isUserMessage && !messages.slice(0, index).some(m => m.role === 'user');
            
            return (
              <React.Fragment key={index}>
                {isUserMessage && !isFirstUserMessage && (
                  <div className="divider">質問 #{questionCount - 1}</div>
                )}
                {isUserMessage && isFirstUserMessage && (
                  <div className="divider">質問 #{questionCount}</div>
                )}
                <MessageGroup
                  role={msg.role}
                  content={msg.content}
                  isHtml={msg.isHtml}
                  isError={msg.isError}
                />
              </React.Fragment>
            );
          })}
          
          {isLoading && <LoadingIndicator />}
        </>
      )}
    </div>
  );
};

export default ChatSection;