'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, AlertCircle, XCircle, SkipForward } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FormSection as FormSectionType } from '@/types/investigation';

interface FormSectionProps {
  section: FormSectionType;
  children: React.ReactNode;
  onToggle?: (isOpen: boolean) => void;
  progress?: { completed: number; total: number };
}

export const FormSection: React.FC<FormSectionProps> = ({ 
  section, 
  children, 
  onToggle,
  progress
}) => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(section.isOpen);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  const getStatusIcon = () => {
    switch (section.status) {
      case 'done':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'skipped':
        return <SkipForward className="w-5 h-5 text-orange-600" />;
      case 'in_progress':
        return <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'not_started':
        return <div className="w-5 h-5 border-2 border-gray-400 rounded-full" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (section.status) {
      case 'done':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'skipped':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'not_started':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBorderColor = () => {
    switch (section.status) {
      case 'done':
        return 'border-green-200 hover:border-green-300';
      case 'error':
        return 'border-red-200 hover:border-red-300';
      case 'skipped':
        return 'border-orange-200 hover:border-orange-300';
      case 'in_progress':
        return 'border-blue-200 hover:border-blue-300';
      case 'not_started':
        return 'hover:border-gray-300';
      default:
        return 'hover:border-gray-300';
    }
  };

  const getHeaderBgColor = () => {
    switch (section.status) {
      case 'done':
        return 'bg-green-50 hover:bg-green-100 border-green-200';
      case 'error':
        return 'bg-red-50 hover:bg-red-100 border-red-200';
      case 'skipped':
        return 'bg-orange-50 hover:bg-orange-100 border-orange-200';
      case 'in_progress':
        return 'bg-blue-50 hover:bg-blue-100 border-blue-200';
      case 'not_started':
        return 'bg-gray-50 hover:bg-gray-100';
      default:
        return 'bg-gray-50 hover:bg-gray-100';
    }
  };

  const getSectionTitle = () => {
    return language === 'bn' ? section.title_bn : section.title;
  };

  return (
    <div className={`border-2 rounded-lg mb-4 transition-all duration-300 ${getBorderColor()} ${section.status === 'done' ? 'shadow-md' : 'shadow-sm'}`}>
      <button
        onClick={handleToggle}
        className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center justify-between ${getHeaderBgColor()}`}
      >
        <div className="flex items-center space-x-3">
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
          <span className="font-medium text-gray-900">
            {getSectionTitle()}
          </span>
          {section.required && (
            <span className="text-xs text-red-600 font-medium">*</span>
          )}
        </div>
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <span className={`px-3 py-1 text-xs rounded-full font-medium border ${getStatusColor()}`}>
            {t(`status.${section.status}`)}
          </span>
        </div>
      </button>
      
      {isOpen && (
        <div className={`p-6 bg-white transition-all duration-300 ${section.status === 'done' ? 'bg-green-50/30' : ''}`}>
          {children}
          {section.status === 'done' && (
            <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-800 font-medium">
                  {language === 'bn' ? 'এই বিভাগটি সম্পূর্ণ হয়েছে' : 'This section is complete'}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
