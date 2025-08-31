"use client";
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Building2, User, FileText, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDropdownValues } from '@/hooks/useDropdownValues';
import { Button } from '@/components/ui/button';
import { useHeaderFacility } from '@/hooks/useHeaderFacility';
import Link from 'next/link';
import { useMemo, useEffect, useState } from 'react';

export default function HeaderFacilitySection() {
  const { language } = useLanguage();
  const { thanaOptions, caseTypeOptions, getLabel } = useDropdownValues();
  const { data: formData, updateFieldValue } = useHeaderFacility();
  const L = (bn: string, en: string) => (language === 'bn' ? bn : en);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  
  // Check if case number should be disabled
  const isCaseNumberDisabled = !formData.case_type || formData.case_type === 'none';
  
  // Handle field change
  const onFieldChange = (field: string, value: any) => {
    updateFieldValue(field as any, value);
  };
  
  // Handle date change from DatePicker
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const isoString = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
      onFieldChange('date', isoString);
    } else {
      onFieldChange('date', '');
    }
  };
  
  const canPrint = useMemo(() => {
    // Minimal required fields for preview/print of header: victim name, age, gender, address, and at least memo/date
    const required = [
      formData?.victim_name,
      formData?.victim_gender,
      formData?.victim_age,
      formData?.victim_address,
      formData?.date,
    ];
    return required.every((v) => typeof v === 'string' ? v.trim().length > 0 : Boolean(v));
  }, [formData]);
  
  if (!isClient) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Report Information Section */}
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <MapPin className="h-4 w-4 text-blue-600" />
          </span>
          <h4 className="text-base font-semibold text-blue-900">{L('রিপোর্ট ও প্রতিষ্ঠান তথ্য','Report & Institution Information')}</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Report No - 2/6 width */}
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
          
          {/* Date - 1/6 width */}
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="date" className="text-sm font-semibold text-gray-700">
              {L('তারিখ','Date')}
            </Label>
            <DatePicker
              id="date"
              value={formData.date ? new Date(formData.date) : undefined}
              onChange={handleDateChange}
              placeholder={L('তারিখ নির্বাচন করুন', 'Select date')} 
              className="w-full rounded-lg bg-white [&_input]:text-left [&_input]:pl-3"
            />
          </div>
          
          {/* Institution - 3/6 width */}
          <div className="space-y-2 md:col-span-3">
            <Label htmlFor="institution" className="text-sm font-semibold text-gray-700">
              {L('প্রতিষ্ঠান','Institution')}
            </Label>
            <div className="flex items-center h-11 px-3 bg-gray-100 border border-gray-200 rounded-md text-gray-600 text-base">
              {L('ফরেনসিক মেডিসিন বিভাগ, ঢাকা মেডিকেল কলেজ, ঢাকা', 'Department of Forensic Medicine, Dhaka Medical College, Dhaka')}
            </div>
          </div>
        </div>
      </div>

      {/* Case Information Section */}
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100">
            <MapPin className="h-4 w-4 text-orange-600" />
          </span>
          <h4 className="text-base font-semibold text-orange-900">{L('মামলার তথ্য','Case Information')}</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Thana - 1/4 width */}
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="source_thana" className="text-sm font-semibold text-gray-700">
              {L('থানা','Thana')}
            </Label>
            <Select
              value={formData.source_thana || ''}
              onValueChange={(value) => onFieldChange('source_thana', value)}
            >
              <SelectTrigger className="h-11 text-base rounded-lg bg-white border-gray-300 hover:border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200">
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
          
          {/* Case Type and Number (Combined) - 2/4 width */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="case_type" className="text-sm font-semibold text-gray-700">
              {L('কেস টাইপ ও নং','Case Type & No')}
            </Label>
            <div className="flex h-11 rounded-lg border border-gray-300 bg-white shadow-sm focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-200 transition-all duration-200 overflow-hidden">
              {/* Case Type (Selectable) */}
              <div className="w-1/3 border-r border-gray-300">
                <Select
                  value={formData.case_type || 'case'}
                  onValueChange={(value) => onFieldChange('case_type', value)}
                >
                  <SelectTrigger className="h-full border-0 rounded-none bg-gray-100 hover:bg-gray-200 focus:ring-0 text-sm text-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="case">{L('মামলা', 'Case')}</SelectItem>
                    <SelectItem value="gd">{L('জিডি', 'GD')}</SelectItem>
                    <SelectItem value="fir">{L('এফআইআর', 'FIR')}</SelectItem>
                    <SelectItem value="other">{L('অন্যান্য', 'Other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Case Number Input */}
              <div className="w-2/3">
                <Input
                  id="case_no"
                  value={formData.case_no || ''}
                  onChange={(e) => onFieldChange('case_no', e.target.value)}
                  placeholder={L('নং', 'No')}
                  className="h-full border-0 rounded-none bg-white placeholder:text-gray-400 focus:ring-0 text-base px-2"
                />
              </div>
            </div>
          </div>
          
          {/* Case Issue Date - 1/4 width */}
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="case_issue_date" className="text-sm font-semibold text-gray-700">
              {L('মামলা দায়েরের তারিখ','Case Filing Date')}
            </Label>
            <DatePicker
              id="case_issue_date"
              value={formData.case_issue_date ? new Date(formData.case_issue_date) : undefined}
              onChange={(date) => {
                if (date) {
                  const isoString = date.toISOString().split('T')[0];
                  onFieldChange('case_issue_date', isoString);
                } else {
                  onFieldChange('case_issue_date', '');
                }
              }}
              placeholder={L('তারিখ নির্বাচন করুন', 'Select date')}
              className="w-full rounded-lg bg-white"
            />
          </div>
        </div>
      </div>

      {/* Identity Section - Victim Information */}
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
            <User className="h-4 w-4 text-purple-600" />
          </span>
          <h4 className="text-base font-semibold text-purple-900">{L('ভিকটিমের পরিচয়','Victim Identity')}</h4>
        </div>
        {/* First Row: Name (3/6), Age (1/6), Sex (1/6), Religion (1/6) */}
        <div className="grid grid-cols-6 gap-4 mb-4">
          {/* Name - 3/6 width */}
          <div className="col-span-3 space-y-2">
            <Label htmlFor="victim_name" className="text-sm font-semibold text-gray-700">
              {L('নাম','Name:')}
            </Label>
            <Input
              id="victim_name"
              value={formData.victim_name || ''}
              onChange={(e) => onFieldChange('victim_name', e.target.value)}
              className="h-11 text-base rounded-lg bg-white border-gray-300 placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              placeholder={L('ভিকটিমের নাম লিখুন', 'Enter victim name')}
            />
          </div>

          {/* Age - 1/6 width */}
          <div className="col-span-1 space-y-2">
            <Label htmlFor="victim_age" className="text-sm font-semibold text-gray-700">
              {L('বয়স (ভাষ্য মতে)','Age (as per statement):')}
            </Label>
            <Input
              id="victim_age"
              type="number"
              value={formData.victim_age || ''}
              onChange={(e) => onFieldChange('victim_age', e.target.value)}
              className="h-11 text-base rounded-lg bg-white border-gray-300 placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              placeholder={L('বয়স লিখুন', 'Enter age')}
            />
          </div>

          {/* Gender - 1/6 width */}
          <div className="col-span-1 space-y-2">
            <Label htmlFor="victim_gender" className="text-sm font-semibold text-gray-700">
              {L('লিঙ্গ','Gender:')}
            </Label>
            <Select
              value={formData.victim_gender || ''}
              onValueChange={(value) => onFieldChange('victim_gender', value)}
            >
              <SelectTrigger className="h-11 text-base rounded-lg bg-white border-gray-300 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200">
                <SelectValue placeholder={L('লিঙ্গ নির্বাচন করুন', 'Select gender')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">{L('পুরুষ', 'Male')}</SelectItem>
                <SelectItem value="female">{L('মহিলা', 'Female')}</SelectItem>
                <SelectItem value="other">{L('অন্যান্য', 'Other')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Religion - 1/6 width */}
          <div className="col-span-1 space-y-2">
            <Label htmlFor="victim_religion" className="text-sm font-semibold text-gray-700">
              {L('ধর্ম','Religion:')}
            </Label>
            <Select
              value={formData.victim_religion || ''}
              onValueChange={(value) => onFieldChange('victim_religion', value)}
            >
              <SelectTrigger className="h-11 text-base rounded-lg bg-white border-gray-300 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200">
                <SelectValue placeholder={L('ধর্ম নির্বাচন করুন', 'Select religion')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="islam">{L('ইসলাম', 'Islam')}</SelectItem>
                <SelectItem value="hinduism">{L('হিন্দুধর্ম', 'Hinduism')}</SelectItem>
                <SelectItem value="christianity">{L('খ্রিস্টধর্ম', 'Christianity')}</SelectItem>
                <SelectItem value="buddhism">{L('বৌদ্ধধর্ম', 'Buddhism')}</SelectItem>
                <SelectItem value="other">{L('অন্যান্য', 'Other')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Second Row: Occupation (1/5), Guardian Type + Name (2/5), Address (2/5) */}
        <div className="grid grid-cols-5 gap-4 mb-4">
          {/* Occupation - 1/5 width */}
          <div className="col-span-1 space-y-2">
            <Label htmlFor="victim_occupation" className="text-sm font-semibold text-gray-700">
              {L('পেশা','Occupation:')}
            </Label>
            <Input
              id="victim_occupation"
              value={formData.victim_occupation || ''}
              onChange={(e) => onFieldChange('victim_occupation', e.target.value)}
              className="h-11 text-base rounded-lg bg-white border-gray-300 placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              placeholder={L('পেশা লিখুন', 'Enter occupation')}
            />
          </div>

          {/* Guardian Type + Name - 2/5 width */}
          <div className="col-span-2 space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              {L('পিতা/মাতা/স্বামী','Father/Mother/Husband + Name')}
            </Label>
            <div className="flex h-11 rounded-lg border border-gray-300 bg-white shadow-sm focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200 transition-all duration-200 overflow-hidden">
              {/* Selectable Type - 1/3 width like Case Type */}
              <div className="w-1/5 border-r border-gray-300 bg-gray-100">
                <select 
                  value={formData.guardian_type || ''} 
                  onChange={(e) => onFieldChange('guardian_type', e.target.value)}
                  className="h-full w-full text-sm md:text-base bg-gray-100 text-gray-700 border-0 focus:ring-0 focus:outline-none px-2 cursor-pointer"
                >
                  <option value="">{L('নির্বাচন করুন', 'Select')}</option>
                  <option value="father">{L('পিতা', 'Father')}</option>
                  <option value="mother">{L('মাতা', 'Mother')}</option>
                  <option value="husband">{L('স্বামী', 'Husband')}</option>
                </select>
              </div>
              {/* Name Input - 2/3 width like Case No */}
              <div className="w-4/5">
                <Input 
                  id="guardian_name" 
                  value={formData.guardian_name || ''} 
                  onChange={(e) => onFieldChange('guardian_name', e.target.value)}
                  disabled={!formData.guardian_type}
                  placeholder={formData.guardian_type ? L('নাম লিখুন', 'Enter name') : L('প্রথমে ধরন নির্বাচন করুন', 'Select type first')}
                  className="h-full border-0 rounded-none bg-white placeholder:text-gray-400 focus:ring-0 text-base px-2"
                />
              </div>
            </div>
          </div>

          {/* Address - 2/5 width */}
          <div className="col-span-2 space-y-2">
            <Label htmlFor="victim_address" className="text-sm font-semibold text-gray-700">
              {L('ঠিকানা','Address:')}
            </Label>
            <Input
              id="victim_address"
              value={formData.victim_address || ''}
              onChange={(e) => onFieldChange('victim_address', e.target.value)}
              className="h-11 text-base rounded-lg bg-white border-gray-300 placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              placeholder={L('ঠিকানা লিখুন', 'Enter address')}
            />
          </div>
        </div>
      </div>

      {/* Identifier/Bringer Section */}
      <div className="rounded-xl bg-white p-5 shadow-sm mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
            <FileText className="h-4 w-4 text-amber-600" />
          </span>
          <h4 className="text-base font-semibold text-amber-900">
            {L('সনাক্তকারী/আনয়নকারীর পরিচয়', 'Identifier/Bringer Identity')}
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-1">
            <Label htmlFor="identifier_name" className="text-sm font-semibold text-gray-700">
              {L('নাম', 'Name')}
            </Label>
            <Input
              id="identifier_name"
              value={formData.identifier_name || ''}
              onChange={(e) => onFieldChange('identifier_name', e.target.value)}
              placeholder={L('নাম লিখুন', 'Enter name')}
              className="h-11 text-base rounded-lg bg-white border-gray-300 placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <Label htmlFor="identifier_address" className="text-sm font-semibold text-gray-700">
              {L('ঠিকানা', 'Address')}
            </Label>
            <Input
              id="identifier_address"
              value={formData.identifier_address || ''}
              onChange={(e) => onFieldChange('identifier_address', e.target.value)}
              placeholder={L('ঠিকানা লিখুন', 'Enter address')}
              className="h-11 text-base rounded-lg bg-white border-gray-300 placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Consent Section */}
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
            <CheckCircle className="h-4 w-4 text-green-600" />
          </span>
          <h4 className="text-base font-semibold text-green-900">{L('সম্মতি','Consent')}</h4>
        </div>
        
        <div className="space-y-4">
          {/* Consent Statement */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700 leading-relaxed">
              {L(
                'ডাক্তারী পরীক্ষার ফলাফল আমার পক্ষে বা বিপক্ষে যাইতে পারে জানিয়া আমি আমার গোপনাঙ্গ সহ সর্বাঙ্গ ডাক্তারী পরীক্ষা করাইতে রাজী আছি।',
                'Knowing that the results of the medical examination may be in my favor or against me, I agree to undergo a full medical examination, including my private parts.'
              )}
            </p>
          </div>

          {/* Witness Entry */}
          <div className="space-y-2">
            <Label htmlFor="witness_input" className="text-sm font-semibold text-gray-700">
              {L('সাক্ষীর নাম', 'Witness Name')}
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <Input
                  id="witness_input"
                  value={formData._witness_input || ''}
                  onChange={(e) => onFieldChange('_witness_input', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const name = (formData._witness_input || '').trim();
                      const list = Array.isArray(formData.witnesses) ? formData.witnesses : [];
                      if (name) {
                        onFieldChange('witnesses', [...list, name]);
                        onFieldChange('_witness_input', '');
                      }
                    }
                  }}
                  placeholder={L('সাক্ষীর নাম লিখুন', 'Enter witness name')}
                  className="h-11 text-base rounded-lg bg-white border-gray-300 placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                />
              </div>
              <div className="md:col-span-1 flex items-center">
                <Button
                  type="button"
                  onClick={() => {
                    const name = (formData._witness_input || '').trim();
                    const list = Array.isArray(formData.witnesses) ? formData.witnesses : [];
                    if (name) {
                      onFieldChange('witnesses', [...list, name]);
                      onFieldChange('_witness_input', '');
                    }
                  }}
                  className="h-11 w-full md:w-auto px-4 bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 text-white shadow-sm transition-all duration-200"
                >
                  <span className="inline-flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {L('আরো যোগ করুন', 'Add Witness')}
                  </span>
                </Button>
              </div>
            </div>
          </div>

          {/* Witness List */}
          {Array.isArray(formData.witnesses) && formData.witnesses.length > 0 && (
            <div className="pt-2">
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                {L('সাক্ষীদের তালিকা', 'Witnesses')}
              </Label>
              <ol className="space-y-2 text-sm text-gray-800">
                {formData.witnesses.map((w: string, idx: number) => (
                  <li key={`${w}-${idx}`} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                    <span className="flex items-center gap-2">
                      <span className="text-gray-500">{idx + 1}.</span>
                      <span>{w}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const list = Array.isArray(formData.witnesses) ? [...formData.witnesses] : [];
                        list.splice(idx, 1);
                        onFieldChange('witnesses', list);
                      }}
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                      aria-label={L('মুছে ফেলুন', 'Remove')}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="hidden md:inline">{L('মুছুন', 'Remove')}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          )}

    
        </div>
      </div>

      {/* Print action */}
      {canPrint && (
        <div className="flex justify-end">
          <Link href="/dashboard/admin/medical-exam/print/header-facility">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">{L('প্রিভিউ ও প্রিন্ট','Preview & Print')}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}


