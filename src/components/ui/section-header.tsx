import React from 'react';
import { LucideIcon } from 'lucide-react';
import ProgressIndicator from './progress-indicator';

interface SectionHeaderProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  title: string;
  description?: string;
  completedFields: number;
  totalFields: number;
  progressVariant?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  progressSize?: 'small' | 'medium' | 'large';
}

export default function SectionHeader({
  icon: Icon,
  iconBgColor,
  iconColor,
  title,
  description,
  completedFields,
  totalFields,
  progressVariant = 'blue',
  progressSize = 'medium'
}: SectionHeaderProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${iconBgColor}`}>
            <Icon className={`h-4 w-4 ${iconColor}`} />
          </span>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {title}
            </h3>
            {description && (
              <p className="text-gray-600 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
        
        {/* Progress Indicator - Right Side */}
        <ProgressIndicator
          completedFields={completedFields}
          totalFields={totalFields}
          size={progressSize}
          variant={progressVariant}
          showPercentage={true}
          showCounter={true}
        />
      </div>
    </div>
  );
}
