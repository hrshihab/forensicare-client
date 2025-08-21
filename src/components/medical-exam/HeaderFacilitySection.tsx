"use client";
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Building2 } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDropdownValues } from '@/hooks/useDropdownValues';

export default function HeaderFacilitySection({ formData, onFieldChange }: any) {
  const { language } = useLanguage();
  const { thanaOptions, caseTypeOptions, getLabel } = useDropdownValues();
  const L = (bn: string, en: string) => (language === 'bn' ? bn : en);
  
  // Check if case number should be disabled
  const isCaseNumberDisabled = !formData.case_type || formData.case_type === 'none';
  
  // Handle date change from DatePicker
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const isoString = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
      onFieldChange('date', isoString);
    } else {
      onFieldChange('date', '');
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Case Information Group */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <MapPin className="h-4 w-4 text-blue-600" />
          </span>
          <h4 className="text-base font-semibold text-blue-900">{L('মামলার তথ্য','Case Information')}</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Report No (span 2) */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="memo_no" className="text-sm font-semibold text-gray-700">
            {L('স্বারক নং-ফমে/ঢামেক/এম.এল/','Report No - FM/DMC/M.L')}
          </Label>
          <Input 
            id="memo_no" 
            value={formData.memo_no || ''} 
            onChange={(e) => onFieldChange('memo_no', e.target.value)}
            className="h-11 text-base rounded-lg bg-white border-gray-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            placeholder={L('স্বারক নং লিখুন', 'Enter memo number')}
          />
        </div>
        
        {/* Date - Modern Calendar (span 1) */}
        <div className="space-y-2 md:col-span-1">
          <Label htmlFor="date" className="text-sm font-semibold text-gray-700">
            {L('তারিখ','Date')}
          </Label>
          <DatePicker
            id="date"
            value={formData.date ? new Date(formData.date) : undefined}
            onChange={handleDateChange}
            placeholder={L('তারিখ নির্বাচন করুন', 'Select date')}
            className="w-full md:max-w-[200px] rounded-lg bg-white"
          />
        </div>
        
        {/* Thana (span 1) */}
        <div className="space-y-2 md:col-span-1">
          <Label htmlFor="source_thana" className="text-sm font-semibold text-gray-700">
            {L('থানা','Thana')}
          </Label>
          <Select
            value={formData.source_thana || ''}
            onValueChange={(value) => onFieldChange('source_thana', value)}
          >
            <SelectTrigger className="h-11 text-base rounded-lg bg-white border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200">
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
        </div>
        
        {/* Case Type and Number (span 2) */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="case_type" className="text-sm font-semibold text-gray-700">
            {L('কেস টাইপ ও নং','Case Type & No')}
          </Label>
          <div className="flex h-11 rounded-lg border border-gray-300 bg-white shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200 overflow-hidden">
            {/* Case Type Selection */}
            <div className="w-1/3 border-r border-gray-300">
              <Select
                value={formData.case_type || 'none'}
                onValueChange={(value) => {
                  onFieldChange('case_type', value);
                  // Clear case number if 'none' is selected
                  if (value === 'none') {
                    onFieldChange('case_no', '');
                  }
                }}
              >
                <SelectTrigger className="w-full h-full border-0 bg-white rounded-none focus:ring-0 text-sm px-2">
                  <SelectValue placeholder={language === 'bn' ? "ধরন" : "Type"} />
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
            
            {/* Case Number Input */}
            <div className="w-2/3">
              <Input
                id="case_no"
                value={formData.case_no || ''}
                onChange={(e) => onFieldChange('case_no', e.target.value)}
                disabled={isCaseNumberDisabled}
                placeholder={
                  isCaseNumberDisabled ? 
                    (language === 'bn' ? "নং" : "No") :
                    (language === 'bn' ? "নং" : "No")
                }
                className={`h-full border-0 rounded-none bg-white placeholder:text-gray-400 focus:ring-0 text-base px-2 ${
                  isCaseNumberDisabled 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-white'
                }`}
              />
            </div>
          </div>
        </div>
        </div>
      </div>
      
      {/* Institution Group */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
            <Building2 className="h-4 w-4 text-emerald-600" />
          </span>
          <h4 className="text-base font-semibold text-emerald-900">{L('প্রতিষ্ঠান সম্পর্কিত','Institution')}</h4>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
          <Label htmlFor="institution_name" className="text-sm font-semibold text-gray-700">
            {L('প্রতিষ্ঠানের নাম','Institution Name')}
          </Label>
          <div className="flex items-center h-11 px-3 bg-gray-100 border border-gray-200 rounded-md text-gray-600 text-base">
            {L('ফরেনসিক মেডিসিন বিভাগ', 'Department of Forensic Medicine')}
        </div>
        </div>
          
          <div className="space-y-2">
          <Label htmlFor="institution_address" className="text-sm font-semibold text-gray-700">
            {L('প্রতিষ্ঠানের ঠিকানা','Institution Address')}
          </Label>
          <div className="flex items-center h-11 px-3 bg-gray-100 border border-gray-200 rounded-md text-gray-600 text-base">
            {L('ঢাকা মেডিকেল কলেজ, ঢাকা', 'Dhaka Medical College, Dhaka')}
        </div>
      </div>
      </div>
      </div>
    </div>
  )
}


