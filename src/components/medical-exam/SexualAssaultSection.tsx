"use client";
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SexualAssaultSection({ formData, onFieldChange }: any) {
  const { language } = useLanguage();
  const L = (bn: string, en: string) => (language === 'bn' ? bn : en);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input id="is_sa" type="checkbox" checked={!!formData.is_sexual_assault_applicable} onChange={(e)=>onFieldChange('is_sexual_assault_applicable', e.target.checked)} />
        <Label htmlFor="is_sa">{L('যৌন নির্যাতন প্রযোজ্য','Sexual assault applicable')}</Label>
      </div>
      {formData.is_sexual_assault_applicable && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1"><Label htmlFor="first_menses">{L('প্রথম মাসিক','First menses')}</Label><Input id="first_menses" value={formData.first_menses||''} onChange={(e)=>onFieldChange('first_menses', e.target.value)} /></div>
            <div className="space-y-1"><Label htmlFor="cycle_duration">{L('ঋতুচক্রের সময়কাল','Cycle duration')}</Label><Input id="cycle_duration" value={formData.cycle_duration||''} onChange={(e)=>onFieldChange('cycle_duration', e.target.value)} /></div>
            <div className="space-y-1"><Label htmlFor="last_menses_date">{L('শেষ মাসিক','Last menstruation')}</Label><Input id="last_menses_date" type="date" value={formData.last_menses_date||''} onChange={(e)=>onFieldChange('last_menses_date', e.target.value)} /></div>
            <div className="space-y-1">
              <Label>{L('বৈবাহিক অবস্থা','Marital status')}</Label>
              <div className="flex gap-4 h-10 items-center">
                {[
                  { v: 'unmarried', bn: 'অবিবাহিতা', en: 'Unmarried' },
                  { v: 'married', bn: 'বিবাহিতা', en: 'Married' },
                  { v: 'widowed', bn: 'বিধবা', en: 'Widowed' },
                ].map((opt) => (
                  <label key={opt.v} className="inline-flex items-center gap-2"><input type="radio" name="marital_status" checked={formData.marital_status===opt.v} onChange={()=>onFieldChange('marital_status', opt.v)} />{language==='bn'?opt.bn:opt.en}</label>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1"><Label htmlFor="child_or_last_child_age">{L('সন্তান/শেষ সন্তানের বয়স','Child/Last child age')}</Label><Input id="child_or_last_child_age" value={formData.child_or_last_child_age||''} onChange={(e)=>onFieldChange('child_or_last_child_age', e.target.value)} /></div>
            <div className="space-y-1"><Label htmlFor="axillary_hair">{L('বগলের কেশ','Axillary hair')}</Label><Textarea id="axillary_hair" value={formData.axillary_hair||''} onChange={(e)=>onFieldChange('axillary_hair', e.target.value)} /></div>
            <div className="space-y-1"><Label htmlFor="pubic_hair">{L('যোনীদেশের কেশ','Pubic hair')}</Label><Textarea id="pubic_hair" value={formData.pubic_hair||''} onChange={(e)=>onFieldChange('pubic_hair', e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label>{L('স্তনের গঠন','Breast formation')}</Label>
              <div className="flex gap-4 h-10 items-center">
                {[
                  { v: 'undeveloped', bn: 'এখনও গঠিত নহে', en: 'Undeveloped' },
                  { v: 'developed', bn: 'গঠিত হয়েছে', en: 'Developed' },
                  { v: 'well', bn: 'সুগঠিত', en: 'Well-developed' },
                ].map((opt) => (
                  <label key={opt.v} className="inline-flex items-center gap-2"><input type="radio" name="breast_formation" checked={formData.breast_formation===opt.v} onChange={()=>onFieldChange('breast_formation', opt.v)} />{language==='bn'?opt.bn:opt.en}</label>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <Label>{L('স্তনের প্রকৃতি','Breast nature')}</Label>
              <div className="flex gap-4 h-10 items-center">
                {[
                  { v: 'soft', bn: 'নরম', en: 'Soft' },
                  { v: 'firm', bn: 'শক্ত', en: 'Firm' },
                  { v: 'elastic', bn: 'স্থিতিস্থাপক', en: 'Elastic' },
                ].map((opt) => (
                  <label key={opt.v} className="inline-flex items-center gap-2"><input type="radio" name="breast_nature" checked={formData.breast_nature===opt.v} onChange={()=>onFieldChange('breast_nature', opt.v)} />{language==='bn'?opt.bn:opt.en}</label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1"><Label htmlFor="nipple">{L('স্তনবৃন্ত','Nipple')}</Label><Textarea id="nipple" value={formData.nipple||''} onChange={(e)=>onFieldChange('nipple', e.target.value)} /></div>
              <div className="space-y-1"><Label htmlFor="areola">{L('স্তনমন্ডল','Areola')}</Label><Textarea id="areola" value={formData.areola||''} onChange={(e)=>onFieldChange('areola', e.target.value)} /></div>
            </div>
          </div>
          <div className="space-y-1"><Label htmlFor="abdomen_text">{L('পেট (Abdomen)','Abdomen')}</Label><Textarea id="abdomen_text" value={formData.abdomen_text||''} onChange={(e)=>onFieldChange('abdomen_text', e.target.value)} /></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1"><Label htmlFor="genital_vulva">{L('বহিঃযৌনাঙ্গ (Valva)','Vulva')}</Label><Textarea id="genital_vulva" value={formData.genital_vulva||''} onChange={(e)=>onFieldChange('genital_vulva', e.target.value)} /></div>
            <div className="space-y-1"><Label htmlFor="genital_hymen">{L('সতীচ্ছেদ (Hymen)','Hymen')}</Label><Textarea id="genital_hymen" value={formData.genital_hymen||''} onChange={(e)=>onFieldChange('genital_hymen', e.target.value)} /></div>
            <div className="space-y-1"><Label htmlFor="genital_vaginal_canal">{L('যোনী পথ','Vaginal canal')}</Label><Textarea id="genital_vaginal_canal" value={formData.genital_vaginal_canal||''} onChange={(e)=>onFieldChange('genital_vaginal_canal', e.target.value)} /></div>
            <div className="space-y-1"><Label htmlFor="genital_fourchette">{L('যোনী বেড় (Fourchette)','Fourchette')}</Label><Textarea id="genital_fourchette" value={formData.genital_fourchette||''} onChange={(e)=>onFieldChange('genital_fourchette', e.target.value)} /></div>
            <div className="space-y-1"><Label htmlFor="genital_cervix">{L('জরায়ু গ্রীবামুখ (Cervix)','Cervix')}</Label><Textarea id="genital_cervix" value={formData.genital_cervix||''} onChange={(e)=>onFieldChange('genital_cervix', e.target.value)} /></div>
            <div className="space-y-1"><Label htmlFor="genital_rectum">{L('পায়ুমুখ (Rectum)','Rectum')}</Label><Textarea id="genital_rectum" value={formData.genital_rectum||''} onChange={(e)=>onFieldChange('genital_rectum', e.target.value)} /></div>
          </div>
        </div>
      )}
    </div>
  )
}


