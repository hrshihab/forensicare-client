'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  // Show opposite language on button (when body is English, show বাংলা button)
  const buttonText = language === 'bn' ? 'English' : 'বাংলা';

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="min-w-[120px] border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
    >
      <Languages className="w-4 h-4 mr-2" />
      {buttonText}
    </Button>
  );
};
