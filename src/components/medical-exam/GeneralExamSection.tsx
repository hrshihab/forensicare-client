"use client";
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GeneralExamSection({ formData, onFieldChange }: any) {
  const { language } = useLanguage();
  const L = (bn: string, en: string) => (language === 'bn' ? bn : en);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1"><Label htmlFor="build">{L('দৈহিক গঠন','Build')}</Label><Input id="build" value={formData.build||''} onChange={(e)=>onFieldChange('build', e.target.value)} /></div>
        <div className="space-y-1"><Label htmlFor="height_cm">{L('উচ্চতা (cm)','Height (cm)')}</Label><Input id="height_cm" type="number" value={formData.height_cm||''} onChange={(e)=>onFieldChange('height_cm', e.target.value)} /></div>
        <div className="space-y-1"><Label htmlFor="weight_kg">{L('ওজন (kg)','Weight (kg)')}</Label><Input id="weight_kg" type="number" value={formData.weight_kg||''} onChange={(e)=>onFieldChange('weight_kg', e.target.value)} /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1"><Label htmlFor="dental_arrangement">{L('দন্ত বিন্যাস','Dental arrangement')}</Label><Textarea id="dental_arrangement" value={formData.dental_arrangement||''} onChange={(e)=>onFieldChange('dental_arrangement', e.target.value)} /></div>
        <div className="space-y-1"><Label htmlFor="identifying_marks">{L('সনাক্তকরণ চিহ্ন','Identifying marks')}</Label><Textarea id="identifying_marks" value={formData.identifying_marks||''} onChange={(e)=>onFieldChange('identifying_marks', e.target.value)} /></div>
      </div>
    </div>
  );
}


