import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExternalSignsSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function ExternalSignsSection({ formData, onFieldChange, errors }: ExternalSignsSectionProps) {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* ১ - বাহ্যিক লক্ষণ */}
      <div className="space-y-4">
        {/* First Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ১ - ব্যক্তির অবস্থা - বলবান , শীর্ণ, গলিত ইত্যাদি */}
          <div className="space-y-2">
            <Label htmlFor="physique_state" className="text-sm font-medium">
              {t('investigation.external_signs.physique_state')} *
            </Label>
            <Textarea
              id="physique_state"
              value={formData.physique_state || ''}
              onChange={(e) => onFieldChange('physique_state', e.target.value)}
              placeholder={language === 'bn' ? "বলবান, শীর্ণ, গলিত ইত্যাদি" : "Strong, thin, decomposed, etc."}
              rows={3}
              className={`${errors.physique_state ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.physique_state && (
              <p className="text-sm text-red-600">{errors.physique_state}</p>
            )}
          </div>

          {/* ২ - যখম_অবস্থান, আকার ও ধরণ */}
          <div className="space-y-2">
            <Label htmlFor="wounds_desc" className="text-sm font-medium">
              {t('investigation.external_signs.wounds_desc')} *
            </Label>
            <Textarea
              id="wounds_desc"
              value={formData.wounds_desc || ''}
              onChange={(e) => onFieldChange('wounds_desc', e.target.value)}
              placeholder={language === 'bn' ? "যখমের অবস্থান, আকার ও ধরণ" : "Wound location, size and type"}
              rows={3}
              className={`${errors.wounds_desc ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.wounds_desc && (
              <p className="text-sm text-red-600">{errors.wounds_desc}</p>
            )}
          </div>
        </div>

        {/* Second Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ৩ - আঘার_অবস্থান,আকার ও ধরণ */}
          <div className="space-y-2">
            <Label htmlFor="injuries_desc" className="text-sm font-medium">
              {t('investigation.external_signs.injuries_desc')} *
            </Label>
            <Textarea
              id="injuries_desc"
              value={formData.injuries_desc || ''}
              onChange={(e) => onFieldChange('injuries_desc', e.target.value)}
              placeholder={language === 'bn' ? "আঘাতের অবস্থান, আকার ও ধরণ" : "Injury location, size and type"}
              rows={3}
              className={`${errors.injuries_desc ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.injuries_desc && (
              <p className="text-sm text-red-600">{errors.injuries_desc}</p>
            )}
          </div>

          {/* ৪ - গলা ব্যবচ্ছেদের সময় প্রাপ্ত পট্টর চিনহ ইত্যাদি */}
          <div className="space-y-2">
            <Label htmlFor="neck_marks" className="text-sm font-medium">
              {t('investigation.external_signs.neck_marks')} *
            </Label>
            <Textarea
              id="neck_marks"
              value={formData.neck_marks || ''}
              onChange={(e) => onFieldChange('neck_marks', e.target.value)}
              placeholder={language === 'bn' ? "গলা ব্যবচ্ছেদের সময় প্রাপ্ত পট্টর চিনহ ইত্যাদি" : "Neck marks found during dissection, etc."}
              rows={3}
              className={`${errors.neck_marks ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.neck_marks && (
              <p className="text-sm text-red-600">{errors.neck_marks}</p>
            )}
          </div>
        </div>
      </div>

      {/* Extra Instruction */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800 font-medium">
          {language === 'bn' ? 
            "বিঃ দ্রঃ যখমের ক্ষেত্রে, যখমে হত্যার, আত্মহত্যার বা অন্য কিছুর আলামত গায়ে কিনা তাহা লিখুন।" : 
            "Note: In case of wounds, write whether there are signs of homicide, suicide, or anything else on the body."
          }
        </p>
      </div>
    </div>
  );
}
