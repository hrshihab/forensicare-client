import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChestLungsSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function ChestLungsSection({ formData, onFieldChange, errors }: ChestLungsSectionProps) {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* ৩ - বক্ষ ও ফুসফুস */}
      <div className="space-y-4">
        {/* First Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ১ - পাঁজর এবং তরুণাস্থি */}
          <div className="space-y-2">
            <Label htmlFor="ribs_cartilage" className="text-base font-medium font-bangla">
              {t('investigation.chest_lungs.ribs_cartilage')} *
            </Label>
            <Textarea
              id="ribs_cartilage"
              value={formData.ribs_cartilage || ''}
              onChange={(e) => onFieldChange('ribs_cartilage', e.target.value)}
              placeholder={language === 'bn' ? "প্রকার—পাজর এবং কোমলাস্থিসমূহ" : "Type—Ribs and cartilages"}
              rows={3}
              className={`${errors.ribs_cartilage ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.ribs_cartilage && (
              <p className="text-sm text-red-600">{errors.ribs_cartilage}</p>
            )}
          </div>

          {/* ২ - ফুসফুসের আবরণী */}
          <div className="space-y-2">
            <Label htmlFor="pleura" className="text-base font-medium font-bangla">
              {t('investigation.chest_lungs.pleura')} *
            </Label>
            <Textarea
              id="pleura"
              value={formData.pleura || ''}
              onChange={(e) => onFieldChange('pleura', e.target.value)}
              placeholder={language === 'bn' ? "ফুসফুস আবরণী" : "Pleura"}
              rows={3}
              className={`${errors.pleura ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.pleura && (
              <p className="text-sm text-red-600">{errors.pleura}</p>
            )}
          </div>
        </div>

        {/* Second Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ৩ - স্বরযন্ত্র, শ্বাসনালী এবং ব্রংকাই */}
          <div className="space-y-2">
            <Label htmlFor="larynx_trachea_bronchi" className="text-base font-medium font-bangla">
              {t('investigation.chest_lungs.larynx_trachea_bronchi')} *
            </Label>
            <Textarea
              id="larynx_trachea_bronchi"
              value={formData.larynx_trachea_bronchi || ''}
              onChange={(e) => onFieldChange('larynx_trachea_bronchi', e.target.value)}
              placeholder={language === 'bn' ? "বাগযন্ত্র ও শ্বাসনালী (ব্রঙ্কাস ও ব্রঙ্কিওলি)" : "Larynx, trachea and bronchi (bronchus and bronchioles)"}
              rows={3}
              className={`${errors.larynx_trachea_bronchi ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.larynx_trachea_bronchi && (
              <p className="text-sm text-red-600">{errors.larynx_trachea_bronchi}</p>
            )}
          </div>

          {/* ৪ - ডান ফুসফুস */}
          <div className="space-y-2">
            <Label htmlFor="right_lung" className="text-base font-medium font-bangla">
              {t('investigation.chest_lungs.right_lung')} *
            </Label>
            <Textarea
              id="right_lung"
              value={formData.right_lung || ''}
              onChange={(e) => onFieldChange('right_lung', e.target.value)}
              placeholder={language === 'bn' ? "ডান ফুসফুস" : "Right lung"}
              rows={3}
              className={`${errors.right_lung ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.right_lung && (
              <p className="text-sm text-red-600">{errors.right_lung}</p>
            )}
          </div>
        </div>

        {/* Third Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ৫ - বাম ফুসফুস */}
          <div className="space-y-2">
            <Label htmlFor="left_lung" className="text-base font-medium font-bangla">
              {t('investigation.chest_lungs.left_lung')} *
            </Label>
            <Textarea
              id="left_lung"
              value={formData.left_lung || ''}
              onChange={(e) => onFieldChange('left_lung', e.target.value)}
              placeholder={language === 'bn' ? "বাম ফুসফুস" : "Left lung"}
              rows={3}
              className={`${errors.left_lung ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.left_lung && (
              <p className="text-sm text-red-600">{errors.left_lung}</p>
            )}
          </div>

          {/* ৬ - হৃদযন্ত্রের আবরণী */}
          <div className="space-y-2">
            <Label htmlFor="pericardium" className="text-base font-medium font-bangla">
              {t('investigation.chest_lungs.pericardium')} *
            </Label>
            <Textarea
              id="pericardium"
              value={formData.pericardium || ''}
              onChange={(e) => onFieldChange('pericardium', e.target.value)}
              placeholder={language === 'bn' ? "হন্ধরা ঝিল্লী" : "Pericardium"}
              rows={3}
              className={`${errors.pericardium ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.pericardium && (
              <p className="text-sm text-red-600">{errors.pericardium}</p>
            )}
          </div>
        </div>

        {/* Fourth Row - 2 fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ৭ - হৃদযন্ত্র */}
          <div className="space-y-2">
            <Label htmlFor="heart" className="text-base font-medium font-bangla">
              {t('investigation.chest_lungs.heart')} *
            </Label>
            <Textarea
              id="heart"
              value={formData.heart || ''}
              onChange={(e) => onFieldChange('heart', e.target.value)}
              placeholder={language === 'bn' ? "হৃদপিণ্ড" : "Heart"}
              rows={3}
              className={`${errors.heart ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.heart && (
              <p className="text-sm text-red-600">{errors.heart}</p>
            )}
          </div>

          {/* ৮ - রক্তনালীসমূহ */}
          <div className="space-y-2">
            <Label htmlFor="blood_vessels" className="text-base font-medium font-bangla">
              {t('investigation.chest_lungs.blood_vessels')} *
            </Label>
            <Textarea
              id="blood_vessels"
              value={formData.blood_vessels || ''}
              onChange={(e) => onFieldChange('blood_vessels', e.target.value)}
              placeholder={language === 'bn' ? "রক্ত নালী" : "Blood vessels"}
              rows={3}
              className={`${errors.blood_vessels ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
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
