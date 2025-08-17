import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SectionHeader from '@/components/ui/section-header';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle, Eye, User, Shield, Activity, ClipboardList } from 'lucide-react';

interface ExternalSignsSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function ExternalSignsSection({ formData, onFieldChange, errors }: ExternalSignsSectionProps) {
  const { t, language } = useLanguage();

  // Calculate completion percentage
  const requiredFields = [
    'physique_state',
    'wounds_desc', 
    'injuries_desc',
    'neck_marks'
  ];
  
  const completedFields = requiredFields.filter(field => formData[field]).length;

  return (
    <div className="space-y-6">
      {/* Section Header with Progress */}
      <SectionHeader
        icon={Eye}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        title={language === 'bn' ? 'বাহ্যিক লক্ষণ' : 'External Signs'}
        description={language === 'bn' ? 
          'মৃতদেহের বাহ্যিক অবস্থা ও লক্ষণসমূহ পর্যবেক্ষণ করুন' : 
          'Observe the external condition and signs of the deceased'
        }
        completedFields={completedFields}
        totalFields={requiredFields.length}
        progressVariant="blue"
        progressSize="medium"
      />

      {/* Physical Condition Group */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <User className="h-4 w-4 text-blue-600" />
          </span>
          <h4 className="text-base font-semibold text-gray-800">
            {language === 'bn' ? 'শারীরিক অবস্থা' : 'Physical Condition'}
          </h4>
        </div>
        
        <div className="space-y-4">
          {/* Physique State */}
          <div className="space-y-2">
            <Label htmlFor="physique_state" className="text-base font-medium text-gray-700">
              {t('investigation.external_signs.physique_state')} *
            </Label>
            <Textarea
              id="physique_state"
              value={formData.physique_state || ''}
              onChange={(e) => onFieldChange('physique_state', e.target.value)}
              placeholder={language === 'bn' ? "বলবান, শীর্ণ, গলিত ইত্যাদি" : "Strong, thin, decomposed, etc."}
              rows={3}
              className={`${errors.physique_state ? 'border-red-500' : 'border-gray-300'} 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
            />
            {errors.physique_state && (
              <p className="text-sm text-red-600">{errors.physique_state}</p>
            )}
          </div>
        </div>
      </div>

      {/* Wounds & Injuries Group */}
      <div className="rounded-xl border  p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
            <Shield className="h-4 w-4 text-red-600" />
          </span>
          <h4 className="text-base font-semibold text-gray-800">
            {language === 'bn' ? 'যখম ও আঘাত' : 'Wounds & Injuries'}
          </h4>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Wounds Description */}
          <div className="space-y-2">
            <Label htmlFor="wounds_desc" className="text-base font-medium text-gray-700">
              {t('investigation.external_signs.wounds_desc')} *
            </Label>
            <Textarea
              id="wounds_desc"
              value={formData.wounds_desc || ''}
              onChange={(e) => onFieldChange('wounds_desc', e.target.value)}
              placeholder={language === 'bn' ? "যখমের অবস্থান, আকার ও ধরণ" : "Wound location, size and type"}
              rows={4}
              className={`${errors.wounds_desc ? 'border-red-500' : 'border-gray-300'} 
                focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 resize-none`}
            />
            {errors.wounds_desc && (
              <p className="text-sm text-red-600">{errors.wounds_desc}</p>
            )}
          </div>

          {/* Injuries Description */}
          <div className="space-y-2">
            <Label htmlFor="injuries_desc" className="text-base font-medium text-gray-700">
              {t('investigation.external_signs.injuries_desc')} *
            </Label>
            <Textarea
              id="injuries_desc"
              value={formData.injuries_desc || ''}
              onChange={(e) => onFieldChange('injuries_desc', e.target.value)}
              placeholder={language === 'bn' ? "আঘাতের অবস্থান, আকার ও ধরণ" : "Injury location, size and type"}
              rows={4}
              className={`${errors.injuries_desc ? 'border-red-500' : 'border-gray-300'} 
                focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 resize-none`}
            />
            {errors.injuries_desc && (
              <p className="text-sm text-red-600">{errors.injuries_desc}</p>
            )}
          </div>
        </div>
      </div>

      {/* Neck Examination Group */}
      <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
            <Activity className="h-4 w-4 text-yellow-600" />
          </span>
          <h4 className="text-base font-semibold text-gray-800">
            {language === 'bn' ? 'গলা পরীক্ষা' : 'Neck Examination'}
          </h4>
        </div>
        
        <div className="space-y-4">
          {/* Neck Marks */}
          <div className="space-y-2">
            <Label htmlFor="neck_marks" className="text-base font-medium text-gray-700">
              {t('investigation.external_signs.neck_marks')} *
            </Label>
            <Textarea
              id="neck_marks"
              value={formData.neck_marks || ''}
              onChange={(e) => onFieldChange('neck_marks', e.target.value)}
              placeholder={language === 'bn' ? "গলা ব্যবচ্ছেদের সময় প্রাপ্ত পট্টর চিহ্ন ইত্যাদি" : "Neck marks found during dissection, etc."}
              rows={4}
              className={`${errors.neck_marks ? 'border-red-500' : 'border-gray-300'} 
                focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200 resize-none`}
            />
            {errors.neck_marks && (
              <p className="text-sm text-red-600">{errors.neck_marks}</p>
            )}
          </div>
        </div>
      </div>

      {/* Important Instructions */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
        <div className="flex items-start gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 mt-1">
            <ClipboardList className="h-4 w-4 text-blue-600" />
          </span>
          <div className="space-y-2">
            <h4 className="text-base font-semibold text-gray-800">
              {language === 'bn' ? 'গুরুত্বপূর্ণ নির্দেশনা' : 'Important Instructions'}
            </h4>
            <div className="p-4 bg-white/60 rounded-lg border border-blue-100">
              <p className="text-blue-800 leading-relaxed">
                {language === 'bn' ? 
                  "বিঃ দ্রঃ যখমের ক্ষেত্রে, যখমে হত্যার, আত্মহত্যার বা অন্য কিছুর আলামত গায়ে কিনা তাহা লিখুন। প্রতিটি ক্ষেত্রে সাবধানতার সাথে পর্যবেক্ষণ করুন।" : 
                  "Note: In case of wounds, write whether there are signs of homicide, suicide, or anything else on the body. Observe each case carefully."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
