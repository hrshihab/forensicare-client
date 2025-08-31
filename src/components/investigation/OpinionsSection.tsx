'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';
import SectionHeader from '@/components/ui/section-header';
import { computeSectionProgress } from '@/utils/section-progress';

interface OpinionsSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: any;
}

export const OpinionsSection: React.FC<OpinionsSectionProps> = ({
  formData,
  onFieldChange,
  errors
}) => {
  const { t, language } = useLanguage();

  // Progress via DRY util
  const { completed: completedFields, total: totalFieldsCount } = computeSectionProgress('opinions', formData as any);

  return (
    <div className="space-y-6">
      {/* Section Header with Progress */}
      <SectionHeader
        icon={FileText}
        iconBgColor="bg-indigo-100"
        iconColor="text-indigo-600"
        title={language === 'bn' ? 'মতামত' : 'Opinions'}
        description={language === 'bn' ? 
          'মেডিক্যাল অফিসার এবং সিভিল সার্জনের মতামত' : 
          'Medical officer and civil surgeon opinions'
        }
        completedFields={completedFields}
        totalFields={totalFieldsCount}
        progressVariant="purple"
        progressSize="medium"
      />

      {/* Medical Officer Opinion - Blue Theme */}
      <div className="rounded-xl bg-gradient-to-r from-slate-50 via-blue-50/30 to-indigo-50/20 p-5 shadow-sm border border-slate-100/50">
        <div className="space-y-4">
          <div className="space-y-3 group">
            <Label htmlFor="medical_officer_opinion" className="text-base font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
              {t('investigation.opinions.medical_officer_opinion')}
            </Label>
            
            {/* Notice for injury cases */}
            <div className="bg-blue-100 border border-blue-200 rounded-lg p-3 mb-3">
              <p className="text-sm text-blue-800 font-medium">
                <span className="font-bold">বিঃ দ্রঃ</span> যখমের ক্ষেত্রে, যখমে হত্যার, আত্মহত্যার বা অন্য কিছুর আলামত গায়ে কিনা তাহা লিখুন।
              </p>
            </div>
            
            <Textarea
              id="medical_officer_opinion"
              value={formData.medical_officer_opinion || ''}
              onChange={(e) => onFieldChange('medical_officer_opinion', e.target.value)}
              placeholder={language === 'bn' ? "মৃত্যুর কারণ সম্পর্কে মেডিক্যাল অফিসারের মতামত লিখুন" : "Enter medical officer's opinion on cause of death"}
              rows={4}
              className={`${errors.medical_officer_opinion ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.medical_officer_opinion && (
              <p className="text-sm text-red-600">{errors.medical_officer_opinion}</p>
            )}
          </div>
        </div>
      </div>

      {/* Civil Surgeon Remark - Green Theme */}
      <div className="rounded-xl bg-gradient-to-r from-slate-50 via-emerald-50/30 to-teal-50/20 p-5 shadow-sm border border-slate-100/50">
        <div className="space-y-4">
          <div className="space-y-3 group">
            <Label htmlFor="civil_surgeon_remark" className="text-base font-semibold text-gray-700 group-hover:text-green-700 transition-colors">
              {t('investigation.opinions.civil_surgeon_remark')}
            </Label>
            <Textarea
              id="civil_surgeon_remark"
              value={formData.civil_surgeon_remark || ''}
              onChange={(e) => onFieldChange('civil_surgeon_remark', e.target.value)}
              placeholder={language === 'bn' ? "সিভিল সার্জনের মন্তব্য লিখুন" : "Enter civil surgeon's remark"}
              rows={4}
              className={`${errors.civil_surgeon_remark ? 'border-red-500' : ''} focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.civil_surgeon_remark && (
              <p className="text-sm text-red-600">{errors.civil_surgeon_remark}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
