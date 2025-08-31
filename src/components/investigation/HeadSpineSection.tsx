import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/ui/section-header';
import { Brain, Skull, Activity, Shield } from 'lucide-react';

interface HeadSpineSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function HeadSpineSection({ formData, onFieldChange, errors }: HeadSpineSectionProps) {
  const { t, language } = useLanguage();

  // Calculate completion percentage for Head & Spine section
  const requiredFields = [
    'scalp',
    'skull',
    'vertebrae',
    'meninges',
    'brain',
    'spinal_cord'
  ];
  
  const completedFields = requiredFields.filter(field => formData[field]).length;

  return (
    <div className="space-y-6">
      {/* Section Header with Progress */}
      <SectionHeader
        icon={Brain}
        iconBgColor="bg-purple-100"
        iconColor="text-purple-600"
        title={language === 'bn' ? 'মাথা ও মেরুদন্ড' : 'Head & Spine'}
        description={language === 'bn' ? 
          'মাথার খুলি, মেরুদন্ডের নল এবং মস্তিষ্কের পরীক্ষা' : 
          'Examination of skull, spinal canal, and brain'
        }
        completedFields={completedFields}
        totalFields={requiredFields.length}
        progressVariant="purple"
        progressSize="medium"
      />

      {/* Scalp, Skull & Vertebrae Group */}
      <div className="rounded-xl bg-gradient-to-r from-slate-50 via-blue-50/30 to-indigo-50/20 p-5 shadow-sm border border-slate-100/50">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <Skull className="h-4 w-4 text-blue-600" />
          </span>
          <h4 className="text-base font-semibold text-gray-800">
            {language === 'bn' ? 'মাথার বহিরাবরণ, খুলি এবং মেরুদন্ডের অস্থি' : 'Scalp, Skull & Vertebrae'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ১ - মাথার বহিরাবরণ */}
          <div className="space-y-2">
            <Label htmlFor="scalp" className="text-base font-medium text-gray-700">
              {language === 'bn' ? 'মাথার বহিরাবরণ' : 'Scalp'} *
            </Label>
            <Textarea
              id="scalp"
              value={formData.scalp || ''}
              onChange={(e) => onFieldChange('scalp', e.target.value)}
              placeholder={language === 'bn' ? "মাথার ত্বক এবং চুলের অবস্থা" : "Condition of scalp skin and hair"}
              rows={3}
              className={`${errors.scalp ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
            />
            {errors.scalp && (
              <p className="text-sm text-red-600">{errors.scalp}</p>
            )}
          </div>

          {/* ২ - মাথার খুলি */}
          <div className="space-y-2">
            <Label htmlFor="skull" className="text-base font-medium text-gray-700">
              {language === 'bn' ? 'মাথার খুলি' : 'Skull'} *
            </Label>
            <Textarea
              id="skull"
              value={formData.skull || ''}
              onChange={(e) => onFieldChange('skull', e.target.value)}
              placeholder={language === 'bn' ? "খুলির অস্থির অবস্থা" : "Condition of skull bones"}
              rows={3}
              className={`${errors.skull ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
            />
            {errors.skull && (
              <p className="text-sm text-red-600">{errors.skull}</p>
            )}
          </div>

          {/* ৩ - মেরুদন্ডের অস্থি */}
          <div className="space-y-2">
            <Label htmlFor="vertebrae" className="text-base font-medium text-gray-700">
              {language === 'bn' ? 'মেরুদন্ডের অস্থি' : 'Vertebrae'} *
            </Label>
            <Textarea
              id="vertebrae"
              value={formData.vertebrae || ''}
              onChange={(e) => onFieldChange('vertebrae', e.target.value)}
              placeholder={language === 'bn' ? "মেরুদন্ডের অস্থির অবস্থা" : "Condition of vertebral bones"}
              rows={3}
              className={`${errors.vertebrae ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
            />
            {errors.vertebrae && (
              <p className="text-sm text-red-600">{errors.vertebrae}</p>
            )}
          </div>
        </div>
      </div>

      {/* Meninges Group - Single field */}
      <div className="rounded-xl bg-gradient-to-r from-slate-50 via-red-50/30 to-pink-50/20 p-5 shadow-sm border border-slate-100/50">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
            <Shield className="h-4 w-4 text-red-600" />
          </span>
          <h4 className="text-base font-semibold text-gray-800">
            {language === 'bn' ? 'ঝিল্লী' : 'Meninges'}
          </h4>
        </div>
        <div className="space-y-2">
          {/* <Label htmlFor="meninges" className="text-base font-medium text-gray-700">
            {t('investigation.head_spine.meninges')} *
          </Label> */}
          <Textarea
            id="meninges"
            value={formData.meninges || ''}
            onChange={(e) => onFieldChange('meninges', e.target.value)}
            placeholder={language === 'bn' ? "মস্তিষ্ক এবং মেরুদন্ডের ঝিল্লীর অবস্থা" : "Condition of brain and spinal cord membranes"}
            rows={3}
                          className={`${errors.meninges ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
          />
          {errors.meninges && (
            <p className="text-sm text-red-600">{errors.meninges}</p>
          )}
        </div>
      </div>

      {/* Brain & Spinal Cord Group - Same div, different fields */}
      <div className="rounded-xl bg-gradient-to-r from-slate-50 via-emerald-50/30 to-teal-50/20 p-5 shadow-sm border border-slate-100/50">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
            <Brain className="h-4 w-4 text-green-600" />
          </span>
          <h4 className="text-base font-semibold text-gray-800">
            {language === 'bn' ? 'মস্তিষ্ক এবং মেরুদন্ডের রজ্জু' : 'Brain & Spinal Cord'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ১ - মস্তিষ্ক */}
          <div className="space-y-2">
            <Label htmlFor="brain" className="text-base font-medium text-gray-700">
              {language === 'bn' ? 'মস্তিষ্কের অবস্থা' : 'Brain Condition'} *
            </Label>
            <Textarea
              id="brain"
              value={formData.brain || ''}
              onChange={(e) => onFieldChange('brain', e.target.value)}
              placeholder={language === 'bn' ? "মস্তিষ্কের বিস্তারিত পরীক্ষা এবং অবস্থা" : "Detailed examination and condition of the brain"}
              rows={3}
              className={`${errors.brain ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
            />
            {errors.brain && (
              <p className="text-sm text-red-600">{errors.brain}</p>
            )}
          </div>

          {/* ২ - মেরুদন্ডের রজ্জু */}
          <div className="space-y-2">
            <Label htmlFor="spinal_cord" className="text-base font-medium text-gray-700">
              {language === 'bn' ? 'মেরুদন্ডের রজ্জুর অবস্থা' : 'Spinal Cord Condition'} *
            </Label>
            <Textarea
              id="spinal_cord"
              value={formData.spinal_cord || ''}
              onChange={(e) => onFieldChange('spinal_cord', e.target.value)}
              placeholder={language === 'bn' ? "যদি কোন রোগ অথবা যখমের নিদর্শন না থাকে তাহা হইলে মেরুদন্ডের নল পরীক্ষার দরকার নাই" : "If no signs of disease or injury, spinal canal examination not required"}
              rows={3}
              className={`${errors.spinal_cord ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
            />
            {errors.spinal_cord && (
              <p className="text-sm text-red-600">{errors.spinal_cord}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
