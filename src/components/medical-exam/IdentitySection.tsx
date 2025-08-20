"use client";
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

export default function IdentitySection({ formData, onFieldChange }: any) {
  const { language } = useLanguage();
  const L = (bn: string, en: string) => (language === 'bn' ? bn : en);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-1">
        <Label htmlFor="victim_name">{L('ভিকটিমের নাম','Victim name')}</Label>
        <Input id="victim_name" value={formData.victim_name||''} onChange={(e)=>onFieldChange('victim_name', e.target.value)} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="age_years">{L('বয়স (ভাষ্য মতে)','Age (as stated)')}</Label>
        <Input id="age_years" type="number" value={formData.age_years||''} onChange={(e)=>onFieldChange('age_years', e.target.value)} />
      </div>
      <div className="space-y-1">
        <Label>{L('লিঙ্গ','Gender')}</Label>
        <div className="flex gap-4 h-10 items-center">
          {['male','female','other'].map(v => (
            <label key={v} className="inline-flex items-center gap-2"><input type="radio" name="gender" checked={formData.gender===v} onChange={()=>onFieldChange('gender', v)} />{language==='bn'? (v==='male'?'পুরুষ':v==='female'?'মহিলা':'অন্যান্য') : v}</label>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="religion">{L('ধর্ম','Religion')}</Label>
        <Input id="religion" value={formData.religion||''} onChange={(e)=>onFieldChange('religion', e.target.value)} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="occupation">{L('পেশা','Occupation')}</Label>
        <Input id="occupation" value={formData.occupation||''} onChange={(e)=>onFieldChange('occupation', e.target.value)} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="guardian_name">{L('পিতা/মাতা/স্বামী','Father/Mother/Spouse')}</Label>
        <Input id="guardian_name" value={formData.guardian_name||''} onChange={(e)=>onFieldChange('guardian_name', e.target.value)} />
      </div>
      <div className="space-y-1 md:col-span-3">
        <Label htmlFor="address">{L('ঠিকানা','Address')}</Label>
        <Textarea id="address" value={formData.address||''} onChange={(e)=>onFieldChange('address', e.target.value)} />
      </div>
    </div>
  )
}


