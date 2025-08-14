import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface OpinionsSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function OpinionsSection({ formData, onFieldChange, errors }: OpinionsSectionProps) {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* ৬ - মতামত */}
      <div className="space-y-4">
        {/* First Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ১ - মেডিকেল অফিসারের মতামত */}
          <div className="space-y-2">
            <Label htmlFor="medical_officer_opinion" className="text-base font-medium font-bangla">
              {t('investigation.opinions.medical_officer_opinion')} *
            </Label>
            <Textarea
              id="medical_officer_opinion"
              value={formData.medical_officer_opinion || ''}
              onChange={(e) => onFieldChange('medical_officer_opinion', e.target.value)}
              placeholder={language === 'bn' ? "মৃত্যুর কারণ সম্পর্কে মেডিক্যাল অফিসারের মতামত" : "Medical Officer's opinion regarding cause of death"}
              rows={3}
              className={`${errors.medical_officer_opinion ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.medical_officer_opinion && (
              <p className="text-sm text-red-600">{errors.medical_officer_opinion}</p>
            )}
          </div>

          {/* ২ - সিভিল সার্জনের মন্তব্য */}
          <div className="space-y-2">
            <Label htmlFor="civil_surgeon_remark" className="text-base font-medium font-bangla">
              {t('investigation.opinions.civil_surgeon_remark')} *
            </Label>
            <Textarea
              id="civil_surgeon_remark"
              value={formData.civil_surgeon_remark || ''}
              onChange={(e) => onFieldChange('civil_surgeon_remark', e.target.value)}
              placeholder={language === 'bn' ? "সিভিল সার্জনের মন্তব্য" : "Civil Surgeon's remark"}
              rows={3}
              className={`${errors.civil_surgeon_remark ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.civil_surgeon_remark && (
              <p className="text-sm text-red-600">{errors.civil_surgeon_remark}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
