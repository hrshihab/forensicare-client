'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';
import SectionHeader from '@/components/ui/section-header';
import { computeSectionProgress } from '@/utils/section-progress';

interface DetailedPathologySectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: any;
}

export const DetailedPathologySection: React.FC<DetailedPathologySectionProps> = ({
  formData,
  onFieldChange,
  errors
}) => {
  const { t, language } = useLanguage();

  // Progress via DRY util
  const { completed: completedFields, total: totalFieldsCount } = computeSectionProgress('detailed_pathology', formData as any);

  return (
    <div className="space-y-6">
      {/* Section Header with Progress */}
      <SectionHeader
        icon={FileText}
        iconBgColor="bg-purple-100"
        iconColor="text-purple-600"
        title={language === 'bn' ? 'বিস্তারিত রোগতত্ত্ব' : 'Detailed Pathology'}
        description={language === 'bn' ? 
          'রোগ অথবা যখমের বিস্তৃত বিবরন এবং বিশ্লেষণ' : 
          'Detailed description and analysis of disease or injury'
        }
        completedFields={completedFields}
        totalFields={totalFieldsCount}
        progressVariant="purple"
        progressSize="medium"
      />

      {/* Detailed Pathology Content */}
      <div className="rounded-xl border border-gray-200 bg-purple-50 p-5 shadow-sm">
        <div className="space-y-4">
          <div className="space-y-3 group">
            <Label htmlFor="pathology_description" className="text-base font-semibold text-gray-700 group-hover:text-purple-700 transition-colors">
              {t('investigation.detailed_pathology.pathology_description')}
            </Label>
            <Textarea
              id="pathology_description"
              value={formData.pathology_description || ''}
              onChange={(e) => onFieldChange('pathology_description', e.target.value)}
              placeholder={language === 'bn' ? "রোগ অথবা যখমের আরোও বিস্তৃত বিবরন লিখুন" : "Enter detailed description of disease or injury"}
              rows={4}
              className={`${errors.pathology_description ? 'border-red-500' : 'border-gray-300'} focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.pathology_description && (
              <p className="text-sm text-red-600">{errors.pathology_description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
