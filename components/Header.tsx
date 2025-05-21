"use client";

import React from 'react';
import { siteConfig } from '@/config/site';
import { MapPin, UserRound } from 'lucide-react';

interface HeaderProps {
  onInfoClick: () => void;
  onTitleClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onInfoClick, onTitleClick }) => {
  return (
    <div className="header">
      <button className="info-button" onClick={onInfoClick}>i</button>
      <div className="header-content" onClick={onTitleClick}>
        <div className="icons">
          <span><MapPin className="w-5 h-5" /></span>
          <span><UserRound className="w-5 h-5" /></span>
        </div>
        <h1>{siteConfig.title}</h1>
      </div>
    </div>
  );
};

export default Header;