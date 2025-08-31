'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDropdownValues } from '@/hooks/useDropdownValues';
import SectionHeader from '@/components/ui/section-header';
import { FileText, MapPin, Calendar, Hash } from 'lucide-react';

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

  // Calculate completion percentage for Header section
  const requiredFields = [
    'thana_id',
    'case_type',
    'gd_cid_case_no',
    'ref_date',
    'pm_no',
    'report_date',
    'station'
  ];
  
  const completedFields = requiredFields.filter(field => {
    if (field === 'gd_cid_case_no') {
      return formData.case_type && formData.case_type !== 'none' && formData[field];
    }
    return formData[field];
  }).length;

  return (
    <div className="space-y-6">
      {/* Section Header with Progress */}
      <SectionHeader
        icon={FileText}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        title={language === 'bn' ? 'হেডিং তথ্য' : 'Header Information'}
        description={language === 'bn' ? 
          'মামলার প্রাথমিক তথ্য, থানা, মামলা নম্বর এবং তারিখসমূহ' : 
          'Primary case information, thana, case numbers, and dates'
        }
        completedFields={completedFields}
        totalFields={requiredFields.length}
        progressVariant="blue"
        progressSize="medium"
      />

      {/* Case Information Group - Blue */}
      <div className="rounded-xl bg-gradient-to-r from-slate-50 via-blue-50/30 to-indigo-50/20 p-5 shadow-sm border border-slate-100/50">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <MapPin className="h-4 w-4 text-blue-600" />
          </span>
          <h4 className="text-base font-semibold text-blue-900">
            {language === 'bn' ? 'মামলার তথ্য' : 'Case Information'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Thana Selection */}
          <div className="space-y-2">
            <Label htmlFor="thana_id" className="text-base font-medium font-bangla text-gray-700">
              {language === 'bn' ? "থানা" : "Thana"} *
            </Label>
            <Select
              value={formData.thana_id || ''}
              onValueChange={(value) => onFieldChange('thana_id', value)}
            >
              <SelectTrigger className={`h-10 ${errors.thana_id ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}>
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
              <p className="text-sm text-red-600">{errors.thana_id}</p>
            )}
          </div>

          {/* Combined Case Type and Number Field */}
          <div className="space-y-2">
            <Label htmlFor="case_type" className="text-base font-medium font-bangla text-gray-700">
              {t('investigation.header.gd_cid_case_no')} *
            </Label>
            <div className="flex h-10">
              {/* Case Type Selection - 1/4 width */}
              <div className="w-2/6">
                <Select
                  value={formData.case_type || 'none'}
                  onValueChange={(value) => onFieldChange('case_type', value)}
                >
                  <SelectTrigger className={`w-full h-full rounded-l-lg rounded-r-none border-r-0 flex items-center ${errors.case_type ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}>
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
              
              {/* Case Number Input - 3/4 width */}
              <div className="w-4/6">
                <Input
                  id="gd_cid_case_no"
                  value={formData.gd_cid_case_no || ''}
                  onChange={(e) => onFieldChange('gd_cid_case_no', e.target.value)}
                  placeholder={formData.case_type && formData.case_type !== 'none' ? 
                    (language === 'bn' ? `${formData.case_type} নং` : `${formData.case_type} No.`) : 
                    (language === 'bn' ? "প্রথমে মামলার ধরন নির্বাচন করুন" : "Select case type first")}
                  className={`${errors.gd_cid_case_no ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'focus:border-blue-500 focus:ring-blue-200'} ${(!formData.case_type || formData.case_type === 'none') ? 'bg-white text-gray-500 cursor-not-allowed' : 'bg-white'} rounded-l-none rounded-r-lg border-l-0 h-full transition-all duration-200`}
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
            <Label htmlFor="ref_date" className="text-base font-medium font-bangla text-gray-700">
              {t('investigation.header.ref_date')} *
            </Label>
            <Input
              id="ref_date"
              type="date"
              value={formData.ref_date || ''}
              onChange={(e) => onFieldChange('ref_date', e.target.value)}
              className={`h-10 ${errors.ref_date ? 'border-red-500' : ''} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
            />
            {errors.ref_date && (
              <p className="text-sm text-red-600">{errors.ref_date}</p>
            )}
          </div>
        </div>
      </div>

      {/* Dates and Numbers Group - Green */}
      <div className="rounded-xl bg-gradient-to-r from-slate-50 via-emerald-50/30 to-teal-50/20 p-5 shadow-sm border border-slate-100/50">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
            <Calendar className="h-4 w-4 text-green-600" />
          </span>
          <h4 className="text-base font-semibold text-green-900">
            {language === 'bn' ? 'তারিখ ও নম্বরসমূহ' : 'Dates & Numbers'}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* PM Number */}
          <div className="space-y-2">
            <Label htmlFor="pm_no" className="text-base font-medium font-bangla text-gray-700">
              {t('investigation.header.pm_no')} *
            </Label>
            <Input
              id="pm_no"
              value={formData.pm_no || ''}
              onChange={(e) => onFieldChange('pm_no', e.target.value)}
              placeholder={language === 'bn' ? "পিএম নং" : "PM Number"}
              className={`h-10 ${errors.pm_no ? 'border-red-500' : ''} focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200`}
            />
            {errors.pm_no && (
              <p className="text-sm text-red-600">{errors.pm_no}</p>
            )}
          </div>

          {/* Report Date */}
          <div className="space-y-2">
            <Label htmlFor="report_date" className="text-base font-medium font-bangla text-gray-700">
              {t('investigation.header.report_date')} *
            </Label>
            <Input
              id="report_date"
              type="date"
              value={formData.report_date || ''}
              onChange={(e) => onFieldChange('report_date', e.target.value)}
              className={`h-10 ${errors.report_date ? 'border-red-500' : ''} focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200`}
            />
            {errors.report_date && (
              <p className="text-sm text-red-600">{errors.report_date}</p>
            )}
          </div>

          {/* Station - Fixed Value */}
          <div className="space-y-2">
            <Label htmlFor="station" className="text-base font-medium font-bangla text-gray-700">
              {t('investigation.header.station')} *
            </Label>
            <Input
              id="station"
              value="DMC MORGUE" 
              readOnly
              className="h-10 border-green-300 bg-white text-green-800 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
