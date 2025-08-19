import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/ui/section-header';
import { Bone, Shield, Activity, Heart } from 'lucide-react';

interface MusculoskeletalSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function MusculoskeletalSection({ formData, onFieldChange, errors }: MusculoskeletalSectionProps) {
  const { t, language } = useLanguage();

  // Calculate completion percentage for Musculoskeletal section
  const requiredFields = [
    'ms_wounds',
    'ms_disease_variations',
    'fractures',
    'dislocations',
    'pathology_description'
  ];
  
  const completedFields = requiredFields.filter(field => formData[field]).length;

  return (
    <div className="space-y-6">
      {/* Section Header with Progress */}
      <SectionHeader
        icon={Bone}
        iconBgColor="bg-emerald-100"
        iconColor="text-emerald-600"
        title={language === 'bn' ? 'মাংসপেশী, হাড় এবং জোড়াসমূহ' : 'Musculoskeletal System'}
        description={language === 'bn' ? 
          'মাংসপেশী, হাড়, জোড়া এবং অস্থি সন্ধির পরীক্ষা' : 
          'Examination of muscles, bones, joints, and skeletal system'
        }
        completedFields={completedFields}
        totalFields={requiredFields.length}
        progressVariant="green"
        progressSize="medium"
      />

      {/* Wounds & Diseases Group - Blue */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 border border-blue-200">
            <Shield className="h-4 w-4 text-gray-700" />
          </span>
          <h4 className="text-lg font-semibold text-blue-900">
            {language === 'bn' ? 'যখম ও রোগ' : 'Wounds & Diseases'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ১ - যখমসমূহ */}
          <div className="space-y-3 group">
            <Label htmlFor="ms_wounds" className="text-base font-semibold text-gray-700 group-hover:text-blue-800 transition-colors">
              {t('investigation.musculoskeletal.ms_wounds')} *
            </Label>
            <Textarea
              id="ms_wounds"
              value={formData.ms_wounds || ''}
              onChange={(e) => onFieldChange('ms_wounds', e.target.value)}
              placeholder={language === 'bn' ? "যখম" : "Wounds"}
              rows={3}
              className={`${errors.ms_wounds ? 'border-red-500' : 'border-blue-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.ms_wounds && (
              <p className="text-sm text-red-600">{errors.ms_wounds}</p>
            )}
          </div>

          {/* ২ - রোগ এবং তার বিভিন্নতা */}
          <div className="space-y-3 group">
            <Label htmlFor="ms_disease_variations" className="text-base font-semibold text-gray-700 group-hover:text-blue-800 transition-colors">
              {t('investigation.musculoskeletal.ms_disease_variations')} *
            </Label>
            <Textarea
              id="ms_disease_variations"
              value={formData.ms_disease_variations || ''}
              onChange={(e) => onFieldChange('ms_disease_variations', e.target.value)}
              placeholder={language === 'bn' ? "রোগ অথবা বিবর্ণতা" : "Disease or discoloration"}
              rows={3}
              className={`${errors.ms_disease_variations ? 'border-red-500' : 'border-blue-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.ms_disease_variations && (
              <p className="text-sm text-red-600">{errors.ms_disease_variations}</p>
            )}
          </div>
        </div>
      </div>

      {/* Fractures & Dislocations Group - White */}
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 border border-green-200">
            <Heart className="h-4 w-4 text-green-700" />
          </span>
          <h4 className="text-lg font-semibold text-green-900">
            {language === 'bn' ? 'ভগ্ন অস্থি ও সন্ধি বিচ্যুতি' : 'Fractures & Dislocations'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ৩ - ভগ্ন অস্থি */}
          <div className="space-y-3 group">
            <Label htmlFor="fractures" className="text-base font-semibold text-gray-700 group-hover:text-green-800 transition-colors">
              {t('investigation.musculoskeletal.fractures')} *
            </Label>
            <Textarea
              id="fractures"
              value={formData.fractures || ''}
              onChange={(e) => onFieldChange('fractures', e.target.value)}
              placeholder={language === 'bn' ? "অস্থিভংগ" : "Fractures"}
              rows={3}
              className={`${errors.fractures ? 'border-red-500' : 'border-gray-300'} focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.fractures && (
              <p className="text-sm text-red-600">{errors.fractures}</p>
            )}
          </div>

          {/* ৪ - অস্থি সন্ধি বিচ্যুতি */}
          <div className="space-y-3 group">
            <Label htmlFor="dislocations" className="text-base font-semibold text-gray-700 group-hover:text-green-800 transition-colors">
              {t('investigation.musculoskeletal.dislocations')} *
            </Label>
            <Textarea
              id="dislocations"
              value={formData.dislocations || ''}
              onChange={(e) => onFieldChange('dislocations', e.target.value)}
              placeholder={language === 'bn' ? "স্থানচ্যুতি" : "Dislocations"}
              rows={3}
              className={`${errors.dislocations ? 'border-red-500' : 'border-gray-300'} focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.dislocations && (
              <p className="text-sm text-red-600">{errors.dislocations}</p>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Pathology Group - Yellow */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-100 border border-yellow-200">
            <Activity className="h-4 w-4 text-yellow-700" />
          </span>
          <h4 className="text-lg font-semibold text-yellow-900">
            {language === 'bn' ? 'বিস্তারিত রোগতত্ত্ব' : 'Detailed Pathology'}
          </h4>
        </div>
        <div className="space-y-3">
          {/* ৫ - বিস্তারিত রোগতত্ত্ব */}
          <div className="space-y-3 group">
            <Label htmlFor="pathology_description" className="text-base font-semibold text-gray-700 group-hover:text-yellow-800 transition-colors">
              {t('investigation.musculoskeletal.detailed_pathology')} *
            </Label>
            <Textarea
              id="pathology_description"
              value={formData.pathology_description || ''}
              onChange={(e) => onFieldChange('pathology_description', e.target.value)}
              placeholder={language === 'bn' ? "বিস্তারিত রোগতত্ত্ব" : "Detailed pathology"}
              rows={3}
              className={`${errors.pathology_description ? 'border-red-500' : 'border-yellow-300'} focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.pathology_description && (
              <p className="text-sm text-red-600">{errors.pathology_description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
