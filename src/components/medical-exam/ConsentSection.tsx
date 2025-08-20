"use client";
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ConsentSection({ formData, onFieldChange }: any) {
  const { language } = useLanguage();
  const L = (bn: string, en: string) => (language === 'bn' ? bn : en);
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="identifier_details">{L('সনাক্তকারী/আনয়নকারীর নাম ও ঠিকানা','Identifier/Bringer')}</Label>
        <Textarea id="identifier_details" value={formData.identifier_details||''} onChange={(e)=>onFieldChange('identifier_details', e.target.value)} />
      </div>
      <div className="flex items-center gap-2">
        <input id="consent_given" type="checkbox" checked={!!formData.consent_given} onChange={(e)=>onFieldChange('consent_given', e.target.checked)} />
        <Label htmlFor="consent_given">{L('সম্মতি প্রদান করা হয়েছে','Consent given')}</Label>
      </div>
      <div className="text-sm text-gray-600">{L('স্বাক্ষর প্যাড পরে যোগ করা হবে','Signature pad to be integrated later')}</div>
    </div>
  )
}


