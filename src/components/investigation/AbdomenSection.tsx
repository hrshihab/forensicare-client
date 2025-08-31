import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/ui/section-header';
import { Package, Shield, Activity, Heart, ActivitySquare } from 'lucide-react';
import abdomenImage from '@/assets/abdomen.png';

interface AbdomenSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function AbdomenSection({ formData, onFieldChange, errors }: AbdomenSectionProps) {
  const { t, language } = useLanguage();

  // Calculate completion percentage for Abdomen section - exactly 11 fields
  const requiredFields = [
    'abdominal_general',
    'peritoneum',
    'mouth_trachea_esophagus',
    'stomach_and_contents',
    'small_intestine_and_contents',
    'large_intestine_and_contents',
    'liver',
    'spleen',
    'kidneys',
    'urinary_bladder',
    'genital_organs'
  ];
  
  const completedFields = requiredFields.filter(field => formData[field]).length;

  return (
    <div className="space-y-6">
      {/* Section Header with Progress */}
      <SectionHeader
        icon={Package}
        iconBgColor="bg-yellow-100"
        iconColor="text-yellow-600"
        title={language === 'bn' ? 'উদর' : 'Abdomen'}
        description={language === 'bn' ? 
          'উদর গহ্বরের অঙ্গসমূহ এবং পাচনতন্ত্রের পরীক্ষা' : 
          'Examination of abdominal cavity organs and digestive system'
        }
        completedFields={completedFields}
        totalFields={requiredFields.length}
        progressVariant="yellow"
        progressSize="medium"
      />

      {/* Professional Abdomen Visualization */}
      {/* <div className="relative overflow-hidden rounded-lg bg-white border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-20 h-20 rounded-lg bg-gray-50 border border-gray-200 p-2">
            <img 
              src={abdomenImage.src} 
              alt="Abdomen Anatomy" 
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {language === 'bn' ? 'উদর গহ্বরের অঙ্গসমূহ' : 'Abdomen Organs Visualization'}
            </h3>
            <p className="text-gray-600 text-sm">
              {language === 'bn' ? 'উদর গহ্বরের অঙ্গসমূহ এবং পাচনতন্ত্রের পরীক্ষা' : 
              'Examination of abdominal cavity organs and digestive system'
            }
            </p>
          </div>
        </div>
      </div> */}

      {/* General Abdomen Group - Professional White */}
      <div className="rounded-lg bg-gradient-to-r from-slate-50 via-blue-50/30 to-indigo-50/20 p-5 shadow-sm border border-slate-100/50">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 border border-blue-200">
            <Shield className="h-4 w-4 text-blue-700" />
          </span>
          <h4 className="text-lg font-semibold text-blue-900">
            {language === 'bn' ? 'সাধারণ উদর' : 'General Abdomen'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ১ - প্রকারসমূহ / General abdomen */}
          <div className="space-y-3 group">
            <Label htmlFor="abdominal_general" className="text-base font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
              {language === 'bn' ? 'প্রকারসমূহ' : 'General abdomen'} *
            </Label>
            <Textarea
              id="abdominal_general"
              value={formData.abdominal_general || ''}
              onChange={(e) => onFieldChange('abdominal_general', e.target.value)}
              placeholder={language === 'bn' ? "প্রকারসমূহ" : "General types"}
              rows={3}
                              className={`${errors.abdominal_general ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.abdominal_general && (
              <p className="text-sm text-red-600">{errors.abdominal_general}</p>
            )}
          </div>

          {/* ২ - উদরের উপরের ঝিল্লী / Peritoneum */}
          <div className="space-y-3 group">
            <Label htmlFor="peritoneum" className="text-base font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
              {language === 'bn' ? 'উদরের উপরের ঝিল্লী' : 'Peritoneum'} *
            </Label>
            <Textarea
              id="peritoneum"
              value={formData.peritoneum || ''}
              onChange={(e) => onFieldChange('peritoneum', e.target.value)}
              placeholder={language === 'bn' ? "উদরের উপরের ঝিল্লী" : "Upper abdominal membrane"}
              rows={3}
                              className={`${errors.peritoneum ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.peritoneum && (
              <p className="text-sm text-red-600">{errors.peritoneum}</p>
            )}
          </div>
          </div>
        </div>

      {/* Digestive System Group - Professional */}
      <div className="rounded-lg bg-gradient-to-r from-slate-50 via-orange-50/30 to-amber-50/20 p-5 shadow-sm border border-slate-100/50">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 border border-orange-200">
            <Activity className="h-4 w-4 text-orange-700" />
          </span>
          <h4 className="text-lg font-semibold text-orange-900">
            {language === 'bn' ? 'পাচনতন্ত্র' : 'Digestive System'}
          </h4>
        </div>
        <div className="space-y-4">
          {/* First Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ৩ - মুখ/শ্বাসনালী/অন্ননালী / Mouth–Trachea–Esophagus */}
            <div className="space-y-3 group">
              <Label htmlFor="mouth_trachea_esophagus" className="text-base font-semibold text-gray-700 group-hover:text-orange-700 transition-colors">
                {language === 'bn' ? 'মুখ/শ্বাসনালী/অন্ননালী' : 'Mouth–Trachea–Esophagus'} *
            </Label>
            <Textarea
              id="mouth_trachea_esophagus"
              value={formData.mouth_trachea_esophagus || ''}
              onChange={(e) => onFieldChange('mouth_trachea_esophagus', e.target.value)}
              placeholder={language === 'bn' ? "মুখ, শ্বাসনালী এবং অন্ননালী" : "Mouth, trachea and esophagus"}
              rows={3}
                className={`${errors.mouth_trachea_esophagus ? 'border-red-500' : ''} focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.mouth_trachea_esophagus && (
              <p className="text-sm text-red-600">{errors.mouth_trachea_esophagus}</p>
            )}
          </div>

            {/* ৪ - পাকস্থলী ও ভিতরের বস্তু / Stomach & contents */}
            <div className="space-y-3 group">
              <Label htmlFor="stomach_and_contents" className="text-base font-semibold text-gray-700 group-hover:text-orange-700 transition-colors">
                {language === 'bn' ? 'পাকস্থলী ও ভিতরের বস্তু' : 'Stomach & contents'} *
            </Label>
            <Textarea
              id="stomach_and_contents"
              value={formData.stomach_and_contents || ''}
              onChange={(e) => onFieldChange('stomach_and_contents', e.target.value)}
              placeholder={language === 'bn' ? "পাকস্থলী এবং উহার অভ্যন্তরস্থ বস্তুসমূহ" : "Stomach and its contents"}
              rows={3}
                className={`${errors.stomach_and_contents ? 'border-red-500' : ''} focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.stomach_and_contents && (
              <p className="text-sm text-red-600">{errors.stomach_and_contents}</p>
            )}
          </div>
        </div>

          {/* Second Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ৫ - ক্ষুদ্রান্ত্র ও ভিতরের বস্তু / Small intestine & contents */}
            <div className="space-y-3 group">
              <Label htmlFor="small_intestine_and_contents" className="text-base font-semibold text-gray-700 group-hover:text-orange-700 transition-colors">
                {language === 'bn' ? 'ক্ষুদ্রান্ত্র ও ভিতরের বস্তু' : 'Small intestine & contents'} *
            </Label>
            <Textarea
              id="small_intestine_and_contents"
              value={formData.small_intestine_and_contents || ''}
              onChange={(e) => onFieldChange('small_intestine_and_contents', e.target.value)}
                placeholder={language === 'bn' ? "ক্ষুদ্রান্ত্র এবং উহার অভ্যন্তরস্থ বস্তুসমূহ" : "Small intestine and its contents"}
              rows={3}
                className={`${errors.small_intestine_and_contents ? 'border-red-500' : ''} focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.small_intestine_and_contents && (
              <p className="text-sm text-red-600">{errors.small_intestine_and_contents}</p>
            )}
          </div>

            {/* ৬ - বৃহ্দান্ত্র ও ভিতরের বস্তু / Large intestine & contents */}
            <div className="space-y-3 group">
              <Label htmlFor="large_intestine_and_contents" className="text-base font-semibold text-gray-700 group-hover:text-orange-700 transition-colors">
                {language === 'bn' ? 'বৃহ্দান্ত্র ও ভিতরের বস্তু' : 'Large intestine & contents'} *
            </Label>
            <Textarea
              id="large_intestine_and_contents"
              value={formData.large_intestine_and_contents || ''}
              onChange={(e) => onFieldChange('large_intestine_and_contents', e.target.value)}
                placeholder={language === 'bn' ? "বৃহদন্ত্র এবং উহার অভ্যন্তরস্থ বস্তুসমূহ" : "Large intestine and its contents"}
              rows={3}
                className={`${errors.large_intestine_and_contents ? 'border-red-500' : ''} focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.large_intestine_and_contents && (
              <p className="text-sm text-red-600">{errors.large_intestine_and_contents}</p>
            )}
            </div>
          </div>
          </div>
        </div>

      {/* Liver & Spleen Group - Professional */}
      <div className="rounded-lg bg-gradient-to-r from-slate-50 via-emerald-50/30 to-teal-50/20 p-5 shadow-sm border border-slate-100/50">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 border border-green-200">
            <Heart className="h-4 w-4 text-green-700" />
          </span>
          <h4 className="text-lg font-semibold text-green-900">
            {language === 'bn' ? 'যকৃত ও প্লীহা' : 'Liver & Spleen'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ৭ - যকৃত / Liver */}
          <div className="space-y-3 group">
            <Label htmlFor="liver" className="text-base font-semibold text-gray-700 group-hover:text-green-700 transition-colors">
              {language === 'bn' ? 'যকৃত' : 'Liver'} *
            </Label>
            <Textarea
              id="liver"
              value={formData.liver || ''}
              onChange={(e) => onFieldChange('liver', e.target.value)}
              placeholder={language === 'bn' ? "যকৃত" : "Liver"}
              rows={3}
                              className={`${errors.liver ? 'border-red-500' : ''} focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.liver && (
              <p className="text-sm text-red-600">{errors.liver}</p>
            )}
          </div>

          {/* ৮ - প্লীহা / Spleen */}
          <div className="space-y-3 group">
            <Label htmlFor="spleen" className="text-base font-semibold text-gray-700 group-hover:text-green-700 transition-colors">
              {language === 'bn' ? 'প্লীহা' : 'Spleen'} *
            </Label>
            <Textarea
              id="spleen"
              value={formData.spleen || ''}
              onChange={(e) => onFieldChange('spleen', e.target.value)}
              placeholder={language === 'bn' ? "প্লীহা" : "Spleen"}
              rows={3}
              className={`${errors.spleen ? 'border-red-500' : ''} focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.spleen && (
              <p className="text-sm text-red-600">{errors.spleen}</p>
            )}
          </div>
          </div>
        </div>

      {/* Urinary & Reproductive Group - Professional */}
      <div className="rounded-lg bg-gradient-to-r from-slate-50 via-yellow-50/30 to-amber-50/20 p-5 shadow-sm border border-slate-100/50">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-100 border border-yellow-200">
            <Package className="h-4 w-4 text-yellow-700" />
          </span>
          <h4 className="text-lg font-semibold text-yellow-900">
            {language === 'bn' ? 'মূত্রতন্ত্র ও জননতন্ত্র' : 'Urinary & Reproductive'}
          </h4>
        </div>
        <div className="space-y-4">
          {/* First Row - 2 fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ৯ - মূত্রাশয়সমূহ (কিডনি) / Kidneys */}
            <div className="space-y-3 group">
              <Label htmlFor="kidneys" className="text-base font-semibold text-gray-700 group-hover:text-yellow-700 transition-colors">
                {language === 'bn' ? 'মূত্রাশয়সমূহ (কিডনি)' : 'Kidneys'} *
            </Label>
            <Textarea
              id="kidneys"
              value={formData.kidneys || ''}
              onChange={(e) => onFieldChange('kidneys', e.target.value)}
                placeholder={language === 'bn' ? "মূত্রাশয়সমূহ (কিডনি)" : "Kidneys"}
              rows={3}
                className={`${errors.kidneys ? 'border-red-500' : ''} focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.kidneys && (
              <p className="text-sm text-red-600">{errors.kidneys}</p>
            )}
          </div>

            {/* ১০ - মূত্রাস্থলী / Urinary bladder */}
            <div className="space-y-3 group">
              <Label htmlFor="urinary_bladder" className="text-base font-semibold text-gray-700 group-hover:text-yellow-700 transition-colors">
                {language === 'bn' ? 'মূত্রাস্থলী' : 'Urinary bladder'} *
            </Label>
            <Textarea
              id="urinary_bladder"
              value={formData.urinary_bladder || ''}
              onChange={(e) => onFieldChange('urinary_bladder', e.target.value)}
                placeholder={language === 'bn' ? "মূত্রাস্থলী" : "Urinary bladder"}
              rows={3}
                className={`${errors.urinary_bladder ? 'border-red-500' : ''} focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
            />
            {errors.urinary_bladder && (
              <p className="text-sm text-red-600">{errors.urinary_bladder}</p>
            )}
          </div>
        </div>

          {/* Second Row - 1 field spanning full width */}
          <div className="space-y-3 group">
            {/* ১১ - প্রজনন অঙ্গ (বাহিরে/ভিতরে) / Genital organs (ext/int) */}
            <Label htmlFor="genital_organs" className="text-base font-semibold text-gray-700 group-hover:text-yellow-700 transition-colors">
              {language === 'bn' ? 'প্রজনন অঙ্গ (বাহিরে/ভিতরে)' : 'Genital organs (ext/int)'} *
          </Label>
          <Textarea
            id="genital_organs"
            value={formData.genital_organs || ''}
            onChange={(e) => onFieldChange('genital_organs', e.target.value)}
              placeholder={language === 'bn' ? "প্রজনন অঙ্গ (বাহিরে/ভিতরে)" : "Genital organs (external/internal)"}
            rows={3}
              className={`${errors.genital_organs ? 'border-red-500' : ''} focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-300 resize-none rounded-lg shadow-sm hover:shadow-md`}
          />
          {errors.genital_organs && (
            <p className="text-sm text-red-600">{errors.genital_organs}</p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
