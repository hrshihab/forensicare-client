import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/ui/section-header';
import { Heart, Shield, Activity, Package, ActivitySquare } from 'lucide-react';

interface ChestLungsSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function ChestLungsSection({ formData, onFieldChange, errors }: ChestLungsSectionProps) {
  const { t, language } = useLanguage();

  // Calculate completion percentage for Chest & Lungs section
  const requiredFields = [
    'ribs_cartilage',
    'pleura',
    'larynx',
    'trachea',
    'right_lung',
    'left_lung',
    'pericardium',
    'heart',
    'blood_vessels'
  ];
  
  const completedFields = requiredFields.filter(field => formData[field]).length;

  return (
    <div className="space-y-6">
      {/* Section Header with Progress */}
      <SectionHeader
        icon={Heart}
        iconBgColor="bg-red-100"
        iconColor="text-red-600"
        title={language === 'bn' ? 'বক্ষ ও ফুসফুস' : 'Chest & Lungs'}
        description={language === 'bn' ? 
          'বক্ষ গহ্বর, ফুসফুস এবং হৃদযন্ত্রের পরীক্ষা' : 
          'Examination of chest cavity, lungs, and heart'
        }
        completedFields={completedFields}
        totalFields={requiredFields.length}
        progressVariant="red"
        progressSize="medium"
      />

      {/* Chest Wall & Bones Group */}
      <div className="rounded-xl bg-gradient-to-r from-slate-50 via-blue-50/30 to-indigo-50/20 p-5 shadow-sm border border-slate-100/50">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <Shield className="h-4 w-4 text-blue-600" />
          </span>
          <h4 className="text-base font-semibold text-gray-800">
            {language === 'bn' ? 'বক্ষ প্রাচীর এবং অস্থি' : 'Chest Wall & Bones'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ১ - পাঁজর এবং তরুণাস্থি */}
          <div className="space-y-2">
            <Label htmlFor="ribs_cartilage" className="text-base font-medium text-gray-700">
              {t('investigation.chest_lungs.ribs_cartilage')} *
            </Label>
            <Textarea
              id="ribs_cartilage"
              value={formData.ribs_cartilage || ''}
              onChange={(e) => onFieldChange('ribs_cartilage', e.target.value)}
              placeholder={language === 'bn' ? "প্রকার—পাজর এবং কোমলাস্থিসমূহ" : "Type—Ribs and cartilages"}
              rows={3}
              className={`${errors.ribs_cartilage ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
            />
            {errors.ribs_cartilage && (
              <p className="text-sm text-red-600">{errors.ribs_cartilage}</p>
            )}
          </div>

          {/* ২ - ফুসফুসের আবরণী */}
          <div className="space-y-2">
            <Label htmlFor="pleura" className="text-base font-medium text-gray-700">
              {t('investigation.chest_lungs.pleura')} *
            </Label>
            <Textarea
              id="pleura"
              value={formData.pleura || ''}
              onChange={(e) => onFieldChange('pleura', e.target.value)}
              placeholder={language === 'bn' ? "ফুসফুস আবরণী" : "Pleura"}
              rows={3}
              className={`${errors.pleura ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
            />
            {errors.pleura && (
              <p className="text-sm text-red-600">{errors.pleura}</p>
            )}
          </div>
        </div>
      </div>

      {/* Airways Group - Only 2 fields */}
      <div className="rounded-xl bg-gradient-to-r from-slate-50 via-red-50/30 to-pink-50/20 p-5 shadow-sm border border-slate-100/50">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
            <Activity className="h-4 w-4 text-red-600" />
          </span>
          <h4 className="text-base font-semibold text-gray-800">
            {language === 'bn' ? 'বাগযন্ত্র ও শ্বাসনালী' : 'Larynx & Trachea'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ১ - স্বরযন্ত্র */}
          <div className="space-y-2">
            <Label htmlFor="larynx" className="text-base font-medium text-gray-700">
              {language === 'bn' ? 'বাগযন্ত্র' : 'Larynx'} *
            </Label>
            <Textarea
              id="larynx"
              value={formData.larynx || ''}
              onChange={(e) => onFieldChange('larynx', e.target.value)}
              placeholder={language === 'bn' ? "বাগযন্ত্র" : "Larynx"}
              rows={3}
              className={`${errors.larynx ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
            />
            {errors.larynx && (
              <p className="text-sm text-red-600">{errors.larynx}</p>
            )}
          </div>

          {/* ২ - শ্বাসনালী */}
          <div className="space-y-2">
            <Label htmlFor="trachea" className="text-base font-medium text-gray-700">
              {language === 'bn' ? 'শ্বাসনালী' : 'Trachea'} *
            </Label>
            <Textarea
              id="trachea"
              value={formData.trachea || ''}
              onChange={(e) => onFieldChange('trachea', e.target.value)}
              placeholder={language === 'bn' ? "শ্বাসনালী" : "Trachea"}
              rows={3}
              className={`${errors.trachea ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
            />
            {errors.trachea && (
              <p className="text-sm text-red-600">{errors.trachea}</p>
            )}
          </div>
        </div>
      </div>

      {/* Lungs Group */}
      <div className="rounded-xl bg-gradient-to-r from-slate-50 via-emerald-50/30 to-teal-50/20 p-5 shadow-sm border border-slate-100/50">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
            <Package className="h-4 w-4 text-green-600" />
          </span>
          <h4 className="text-base font-semibold text-gray-800">
            {language === 'bn' ? 'ফুসফুস' : 'Lungs'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ১ - ডান ফুসফুস */}
          <div className="space-y-2">
            <Label htmlFor="right_lung" className="text-base font-medium text-gray-700">
              {t('investigation.chest_lungs.right_lung')} *
            </Label>
            <Textarea
              id="right_lung"
              value={formData.right_lung || ''}
              onChange={(e) => onFieldChange('right_lung', e.target.value)}
              placeholder={language === 'bn' ? "ডান ফুসফুস" : "Right lung"}
              rows={3}
              className={`${errors.right_lung ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
            />
            {errors.right_lung && (
              <p className="text-sm text-red-600">{errors.right_lung}</p>
            )}
          </div>

          {/* ২ - বাম ফুসফুস */}
          <div className="space-y-2">
            <Label htmlFor="left_lung" className="text-base font-medium text-gray-700">
              {t('investigation.chest_lungs.left_lung')} *
            </Label>
            <Textarea
              id="left_lung"
              value={formData.left_lung || ''}
              onChange={(e) => onFieldChange('left_lung', e.target.value)}
              placeholder={language === 'bn' ? "বাম ফুসফুস" : "Left lung"}
              rows={3}
              className={`${errors.left_lung ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
            />
            {errors.left_lung && (
              <p className="text-sm text-red-600">{errors.left_lung}</p>
            )}
          </div>
        </div>
      </div>

      {/* Heart & Cardiovascular Group - Added missing fields */}
      <div className="rounded-xl border  p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
            <ActivitySquare className="h-4 w-4 text-yellow-600" />
          </span>
          <h4 className="text-base font-semibold text-gray-800">
            {language === 'bn' ? 'হৃদযন্ত্র এবং রক্তনালী' : 'Heart & Blood Vessels'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ১ - হৃদযন্ত্রের আবরণী */}
          <div className="space-y-2">
            <Label htmlFor="pericardium" className="text-base font-medium text-gray-700">
              {t('investigation.chest_lungs.pericardium')} *
            </Label>
            <Textarea
              id="pericardium"
              value={formData.pericardium || ''}
              onChange={(e) => onFieldChange('pericardium', e.target.value)}
              placeholder={language === 'bn' ? "হৃদযন্ত্রের আবরণী" : "Pericardium"}
              rows={3}
              className={`${errors.pericardium ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
            />
            {errors.pericardium && (
              <p className="text-sm text-red-600">{errors.pericardium}</p>
            )}
          </div>

          {/* ২ - হৃদপিণ্ড */}
          <div className="space-y-2">
            <Label htmlFor="heart" className="text-base font-medium text-gray-700">
              {language === 'bn' ? 'হৃদপিণ্ড' : 'Heart'} *
            </Label>
            <Textarea
              id="heart"
              value={formData.heart || ''}
              onChange={(e) => onFieldChange('heart', e.target.value)}
              placeholder={language === 'bn' ? "হৃদপিণ্ডের অবস্থা" : "Heart condition"}
              rows={3}
              className={`${errors.heart ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
            />
            {errors.heart && (
              <p className="text-sm text-red-600">{errors.heart}</p>
            )}
          </div>

          {/* ৩ - রক্তনালীসমূহ */}
          <div className="space-y-2">
            <Label htmlFor="blood_vessels" className="text-base font-medium text-gray-700">
              {language === 'bn' ? 'রক্তনালীসমূহ' : 'Blood Vessels'} *
            </Label>
            <Textarea
              id="blood_vessels"
              value={formData.blood_vessels || ''}
              onChange={(e) => onFieldChange('blood_vessels', e.target.value)}
              placeholder={language === 'bn' ? "রক্ত নালী" : "Blood vessels"}
              rows={3}
              className={`${errors.blood_vessels ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none`}
            />
            {errors.blood_vessels && (
              <p className="text-sm text-red-600">{errors.blood_vessels}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
