import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface AbdomenSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function AbdomenSection({ formData, onFieldChange, errors }: AbdomenSectionProps) {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* ৪ - উদর */}
      <div className="space-y-4">
        {/* First Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ১ - প্রকারসমূহ */}
          <div className="space-y-2">
            <Label htmlFor="abdominal_general" className="text-sm font-medium">
              {t('investigation.abdomen.abdominal_general')} *
            </Label>
            <Textarea
              id="abdominal_general"
              value={formData.abdominal_general || ''}
              onChange={(e) => onFieldChange('abdominal_general', e.target.value)}
              placeholder={language === 'bn' ? "প্রকারসমূহ" : "General types"}
              rows={3}
              className={`${errors.abdominal_general ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.abdominal_general && (
              <p className="text-sm text-red-600">{errors.abdominal_general}</p>
            )}
          </div>

          {/* ২ - উদরের উপরের ঝিল্লী */}
          <div className="space-y-2">
            <Label htmlFor="peritoneum" className="text-sm font-medium">
              {t('investigation.abdomen.peritoneum')} *
            </Label>
            <Textarea
              id="peritoneum"
              value={formData.peritoneum || ''}
              onChange={(e) => onFieldChange('peritoneum', e.target.value)}
              placeholder={language === 'bn' ? "উদরের উপরের ঝিল্লী" : "Upper abdominal membrane"}
              rows={3}
              className={`${errors.peritoneum ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.peritoneum && (
              <p className="text-sm text-red-600">{errors.peritoneum}</p>
            )}
          </div>
        </div>

        {/* Second Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ৩ - মুখ, শ্বাসনালী এবং অন্ননালী */}
          <div className="space-y-2">
            <Label htmlFor="mouth_trachea_esophagus" className="text-sm font-medium">
              {t('investigation.abdomen.mouth_trachea_esophagus')} *
            </Label>
            <Textarea
              id="mouth_trachea_esophagus"
              value={formData.mouth_trachea_esophagus || ''}
              onChange={(e) => onFieldChange('mouth_trachea_esophagus', e.target.value)}
              placeholder={language === 'bn' ? "মুখ, শ্বাসনালী এবং অন্ননালী" : "Mouth, trachea and esophagus"}
              rows={3}
              className={`${errors.mouth_trachea_esophagus ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.mouth_trachea_esophagus && (
              <p className="text-sm text-red-600">{errors.mouth_trachea_esophagus}</p>
            )}
          </div>

          {/* ৪ - পাকস্থলী এবং উহার অভ্যন্তরস্থ বস্তুসমূহ */}
          <div className="space-y-2">
            <Label htmlFor="stomach_and_contents" className="text-sm font-medium">
              {t('investigation.abdomen.stomach_and_contents')} *
            </Label>
            <Textarea
              id="stomach_and_contents"
              value={formData.stomach_and_contents || ''}
              onChange={(e) => onFieldChange('stomach_and_contents', e.target.value)}
              placeholder={language === 'bn' ? "পাকস্থলী এবং উহার অভ্যন্তরস্থ বস্তুসমূহ" : "Stomach and its contents"}
              rows={3}
              className={`${errors.stomach_and_contents ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.stomach_and_contents && (
              <p className="text-sm text-red-600">{errors.stomach_and_contents}</p>
            )}
          </div>
        </div>

        {/* Third Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ৫ - ক্ষুদ্রান্ত্র ও উহার অভ্যন্তরস্থ বস্তুসমূহ */}
          <div className="space-y-2">
            <Label htmlFor="small_intestine_and_contents" className="text-sm font-medium">
              {t('investigation.abdomen.small_intestine_and_contents')} *
            </Label>
            <Textarea
              id="small_intestine_and_contents"
              value={formData.small_intestine_and_contents || ''}
              onChange={(e) => onFieldChange('small_intestine_and_contents', e.target.value)}
              placeholder={language === 'bn' ? "ক্ষুদ্রান্ত্র ও উহার অভ্যন্তরস্থ বস্তুসমূহ" : "Small intestine and its contents"}
              rows={3}
              className={`${errors.small_intestine_and_contents ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.small_intestine_and_contents && (
              <p className="text-sm text-red-600">{errors.small_intestine_and_contents}</p>
            )}
          </div>

          {/* ৬ - বৃহদান্ত্র ও উহার অভ্যন্তরস্থ বস্তুসমূহ */}
          <div className="space-y-2">
            <Label htmlFor="large_intestine_and_contents" className="text-sm font-medium">
              {t('investigation.abdomen.large_intestine_and_contents')} *
            </Label>
            <Textarea
              id="large_intestine_and_contents"
              value={formData.large_intestine_and_contents || ''}
              onChange={(e) => onFieldChange('large_intestine_and_contents', e.target.value)}
              placeholder={language === 'bn' ? "বৃহদান্ত্র ও উহার অভ্যন্তরস্থ বস্তুসমূহ" : "Large intestine and its contents"}
              rows={3}
              className={`${errors.large_intestine_and_contents ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.large_intestine_and_contents && (
              <p className="text-sm text-red-600">{errors.large_intestine_and_contents}</p>
            )}
          </div>
        </div>

        {/* Fourth Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ৭ - যকৃৎ */}
          <div className="space-y-2">
            <Label htmlFor="liver" className="text-sm font-medium">
              {t('investigation.abdomen.liver')} *
            </Label>
            <Textarea
              id="liver"
              value={formData.liver || ''}
              onChange={(e) => onFieldChange('liver', e.target.value)}
              placeholder={language === 'bn' ? "যকৃৎ" : "Liver"}
              rows={3}
              className={`${errors.liver ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.liver && (
              <p className="text-sm text-red-600">{errors.liver}</p>
            )}
          </div>

          {/* ৮ - প্লীহা */}
          <div className="space-y-2">
            <Label htmlFor="spleen" className="text-sm font-medium">
              {t('investigation.abdomen.spleen')} *
            </Label>
            <Textarea
              id="spleen"
              value={formData.spleen || ''}
              onChange={(e) => onFieldChange('spleen', e.target.value)}
              placeholder={language === 'bn' ? "প্লীহা" : "Spleen"}
              rows={3}
              className={`${errors.spleen ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.spleen && (
              <p className="text-sm text-red-600">{errors.spleen}</p>
            )}
          </div>
        </div>

        {/* Fifth Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ৯ - মূত্রাশয়সমূহ */}
          <div className="space-y-2">
            <Label htmlFor="kidneys" className="text-sm font-medium">
              {t('investigation.abdomen.kidneys')} *
            </Label>
            <Textarea
              id="kidneys"
              value={formData.kidneys || ''}
              onChange={(e) => onFieldChange('kidneys', e.target.value)}
              placeholder={language === 'bn' ? "মূত্রাশয়সমূহ" : "Kidneys"}
              rows={3}
              className={`${errors.kidneys ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.kidneys && (
              <p className="text-sm text-red-600">{errors.kidneys}</p>
            )}
          </div>

          {/* ১০ - মুত্রাস্থলী */}
          <div className="space-y-2">
            <Label htmlFor="urinary_bladder" className="text-sm font-medium">
              {t('investigation.abdomen.urinary_bladder')} *
            </Label>
            <Textarea
              id="urinary_bladder"
              value={formData.urinary_bladder || ''}
              onChange={(e) => onFieldChange('urinary_bladder', e.target.value)}
              placeholder={language === 'bn' ? "মুত্রাস্থলী" : "Urinary bladder"}
              rows={3}
              className={`${errors.urinary_bladder ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.urinary_bladder && (
              <p className="text-sm text-red-600">{errors.urinary_bladder}</p>
            )}
          </div>
        </div>

        {/* Sixth Row - 1 field spanning full width */}
        <div className="space-y-2">
          {/* ১১ - প্রজনন অঙ্গসমূহ বাহিরের এবং ভিতরের */}
          <Label htmlFor="genital_organs" className="text-sm font-medium">
            {t('investigation.abdomen.genital_organs')} *
          </Label>
          <Textarea
            id="genital_organs"
            value={formData.genital_organs || ''}
            onChange={(e) => onFieldChange('genital_organs', e.target.value)}
            placeholder={language === 'bn' ? "প্রজনন অঙ্গসমূহ বাহিরের এবং ভিতরের" : "External and internal reproductive organs"}
            rows={3}
            className={`${errors.genital_organs ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          />
          {errors.genital_organs && (
            <p className="text-sm text-red-600">{errors.genital_organs}</p>
          )}
        </div>
      </div>
    </div>
  );
}
