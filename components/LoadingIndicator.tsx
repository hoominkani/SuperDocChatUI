"use client";

import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="message-group assistant" id="loadingMessage">
      <div className="avatar">🎓</div>
      <div className="message">
        <div className="loading-text">
          <span>📚調査中</span>
          <span className="loading-dots">
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;