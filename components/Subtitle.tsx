"use client";

import React from 'react';
import { siteConfig } from '@/config/site';

interface SubtitleProps {
  hidden?: boolean;
}

const Subtitle: React.FC<SubtitleProps> = ({ hidden = false }) => {
  return (
    <div className={`subtitle ${hidden ? 'hidden' : ''}`}>
      <strong>{siteConfig.subtitle}</strong>
    </div>
  );
};

export default Subtitle;