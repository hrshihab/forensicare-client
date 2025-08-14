import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { User, AlertTriangle, Activity, Eye } from 'lucide-react';

interface ExternalSignsSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function ExternalSignsSection({ formData, onFieldChange, errors }: ExternalSignsSectionProps) {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Eye className="h-6 w-6 text-blue-600" />
          {language === 'bn' ? 'বাহ্যিক লক্ষণ' : 'External Signs'}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {language === 'bn' ? 
            'মৃতদেহের বাহ্যিক অবস্থা ও লক্ষণসমূহ পর্যবেক্ষণ করুন' : 
            'Observe the external condition and signs of the deceased'
          }
        </p>
      </div>

      {/* Physical Condition Group */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <h4 className="text-lg font-medium text-gray-900">
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
              className={`${errors.physique_state ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
            />
            {errors.physique_state && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                {errors.physique_state}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Wounds & Injuries Group */}
      <div className="bg-red-50 rounded-xl p-6 border border-red-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <h4 className="text-lg font-medium text-gray-900">
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
              className={`${errors.wounds_desc ? 'border-red-500' : 'border-gray-300'} focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 resize-none`}
            />
            {errors.wounds_desc && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                {errors.wounds_desc}
              </p>
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
              className={`${errors.injuries_desc ? 'border-red-500' : 'border-gray-300'} focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 resize-none`}
            />
            {errors.injuries_desc && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                {errors.injuries_desc}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Neck Examination Group */}
      <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Activity className="h-5 w-5 text-amber-600" />
          </div>
          <h4 className="text-lg font-medium text-gray-900">
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
              placeholder={language === 'bn' ? "গলা ব্যবচ্ছেদের সময় প্রাপ্ত পট্টর চিনহ ইত্যাদি" : "Neck marks found during dissection, etc."}
              rows={4}
              className={`${errors.neck_marks ? 'border-red-500' : 'border-gray-300'} focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 resize-none`}
            />
            {errors.neck_marks && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                {errors.neck_marks}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Important Instructions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg mt-1">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-medium text-blue-900">
              {language === 'bn' ? 'গুরুত্বপূর্ণ নির্দেশনা' : 'Important Instructions'}
            </h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              {language === 'bn' ? 
                "বিঃ দ্রঃ যখমের ক্ষেত্রে, যখমে হত্যার, আত্মহত্যার বা অন্য কিছুর আলামত গায়ে কিনা তাহা লিখুন। প্রতিটি ক্ষেত্রে সাবধানতার সাথে পর্যবেক্ষণ করুন।" : 
                "Note: In case of wounds, write whether there are signs of homicide, suicide, or anything else on the body. Observe each case carefully."
              }
            </p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            {language === 'bn' ? 'ফিল্ড পূরণ হয়েছে' : 'Fields completed'}: 
            <span className="font-medium text-green-600 ml-1">
              {[
                formData.physique_state,
                formData.wounds_desc,
                formData.injuries_desc,
                formData.neck_marks
              ].filter(Boolean).length} / 4
            </span>
          </span>
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-300"
              style={{ 
                width: `${([
                  formData.physique_state,
                  formData.wounds_desc,
                  formData.injuries_desc,
                  formData.neck_marks
                ].filter(Boolean).length / 4) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
