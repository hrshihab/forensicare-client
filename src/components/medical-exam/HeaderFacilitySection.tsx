"use client";
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeaderFacilitySection({ formData, onFieldChange }: any) {
  const { language } = useLanguage();
  const L = (bn: string, en: string) => (language === 'bn' ? bn : en);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-1">
        <Label htmlFor="memo_no">{L('স্বারক নং','Memo No')}</Label>
        <Input id="memo_no" value={formData.memo_no||''} onChange={(e)=>onFieldChange('memo_no', e.target.value)} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="date">{L('তারিখ','Date')}</Label>
        <Input id="date" type="date" value={formData.date||''} onChange={(e)=>onFieldChange('date', e.target.value)} />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <Label htmlFor="source_thana">{L('থানা','Thana')}</Label>
          <Input id="source_thana" value={formData.source_thana||''} onChange={(e)=>onFieldChange('source_thana', e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="case_type">{L('কেস টাইপ','Case Type')}</Label>
          <select id="case_type" className="border rounded-md h-10 px-2" value={formData.case_type||'GD'} onChange={(e)=>onFieldChange('case_type', e.target.value)}>
            <option value="GD">GD</option>
            <option value="Case">Case</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="case_no">{L('নং','No')}</Label>
          <Input id="case_no" value={formData.case_no||''} onChange={(e)=>onFieldChange('case_no', e.target.value)} />
        </div>
      </div>
      <div className="space-y-1 md:col-span-2">
        <Label htmlFor="institution_name">{L('প্রতিষ্ঠানের নাম','Institution')}</Label>
        <Input id="institution_name" value={formData.institution_name||''} onChange={(e)=>onFieldChange('institution_name', e.target.value)} />
      </div>
      <div className="space-y-1 md:col-span-1">
        <Label htmlFor="institution_address">{L('ঠিকানা','Address')}</Label>
        <Input id="institution_address" value={formData.institution_address||''} onChange={(e)=>onFieldChange('institution_address', e.target.value)} />
      </div>
    </div>
  )
}


