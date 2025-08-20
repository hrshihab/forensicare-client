"use client";
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NarrativeSection({ formData, onFieldChange }: any) {
  const { language } = useLanguage();
  const L = (bn: string, en: string) => (language === 'bn' ? bn : en);
  return (
    <div className="space-y-1">
      <Label htmlFor="incident_narrative">{L('ঘটনার সংক্ষিপ্ত বিবরণ','Incident narrative')}</Label>
      <Textarea id="incident_narrative" value={formData.incident_narrative||''} onChange={(e)=>onFieldChange('incident_narrative', e.target.value)} rows={5} />
    </div>
  )
}


