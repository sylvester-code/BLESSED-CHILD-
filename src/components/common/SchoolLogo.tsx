'use client';

import React, { useState, useEffect } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { GraduationCap } from 'lucide-react';

interface SchoolLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'glass';
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark'
}) => {
  const { settings } = useSchool();
  const [imageError, setImageError] = useState(false);

  // Reset image error state whenever settings.logoUrl changes
  useEffect(() => {
    setImageError(false);
  }, [settings.logoUrl]);

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-11 h-11 sm:w-12 sm:h-12 rounded-xl',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 rounded-3xl'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14'
  };

  const hasCustomLogo = settings.logoUrl && settings.logoUrl.trim().length > 0 && !imageError;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden flex-shrink-0 transition-transform ${sizeClasses[size]} ${
        hasCustomLogo
          ? 'bg-white border-2 border-amber-400/50 shadow-md p-1'
          : variant === 'light'
          ? 'bg-white text-school-navy-900 border-2 border-amber-400/50 shadow-md'
          : 'bg-gradient-to-br from-school-navy-950 via-school-navy-900 to-school-navy-800 text-amber-400 border-2 border-amber-400/40 shadow-md'
      } ${className}`}
    >
      {hasCustomLogo ? (
        <img
          src={settings.logoUrl}
          alt={settings.schoolName}
          onError={() => setImageError(true)}
          className="w-full h-full object-contain"
        />
      ) : (
        <GraduationCap className={`${iconSizes[size]} text-amber-400`} />
      )}
    </div>
  );
};
