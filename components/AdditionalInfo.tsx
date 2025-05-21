"use client";

import React from 'react';
import { siteConfig } from '@/config/site';

interface AdditionalInfoProps {
  show?: boolean;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ show = false }) => {
  if (!show) return null;
  
  return (
    <div id="additionalInfo" className="additional-info show">
      {siteConfig.additionalInfo}
    </div>
  );
};

export default AdditionalInfo;