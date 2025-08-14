'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDropdownValues } from '@/hooks/useDropdownValues';

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
  const { thanaOptions, caseTypeOptions, getLabel } = useDropdownValues();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Thana Selection */}
        <div className="space-y-2">
          <Label htmlFor="thana_id" className="text-base font-medium font-bangla">
            {language === 'bn' ? "থানা" : "Thana"} *
          </Label>
          <Select
            value={formData.thana_id || ''}
            onValueChange={(value) => onFieldChange('thana_id', value)}
          >
            <SelectTrigger className="w-full h-11 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300">
              <SelectValue placeholder={language === 'bn' ? "থানা নির্বাচন করুন" : "Select Thana"} />
            </SelectTrigger>
            <SelectContent>
              {thanaOptions.map((thana) => (
                <SelectItem key={thana.value} value={thana.value}>
                  {getLabel(thanaOptions, thana.value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.thana_id && (
            <p className="text-sm text-red-600 flex items-center mt-1">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.thana_id}
            </p>
          )}
        </div>

        {/* Combined Case Type and Number Field */}
        <div className="space-y-2">
          <Label htmlFor="case_type" className="text-base font-medium font-bangla">
            {t('investigation.header.gd_cid_case_no')} *
          </Label>
          <div className="flex h-11">
            {/* Case Type Selection - 1/4 width, consistent height */}
            <div className="w-1/4">
              <Select
                value={formData.case_type || 'none'}
                onValueChange={(value) => onFieldChange('case_type', value)}
              >
                <SelectTrigger className="w-full h-full rounded-l-xl rounded-r-none border-r-0 flex items-center bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300">
                  <SelectValue placeholder={language === 'bn' ? "ধরন" : "Type"} className="flex items-center" />
                </SelectTrigger>
                <SelectContent>
                  {caseTypeOptions.map((caseType) => (
                    <SelectItem key={caseType.value} value={caseType.value}>
                      {getLabel(caseTypeOptions, caseType.value)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Case Number Input - 3/4 width, consistent height */}
            <div className="w-3/4">
              <Input
                id="gd_cid_case_no"
                value={formData.gd_cid_case_no || ''}
                onChange={(e) => onFieldChange('gd_cid_case_no', e.target.value)}
                placeholder={formData.case_type && formData.case_type !== 'none' ? 
                  (language === 'bn' ? `${formData.case_type} নং` : `${formData.case_type} No.`) : 
                  (language === 'bn' ? "প্রথমে মামলার ধরন নির্বাচন করুন" : "Select case type first")}
                className={`${errors.gd_cid_case_no ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''} ${(!formData.case_type || formData.case_type === 'none') ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'} rounded-l-none rounded-r-xl border-l-0 h-full border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300`}
                disabled={!formData.case_type || formData.case_type === 'none'}
              />
            </div>
          </div>
          
          {/* Error messages */}
          {errors.case_type && (
            <p className="text-sm text-red-600 flex items-center mt-1">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.case_type}
            </p>
          )}
          {errors.gd_cid_case_no && (
            <p className="text-sm text-red-600 flex items-center mt-1">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.gd_cid_case_no}
            </p>
          )}
        </div>

        {/* Reference Date */}
        <div className="space-y-2">
          <Label htmlFor="ref_date" className="text-base font-medium font-bangla">
            {t('investigation.header.ref_date')} *
          </Label>
          <Input
            id="ref_date"
            type="date"
            value={formData.ref_date || ''}
            onChange={(e) => onFieldChange('ref_date', e.target.value)}
            className={`h-11 ${errors.ref_date ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 hover:border-gray-300`}
          />
          {errors.ref_date && (
            <p className="text-sm text-red-600 flex items-center mt-1">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.ref_date}
            </p>
          )}
        </div>

        {/* PM Number */}
        <div className="space-y-2">
          <Label htmlFor="pm_no" className="text-base font-medium font-bangla">
            {t('investigation.header.pm_no')} *
          </Label>
          <Input
            id="pm_no"
            value={formData.pm_no || ''}
            onChange={(e) => onFieldChange('pm_no', e.target.value)}
            placeholder={language === 'bn' ? "পিএম নং" : "PM Number"}
            className={`h-11 ${errors.pm_no ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 hover:border-gray-300`}
          />
          {errors.pm_no && (
            <p className="text-sm text-red-600 flex items-center mt-1">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.pm_no}
            </p>
          )}
        </div>

        {/* Report Date */}
        <div className="space-y-2">
          <Label htmlFor="report_date" className="text-base font-medium font-bangla">
            {t('investigation.header.report_date')} *
          </Label>
          <Input
            id="report_date"
            type="date"
            value={formData.report_date || ''}
            onChange={(e) => onFieldChange('report_date', e.target.value)}
            className={`h-11 ${errors.report_date ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 hover:border-gray-300`}
          />
          {errors.report_date && (
            <p className="text-sm text-red-600 flex items-center mt-1">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.report_date}
            </p>
          )}
        </div>

        {/* Station */}
        <div className="space-y-2">
          <Label htmlFor="station" className="text-base font-medium font-bangla">
            {t('investigation.header.station')} *
          </Label>
          <Input
            id="station"
            value={formData.station || ''}
            onChange={(e) => onFieldChange('station', e.target.value)}
            placeholder={language === 'bn' ? "স্টেশন" : "Station"}
            className={`h-11 ${errors.station ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 hover:border-gray-300`}
          />
          {errors.station && (
            <p className="text-sm text-red-600 flex items-center mt-1">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.station}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
