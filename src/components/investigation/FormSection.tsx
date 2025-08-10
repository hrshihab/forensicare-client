'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, AlertCircle, XCircle, SkipForward } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FormSection as FormSectionType } from '@/types/investigation';

interface FormSectionProps {
  section: FormSectionType;
  children: React.ReactNode;
  onToggle?: (isOpen: boolean) => void;
}

export const FormSection: React.FC<FormSectionProps> = ({ 
  section, 
  children, 
  onToggle 
}) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(section.isOpen);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  const getStatusIcon = () => {
    switch (section.status) {
      case 'done':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'skipped':
        return <SkipForward className="w-4 h-4 text-orange-600" />;
      case 'in_progress':
        return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (section.status) {
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'skipped':
        return 'bg-orange-100 text-orange-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border rounded-lg mb-4">
      <button
        onClick={handleToggle}
        className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
          <span className="font-medium text-gray-900">
            {t(`investigation.sections.${section.id}`)}
          </span>
          {section.required && (
            <span className="text-xs text-red-600 font-medium">*</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor()}`}>
            {t(`status.${section.status}`)}
          </span>
        </div>
      </button>
      
      {isOpen && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};
