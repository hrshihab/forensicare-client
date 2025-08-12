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
    // Always return English name for field values, but show localized name for display
    return language === 'bn' ? item.name_bn : item.name_en;
  };

  const getFieldValue = (item: any) => {
    // Always return English name for field values (stored in database)
    return item.name_en;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Thana Selection */}
        <div className="space-y-2">
          <Label htmlFor="thana_id" className="text-sm font-medium">
            Thana *
          </Label>
          <Select
            value={formData.thana_id || ''}
            onValueChange={(value) => onFieldChange('thana_id', value)}
          >
            <SelectTrigger className="w-full h-10">
              <SelectValue placeholder="Select Thana" />
            </SelectTrigger>
            <SelectContent>
              {thanas.map((thana) => (
                <SelectItem key={thana.id} value={getFieldValue(thana)}>
                  {getLocalizedName(thana)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.thana_id && (
            <p className="text-sm text-red-600">{errors.thana_id}</p>
          )}
        </div>

        {/* Combined Case Type and Number Field */}
        <div className="space-y-2">
          <Label htmlFor="case_type" className="text-sm font-medium">
            {t('investigation.header.gd_cid_case_no')} *
          </Label>
          <div className="flex h-10">
            {/* Case Type Selection - 1/4 width, consistent height */}
            <div className="w-1/4">
              <Select
                value={formData.case_type || 'none'}
                onValueChange={(value) => onFieldChange('case_type', value)}
              >
                <SelectTrigger className="w-full h-full rounded-r-none border-r-0 flex items-center">
                  <SelectValue placeholder="Type" className="flex items-center" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="GD">GD</SelectItem>
                  <SelectItem value="CID">CID</SelectItem>
                  <SelectItem value="CASE">CASE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Case Number Input - 3/4 width, consistent height */}
            <div className="w-3/4">
              <Input
                id="gd_cid_case_no"
                value={formData.gd_cid_case_no || ''}
                onChange={(e) => onFieldChange('gd_cid_case_no', e.target.value)}
                placeholder={formData.case_type && formData.case_type !== 'none' ? `${formData.case_type} No.` : "Select case type first"}
                className={`${errors.gd_cid_case_no ? 'border-red-500' : ''} ${(!formData.case_type || formData.case_type === 'none') ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} rounded-l-none border-l-0 h-full`}
                disabled={!formData.case_type || formData.case_type === 'none'}
              />
            </div>
          </div>
          
          {/* Error messages */}
          {errors.case_type && (
            <p className="text-sm text-red-600">{errors.case_type}</p>
          )}
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
            className={`h-10 ${errors.ref_date ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
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
            placeholder="PM No."
            className={`h-10 ${errors.pm_no ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            onChange={(e) => onFieldChange('pm_no', e.target.value)}
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
            className={`h-10 ${errors.report_date ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
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
          <Input
            id="station"
            value="DMC MORGUE"
            className="h-10 border-gray-300 bg-gray-50 text-gray-700 cursor-not-allowed"
            disabled
            readOnly
          />
        </div>
      </div>
    </div>
  );
};
