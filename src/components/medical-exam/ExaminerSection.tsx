"use client";
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ExaminerSection({ formData, onFieldChange }: any) {
  const { language } = useLanguage();
  const L = (bn: string, en: string) => (language === 'bn' ? bn : en);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-1"><Label htmlFor="examiner_name">{L('চিকিৎসকের নাম','Doctor name')}</Label><Input id="examiner_name" value={formData.examiner_name||''} onChange={(e)=>onFieldChange('examiner_name', e.target.value)} /></div>
      <div className="space-y-1"><Label htmlFor="examiner_reg_no">{L('রেজিঃ নং','Registration no.')}</Label><Input id="examiner_reg_no" value={formData.examiner_reg_no||''} onChange={(e)=>onFieldChange('examiner_reg_no', e.target.value)} /></div>
      <div className="space-y-1"><Label htmlFor="examiner_code_no">{L('কোড নং','Code no.')}</Label><Input id="examiner_code_no" value={formData.examiner_code_no||''} onChange={(e)=>onFieldChange('examiner_code_no', e.target.value)} /></div>
    </div>
  )
}


