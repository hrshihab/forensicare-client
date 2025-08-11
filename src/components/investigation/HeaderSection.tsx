'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HeaderSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: any;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  formData,
  onFieldChange,
  errors
}) => {
  const { t, language } = useLanguage();

  // Mock data for cascader - in real app this would come from API
  const divisions = [
    { id: '1', name_bn: 'ঢাকা', name_en: 'Dhaka' }
  ];
  
  const districts = [
    { id: '1', division_id: '1', name_bn: 'ঢাকা', name_en: 'Dhaka' }
  ];
  
  const thanas = [
    { id: '1', district_id: '1', name_bn: 'ধানমন্ডি', name_en: 'Dhanmondi' },
    { id: '2', district_id: '1', name_bn: 'গুলশান', name_en: 'Gulshan' },
    { id: '3', district_id: '1', name_bn: 'বনানী', name_en: 'Banani' }
  ];

  const getLocalizedName = (item: any) => {
    return language === 'bn' ? item.name_bn : item.name_en;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Thana Selection */}
        <div className="space-y-2">
          <Label htmlFor="thana_id" className="text-sm font-medium">
            {t('investigation.header.thana')} *
          </Label>
          <Select
            value={formData.thana_id || ''}
            onValueChange={(value) => onFieldChange('thana_id', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('investigation.header.thana')} />
            </SelectTrigger>
            <SelectContent>
              {thanas.map((thana) => (
                <SelectItem key={thana.id} value={thana.id}>
                  {getLocalizedName(thana)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.thana_id && (
            <p className="text-sm text-red-600">{errors.thana_id}</p>
          )}
        </div>

        {/* GD/CID/Case Number */}
        <div className="space-y-2">
          <Label htmlFor="gd_cid_case_no" className="text-sm font-medium">
            {t('investigation.header.gd_cid_case_no')} *
          </Label>
          <Input
            id="gd_cid_case_no"
            value={formData.gd_cid_case_no || ''}
            onChange={(e) => onFieldChange('gd_cid_case_no', e.target.value)}
            placeholder="GD/CID/Case No."
            className={errors.gd_cid_case_no ? 'border-red-500' : ''}
          />
          {errors.gd_cid_case_no && (
            <p className="text-sm text-red-600">{errors.gd_cid_case_no}</p>
          )}
        </div>

        {/* Reference Date */}
        <div className="space-y-2">
          <Label htmlFor="ref_date" className="text-sm font-medium">
            {t('investigation.header.ref_date')} *
          </Label>
          <Input
            id="ref_date"
            type="date"
            value={formData.ref_date || ''}
            onChange={(e) => onFieldChange('ref_date', e.target.value)}
            className={errors.ref_date ? 'border-red-500' : ''}
          />
          {errors.ref_date && (
            <p className="text-sm text-red-600">{errors.ref_date}</p>
          )}
        </div>

        {/* PM Number */}
        <div className="space-y-2">
          <Label htmlFor="pm_no" className="text-sm font-medium">
            {t('investigation.header.pm_no')} *
          </Label>
          <Input
            id="pm_no"
            value={formData.pm_no || ''}
            onChange={(e) => onFieldChange('pm_no', e.target.value)}
            placeholder="PM No."
            className={errors.pm_no ? 'border-red-500' : ''}
          />
          {errors.pm_no && (
            <p className="text-sm text-red-600">{errors.pm_no}</p>
          )}
        </div>

        {/* Report Date */}
        <div className="space-y-2">
          <Label htmlFor="report_date" className="text-sm font-medium">
            {t('investigation.header.report_date')} *
          </Label>
          <Input
            id="report_date"
            type="date"
            value={formData.report_date || ''}
            onChange={(e) => onFieldChange('report_date', e.target.value)}
            className={errors.report_date ? 'border-red-500' : ''}
          />
          {errors.report_date && (
            <p className="text-sm text-red-600">{errors.report_date}</p>
          )}
        </div>

        {/* Station */}
        <div className="space-y-2">
          <Label htmlFor="station" className="text-sm font-medium">
            {t('investigation.header.station')} *
          </Label>
          <div className="flex gap-2">
            <Select
              value={formData.station && ['dmc_morgue', 'kmc', 'cmc'].includes(formData.station) ? formData.station : 'other'}
              onValueChange={(value) => {
                if (value === 'other') {
                  onFieldChange('station', '');
                } else {
                  onFieldChange('station', value);
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dmc_morgue">
                  {t('investigation.header.station_options.dmc_morgue')}
                </SelectItem>
                <SelectItem value="kmc">
                  {t('investigation.header.station_options.kmc')}
                </SelectItem>
                <SelectItem value="cmc">
                  {t('investigation.header.station_options.cmc')}
                </SelectItem>
                <SelectItem value="other">
                  {t('investigation.header.station_options.other')}
                </SelectItem>
              </SelectContent>
            </Select>
            {(formData.station === 'other' || !formData.station || 
              !['dmc_morgue', 'kmc', 'cmc'].includes(formData.station)) && (
              <Input
                id="station_custom"
                value={formData.station && !['dmc_morgue', 'kmc', 'cmc'].includes(formData.station) ? formData.station : ''}
                onChange={(e) => onFieldChange('station', e.target.value)}
                placeholder={t('investigation.header.station_options.other')}
                className={`flex-1 ${errors.station ? 'border-red-500' : ''}`}
              />
            )}
          </div>
          {errors.station && (
            <p className="text-sm text-red-600">{errors.station}</p>
          )}
        </div>
      </div>

      {/* Date Components */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year_val" className="text-sm font-medium">
            {t('investigation.header.year')}
          </Label>
          <Input
            id="year_val"
            type="number"
            min="1900"
            max="2100"
            value={formData.year_val || ''}
            onChange={(e) => onFieldChange('year_val', parseInt(e.target.value) || undefined)}
            placeholder="Year"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="month_val" className="text-sm font-medium">
            {t('investigation.header.month')}
          </Label>
          <Select
            value={formData.month_val?.toString() || ''}
            onValueChange={(value) => onFieldChange('month_val', parseInt(value) || undefined)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <SelectItem key={month} value={month.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="day_val" className="text-sm font-medium">
            {t('investigation.header.day')}
          </Label>
          <Select
            value={formData.day_val?.toString() || ''}
            onValueChange={(value) => onFieldChange('day_val', parseInt(value) || undefined)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <SelectItem key={day} value={day.toString()}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div> */}
    </div>
  );
};
