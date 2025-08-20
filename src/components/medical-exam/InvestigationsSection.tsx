"use client";
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

export default function InvestigationsSection({ formData, onFieldChange }: any) {
  const { language } = useLanguage();
  const L = (bn: string, en: string) => (language === 'bn' ? bn : en);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1"><Label htmlFor="inv_xray">{L('এক্সরে পরীক্ষা','X-ray')}</Label><Textarea id="inv_xray" value={formData.inv_xray||''} onChange={(e)=>onFieldChange('inv_xray', e.target.value)} /></div>
      <div className="space-y-1"><Label htmlFor="inv_ultrasound">{L('আল্ট্রাসোনোগ্রাফি','Ultrasonography')}</Label><Textarea id="inv_ultrasound" value={formData.inv_ultrasound||''} onChange={(e)=>onFieldChange('inv_ultrasound', e.target.value)} /></div>
      <div className="space-y-1 md:col-span-2"><Label htmlFor="inv_hvs_swab">{L('ভেজাইনাল সোয়াব (HVS)/অন্যান্য','Vaginal/Other swabs')}</Label><Textarea id="inv_hvs_swab" value={formData.inv_hvs_swab||''} onChange={(e)=>onFieldChange('inv_hvs_swab', e.target.value)} /></div>
      <div className="space-y-1"><Label htmlFor="inv_dna">{L('ডি.এন.এ পরীক্ষা','DNA test')}</Label><Textarea id="inv_dna" value={formData.inv_dna||''} onChange={(e)=>onFieldChange('inv_dna', e.target.value)} /></div>
      <div className="space-y-1"><Label htmlFor="inv_other">{L('অন্যান্য পরীক্ষা','Other tests')}</Label><Textarea id="inv_other" value={formData.inv_other||''} onChange={(e)=>onFieldChange('inv_other', e.target.value)} /></div>
    </div>
  )
}


