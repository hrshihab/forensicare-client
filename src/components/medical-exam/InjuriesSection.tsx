"use client";
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

export default function InjuriesSection({ formData, onFieldChange }: any) {
  const { language } = useLanguage();
  const L = (bn: string, en: string) => (language === 'bn' ? bn : en);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1"><Label htmlFor="coercion_desc_a">{L('বর্ণনা (ক)','Description (a)')}</Label><Textarea id="coercion_desc_a" value={formData.coercion_desc_a||''} onChange={(e)=>onFieldChange('coercion_desc_a', e.target.value)} /></div>
        <div className="space-y-1"><Label htmlFor="coercion_desc_b">{L('বর্ণনা (খ)','Description (b)')}</Label><Textarea id="coercion_desc_b" value={formData.coercion_desc_b||''} onChange={(e)=>onFieldChange('coercion_desc_b', e.target.value)} /></div>
        <div className="space-y-1"><Label htmlFor="coercion_desc_c">{L('বর্ণনা (গ)','Description (c)')}</Label><Textarea id="coercion_desc_c" value={formData.coercion_desc_c||''} onChange={(e)=>onFieldChange('coercion_desc_c', e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-1"><Label htmlFor="acid_or_burn">{L('এসিড/অগ্নিদগ্ধ','Acid/Burn')}</Label><Input id="acid_or_burn" value={formData.acid_or_burn||''} onChange={(e)=>onFieldChange('acid_or_burn', e.target.value)} /></div>
        <div className="space-y-1"><Label htmlFor="injury_age">{L('জখমের বয়স','Injury age')}</Label><Input id="injury_age" value={formData.injury_age||''} onChange={(e)=>onFieldChange('injury_age', e.target.value)} /></div>
        <div className="space-y-1"><Label htmlFor="weapon_type">{L('অস্ত্রের ধরণ','Weapon type')}</Label><Input id="weapon_type" value={formData.weapon_type||''} onChange={(e)=>onFieldChange('weapon_type', e.target.value)} /></div>
        <div className="space-y-1">
          <Label>{L('জখমের প্রকৃতি','Nature of injury')}</Label>
          <div className="flex gap-4 h-10 items-center">
            {[
              { v: 'simple', bn: 'সাধারণ জখম', en: 'Simple' },
              { v: 'grievous', bn: 'মারাত্মক জখম', en: 'Grievous' },
            ].map((opt) => (
              <label key={opt.v} className="inline-flex items-center gap-2"><input type="radio" name="injury_nature" checked={formData.injury_nature===opt.v} onChange={()=>onFieldChange('injury_nature', opt.v)} />{language==='bn'?opt.bn:opt.en}</label>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-1"><Label htmlFor="mental_state">{L('ভিকটিমের মানসিক অবস্থা','Victim mental state')}</Label><Textarea id="mental_state" value={formData.mental_state||''} onChange={(e)=>onFieldChange('mental_state', e.target.value)} /></div>
    </div>
  )
}


