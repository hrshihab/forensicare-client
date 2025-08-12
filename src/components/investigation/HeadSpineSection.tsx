import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeadSpineSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function HeadSpineSection({ formData, onFieldChange, errors }: HeadSpineSectionProps) {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* ২ - মাথার খুলি এবং মেরুদন্ডের নল */}
      <div className="space-y-4">
        {/* First Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ১ - মাথার বহিরাবরণ__মাথার খুলি এবং মেরুদন্ডের অস্থি খন্ডসমূহ */}
          <div className="space-y-2">
            <Label htmlFor="scalp_skull_vertebrae" className="text-sm font-medium">
              {t('investigation.head_spine.scalp_skull_vertebrae')} *
            </Label>
            <Textarea
              id="scalp_skull_vertebrae"
              value={formData.scalp_skull_vertebrae || ''}
              onChange={(e) => onFieldChange('scalp_skull_vertebrae', e.target.value)}
              placeholder={language === 'bn' ? "মাথার বহিরাবরণ, মাথার খুলি এবং মেরুদন্ডের অস্থি খন্ডসমূহ" : "Scalp, skull and vertebral bone fragments"}
              rows={3}
              className={`${errors.scalp_skull_vertebrae ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.scalp_skull_vertebrae && (
              <p className="text-sm text-red-600">{errors.scalp_skull_vertebrae}</p>
            )}
          </div>

          {/* ২ - ঝিল্লী */}
          <div className="space-y-2">
            <Label htmlFor="meninges" className="text-sm font-medium">
              {t('investigation.head_spine.meninges')} *
            </Label>
            <Textarea
              id="meninges"
              value={formData.meninges || ''}
              onChange={(e) => onFieldChange('meninges', e.target.value)}
              placeholder={language === 'bn' ? "ঝিল্লী" : "Meninges"}
              rows={3}
              className={`${errors.meninges ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.meninges && (
              <p className="text-sm text-red-600">{errors.meninges}</p>
            )}
          </div>
        </div>

        {/* Second Row - 1 field spanning full width */}
        <div className="space-y-2">
          {/* ৩ - মস্তিষ্ক এবং রজ্জু */}
          <Label htmlFor="brain_spinal" className="text-sm font-medium">
            {t('investigation.head_spine.brain_spinal')} *
          </Label>
          <Textarea
            id="brain_spinal"
            value={formData.brain_spinal || ''}
            onChange={(e) => onFieldChange('brain_spinal', e.target.value)}
            placeholder={language === 'bn' ? "মস্তিষ্ক এবং রজ্জু (যদি কোন রোগ অথবা যখমের নিদর্শন না থাকে তাহা হইলে মেরুদন্ডের নল পরীক্ষার দরকার নাই)" : "Brain and spinal cord (if no signs of disease or injury, spinal canal examination not required)"}
            rows={3}
            className={`${errors.brain_spinal ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          />
          {errors.brain_spinal && (
            <p className="text-sm text-red-600">{errors.brain_spinal}</p>
          )}
        </div>
      </div>
    </div>
  );
}
