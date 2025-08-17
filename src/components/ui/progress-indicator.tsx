import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProgressIndicatorProps {
  completedFields: number;
  totalFields: number;
  size?: 'small' | 'medium' | 'large';
  variant?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  showPercentage?: boolean;
  showCounter?: boolean;
  className?: string;
}

export default function ProgressIndicator({
  completedFields,
  totalFields,
  size = 'medium',
  variant = 'blue',
  showPercentage = true,
  showCounter = true,
  className = ''
}: ProgressIndicatorProps) {
  const { language } = useLanguage();
  
  const completionPercentage = (completedFields / totalFields) * 100;
  
  // Size configurations
  const sizeConfig = {
    small: {
      container: 'p-3 min-w-[280px]',
      percentage: 'text-lg',
      label: 'text-xs',
      progress: 'h-1.5',
      gap: 'gap-3'
    },
    medium: {
      container: 'p-4 min-w-[380px]',
      percentage: 'text-xl',
      label: 'text-xs',
      progress: 'h-2',
      gap: 'gap-4'
    },
    large: {
      container: 'p-5 min-w-[480px]',
      percentage: 'text-2xl',
      label: 'text-sm',
      progress: 'h-2.5',
      gap: 'gap-5'
    }
  };
  
  // Variant configurations
  const variantConfig = {
    blue: {
      bg: 'from-blue-50 to-indigo-50',
      border: 'border-blue-200',
      percentage: 'from-blue-600 to-indigo-600',
      progress: 'from-blue-400 via-blue-500 to-indigo-500',
      counter: 'text-blue-600 bg-blue-100',
      label: 'text-blue-600'
    },
    green: {
      bg: 'from-green-50 to-emerald-50',
      border: 'border-green-200',
      percentage: 'from-green-600 to-emerald-600',
      progress: 'from-green-400 via-green-500 to-emerald-500',
      counter: 'text-green-600 bg-green-100',
      label: 'text-green-600'
    },
    red: {
      bg: 'from-red-50 to-pink-50',
      border: 'border-red-200',
      percentage: 'from-red-600 to-pink-600',
      progress: 'from-red-400 via-red-500 to-pink-500',
      counter: 'text-red-600 bg-red-100',
      label: 'text-red-600'
    },
    yellow: {
      bg: 'from-yellow-50 to-amber-50',
      border: 'border-yellow-200',
      percentage: 'from-yellow-600 to-amber-600',
      progress: 'from-yellow-400 via-yellow-500 to-amber-500',
      counter: 'text-yellow-600 bg-yellow-100',
      label: 'text-yellow-600'
    },
    purple: {
      bg: 'from-purple-50 to-violet-50',
      border: 'border-purple-200',
      percentage: 'from-purple-600 to-violet-600',
      progress: 'from-purple-400 via-purple-500 to-violet-500',
      counter: 'text-purple-600 bg-purple-100',
      label: 'text-purple-600'
    }
  };
  
  const config = sizeConfig[size];
  const colors = variantConfig[variant];
  
  return (
    <div className={`bg-gradient-to-br ${colors.bg} rounded-xl ${config.container} border ${colors.border} shadow-lg ${className}`}>
      <div className={`flex items-center ${config.gap}`}>
        {/* Left Side - Percentage */}
        {showPercentage && (
          <div className="text-center flex-shrink-0">
            <div className={`${config.percentage} font-bold text-transparent bg-clip-text bg-gradient-to-r ${colors.percentage}`}>
              {Math.round(completionPercentage)}%
            </div>
            <div className={`${config.label} ${colors.label} uppercase tracking-wide font-medium`}>
              {language === 'bn' ? 'সম্পূর্ণ' : 'Complete'}
            </div>
          </div>
        )}
        
        {/* Right Side - Progress Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-800">
              {language === 'bn' ? 'ফিল্ড অগ্রগতি' : 'Field Progress'}
            </span>
            {showCounter && (
              <span className={`text-sm font-medium ${colors.counter} px-2 py-0.5 rounded-full`}>
                {completedFields}/{totalFields}
              </span>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className={`w-full bg-gray-200 rounded-full ${config.progress} overflow-hidden shadow-inner`}>
              <div 
                className={`h-full bg-gradient-to-r ${colors.progress} transition-all duration-700 ease-out rounded-full relative`}
                style={{ width: `${completionPercentage}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            {/* Progress bar glow */}
            <div className={`absolute inset-0 rounded-full shadow-lg opacity-20 bg-gradient-to-r ${colors.progress} blur-sm`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
