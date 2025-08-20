"use client";
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TreatmentSection({ formData, onFieldChange }: any) {
  const { language } = useLanguage();
  const L = (bn: string, en: string) => (language === 'bn' ? bn : en);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1 md:col-span-2"><Label htmlFor="treatment_advice">{L('প্রদত্ত চিকিৎসা/পরামর্শ','Treatment/Advice')}</Label><Textarea id="treatment_advice" value={formData.treatment_advice||''} onChange={(e)=>onFieldChange('treatment_advice', e.target.value)} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1"><Label htmlFor="discharge_date">{L('অবমুক্তির তারিখ','Discharge date')}</Label><Input id="discharge_date" type="date" value={formData.discharge_date||''} onChange={(e)=>onFieldChange('discharge_date', e.target.value)} /></div>
        <div className="space-y-1"><Label htmlFor="discharge_time">{L('অবমুক্তির সময়','Discharge time')}</Label><Input id="discharge_time" type="time" value={formData.discharge_time||''} onChange={(e)=>onFieldChange('discharge_time', e.target.value)} /></div>
      </div>
      <div className="space-y-1"><Label htmlFor="referral_advice">{L('রেফারেলের পরামর্শ','Referral advice')}</Label><Textarea id="referral_advice" value={formData.referral_advice||''} onChange={(e)=>onFieldChange('referral_advice', e.target.value)} /></div>
      <div className="space-y-1"><Label htmlFor="opinion">{L('মতামত','Opinion')}</Label><Textarea id="opinion" value={formData.opinion||''} onChange={(e)=>onFieldChange('opinion', e.target.value)} /></div>
    </div>
  )
}


