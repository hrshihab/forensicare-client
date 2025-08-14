import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface MusculoskeletalSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function MusculoskeletalSection({ formData, onFieldChange, errors }: MusculoskeletalSectionProps) {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* ৫ - মাংসপেশী, হাড় এবং জোড়াসমূহ */}
      <div className="space-y-4">
        {/* First Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ১ - যখমসমূহ */}
          <div className="space-y-2">
            <Label htmlFor="ms_wounds" className="text-base font-medium font-bangla">
              {t('investigation.musculoskeletal.ms_wounds')} *
            </Label>
            <Textarea
              id="ms_wounds"
              value={formData.ms_wounds || ''}
              onChange={(e) => onFieldChange('ms_wounds', e.target.value)}
              placeholder={language === 'bn' ? "যখম" : "Wounds"}
              rows={3}
              className={`${errors.ms_wounds ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.ms_wounds && (
              <p className="text-sm text-red-600">{errors.ms_wounds}</p>
            )}
          </div>

          {/* ২ - রোগ এবং তার বিভিন্নতা */}
          <div className="space-y-2">
            <Label htmlFor="ms_disease_variations" className="text-base font-medium font-bangla">
              {t('investigation.musculoskeletal.ms_disease_variations')} *
            </Label>
            <Textarea
              id="ms_disease_variations"
              value={formData.ms_disease_variations || ''}
              onChange={(e) => onFieldChange('ms_disease_variations', e.target.value)}
              placeholder={language === 'bn' ? "রোগ অথবা বিবর্ণতা" : "Disease or discoloration"}
              rows={3}
              className={`${errors.ms_disease_variations ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.ms_disease_variations && (
              <p className="text-sm text-red-600">{errors.ms_disease_variations}</p>
            )}
          </div>
        </div>

        {/* Second Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ৩ - ভগ্ন অস্থি */}
          <div className="space-y-2">
            <Label htmlFor="fractures" className="text-base font-medium font-bangla">
              {t('investigation.musculoskeletal.fractures')} *
            </Label>
            <Textarea
              id="fractures"
              value={formData.fractures || ''}
              onChange={(e) => onFieldChange('fractures', e.target.value)}
              placeholder={language === 'bn' ? "অস্থিভংগ" : "Fractures"}
              rows={3}
              className={`${errors.fractures ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.fractures && (
              <p className="text-sm text-red-600">{errors.fractures}</p>
            )}
          </div>

          {/* ৪ - অস্থি সন্ধি বিচ্যুতি */}
          <div className="space-y-2">
            <Label htmlFor="dislocations" className="text-base font-medium font-bangla">
              {t('investigation.musculoskeletal.dislocations')} *
            </Label>
            <Textarea
              id="dislocations"
              value={formData.dislocations || ''}
              onChange={(e) => onFieldChange('dislocations', e.target.value)}
              placeholder={language === 'bn' ? "স্থানচ্যুতি" : "Dislocations"}
              rows={3}
              className={`${errors.dislocations ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.dislocations && (
              <p className="text-sm text-red-600">{errors.dislocations}</p>
            )}
          </div>
        </div>

        {/* Third Row - 1 field spanning full width */}
        <div className="space-y-2">
          {/* ৫ - বিস্তারিত রোগতত্ত্ব */}
          <Label htmlFor="detailed_pathology" className="text-base font-medium font-bangla">
            {t('investigation.musculoskeletal.detailed_pathology')} *
          </Label>
          <Textarea
            id="detailed_pathology"
            value={formData.detailed_pathology || ''}
            onChange={(e) => onFieldChange('detailed_pathology', e.target.value)}
            placeholder={language === 'bn' ? "রোগ অথবা যখমের আরও বিস্তৃত বিবরন" : "Detailed description of disease or injury"}
            rows={4}
            className={`${errors.detailed_pathology ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          />
          {errors.detailed_pathology && (
            <p className="text-sm text-red-600">{errors.detailed_pathology}</p>
          )}
        </div>
      </div>
    </div>
  );
}
