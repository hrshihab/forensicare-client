"use client";
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LogisticsSection({ formData, onFieldChange }: any) {
  const { language } = useLanguage();
  const L = (bn: string, en: string) => (language === 'bn' ? bn : en);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-1">
        <Label htmlFor="exam_date">{L('তারিখ','Date')}</Label>
        <Input id="exam_date" type="date" value={formData.exam_date||''} onChange={(e)=>onFieldChange('exam_date', e.target.value)} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="exam_time">{L('সময়','Time')}</Label>
        <Input id="exam_time" type="time" value={formData.exam_time||''} onChange={(e)=>onFieldChange('exam_time', e.target.value)} />
      </div>
      <div className="space-y-1">
        <Label htmlFor="female_attendant_info">{L('মহিলা সহকারীর নাম ও ঠিকানা','Female attendant details')}</Label>
        <Input id="female_attendant_info" value={formData.female_attendant_info||''} onChange={(e)=>onFieldChange('female_attendant_info', e.target.value)} />
      </div>
    </div>
  )
}


