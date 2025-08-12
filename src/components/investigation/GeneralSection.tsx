'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';

interface GeneralSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: any;
}

export const GeneralSection: React.FC<GeneralSectionProps> = ({
  formData,
  onFieldChange,
  errors
}) => {
  const { t, language } = useLanguage();
  const [newBroughtBy, setNewBroughtBy] = useState('');

  const handleAddBroughtBy = () => {
    if (newBroughtBy.trim()) {
      const currentList = formData.brought_by_list || [];
      onFieldChange('brought_by_list', [...currentList, newBroughtBy.trim()]);
      setNewBroughtBy('');
    }
  };

  const handleRemoveBroughtBy = (index: number) => {
    const currentList = formData.brought_by_list || [];
    const newList = currentList.filter((_: any, i: number) => i !== index);
    onFieldChange('brought_by_list', newList);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddBroughtBy();
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Information - নাম, লিঙ্গ, বয়স এবং গোত্র */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Person Name - 2/5 width */}
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="person_name" className="text-sm font-medium">
            {t('investigation.general.person_name')} *
          </Label>
          <Input
            id="person_name"
            value={formData.person_name || ''}
            onChange={(e) => onFieldChange('person_name', e.target.value)}
            placeholder={language === 'bn' ? "নাম" : "Person Name"}
            className={`h-10 ${errors.person_name ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          />
          {errors.person_name && (
            <p className="text-sm text-red-600">{errors.person_name}</p>
          )}
        </div>

        {/* Gender - 1/5 width (reduced) */}
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-sm font-medium">
            {t('investigation.general.gender')} *
          </Label>
          <Select
            value={formData.gender || ''}
            onValueChange={(value) => onFieldChange('gender', value)}
          >
            <SelectTrigger className={`w-full h-10 ${errors.gender ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}>
              <SelectValue placeholder={language === 'bn' ? "লিঙ্গ নির্বাচন করুন" : "Select Gender"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">{language === 'bn' ? 'পুরুষ' : 'Male'}</SelectItem>
              <SelectItem value="female">{language === 'bn' ? 'মহিলা' : 'Female'}</SelectItem>
              <SelectItem value="other">{language === 'bn' ? 'অন্যান্য' : 'Other'}</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-sm text-red-600">{errors.gender}</p>
          )}
        </div>

        {/* Age - 1/5 width (reduced) */}
        <div className="space-y-2">
          <Label htmlFor="age_years" className="text-sm font-medium">
            {t('investigation.general.age_years')} *
          </Label>
          <Input
            id="age_years"
            type="number"
            min="0"
            max="120"
            value={formData.age_years || ''}
            onChange={(e) => onFieldChange('age_years', e.target.value)}
            placeholder={language === 'bn' ? "বয়স (বছর)" : "Age in years"}
            className={`h-10 ${errors.age_years ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          />
          {errors.age_years && (
            <p className="text-sm text-red-600">{errors.age_years}</p>
          )}
        </div>

        {/* Caste/Tribe - 1/5 width */}
        <div className="space-y-2">
          <Label htmlFor="caste_tribe" className="text-sm font-medium">
            {t('investigation.general.caste_tribe')}
          </Label>
          <Input
            id="caste_tribe"
            value={formData.caste_tribe || ''}
            onChange={(e) => onFieldChange('caste_tribe', e.target.value)}
            placeholder={language === 'bn' ? "গোত্র" : "Caste/Tribe"}
            className="h-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          />
        </div>
      </div>

      {/* Location Information - কোন স্থান হতে আনা হইয়াছে—গ্রাম ও থানা */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Brought from Village */}
        <div className="space-y-2">
          <Label htmlFor="brought_from_village" className="text-sm font-medium">
            {t('investigation.general.brought_from_village')} *
          </Label>
          <Input
            id="brought_from_village"
            value={formData.brought_from_village || ''}
            onChange={(e) => onFieldChange('brought_from_village', e.target.value)}
            placeholder={language === 'bn' ? "গ্রামের নাম" : "Village name"}
            className={`h-10 ${errors.brought_from_village ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          />
          {errors.brought_from_village && (
            <p className="text-sm text-red-600">{errors.brought_from_village}</p>
          )}
        </div>

        {/* Brought from Thana */}
        <div className="space-y-2">
          <Label htmlFor="brought_from_thana" className="text-sm font-medium">
            {t('investigation.general.brought_from_thana')} *
          </Label>
          <Input
            id="brought_from_thana"
            value={formData.brought_from_thana || ''}
            onChange={(e) => onFieldChange('brought_from_thana', e.target.value)}
            placeholder={language === 'bn' ? "থানার নাম" : "Thana name"}
            className={`h-10 ${errors.brought_from_thana ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          />
          {errors.brought_from_thana && (
            <p className="text-sm text-red-600">{errors.brought_from_thana}</p>
          )}
        </div>
      </div>

      {/* Brought by Information - যে কনস্টাবল কর্তৃক আনা হইয়াছে তাহার নাম এবং সঙ্গে আসা আত্মীয়-স্বজনের নামসমূহ */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {t('investigation.general.brought_by_list')} *
        </Label>
        <div className="space-y-2">
          {formData.brought_by_list?.map((name: string, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={name}
                onChange={(e) => {
                  const newList = [...(formData.brought_by_list || [])];
                  newList[index] = e.target.value;
                  onFieldChange('brought_by_list', newList);
                }}
                placeholder={language === 'bn' ? "নাম" : "Name"}
                className="flex-1 h-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleRemoveBroughtBy(index)}
                className="px-2 h-10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Input
              value={newBroughtBy}
              onChange={(e) => setNewBroughtBy(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={language === 'bn' ? "নতুন নাম যোগ করুন" : "Add new name"}
              className="flex-1 h-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddBroughtBy}
              className="px-3 h-10"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {errors.brought_by_list && (
          <p className="text-sm text-red-600">{errors.brought_by_list}</p>
        )}
      </div>

      {/* Date and Time Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sent Date & Time - প্রেরণের দিন ও ক্ষণ */}
        <div className="space-y-2">
          <Label htmlFor="sent_datetime" className="text-sm font-medium">
            {t('investigation.general.sent_datetime')} *
          </Label>
          <Input
            id="sent_datetime"
            type="datetime-local"
            value={formData.sent_datetime || ''}
            onChange={(e) => onFieldChange('sent_datetime', e.target.value)}
            className={`h-10 ${errors.sent_datetime ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          />
          {errors.sent_datetime && (
            <p className="text-sm text-red-600">{errors.sent_datetime}</p>
          )}
        </div>

        {/* Brought to Morgue Date & Time - লাশ কাটা মর্গে আনয়নের দিন ও ক্ষণ */}
        <div className="space-y-2">
          <Label htmlFor="brought_datetime" className="text-sm font-medium">
            {t('investigation.general.brought_datetime')} *
          </Label>
          <Input
            id="brought_datetime"
            type="datetime-local"
            value={formData.brought_datetime || ''}
            onChange={(e) => onFieldChange('brought_datetime', e.target.value)}
            className={`h-10 ${errors.brought_datetime ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          />
          {errors.brought_datetime && (
            <p className="text-sm text-red-600">{errors.brought_datetime}</p>
          )}
        </div>

        {/* Examination Date & Time - পরীক্ষার দিন ও ক্ষণ */}
        <div className="space-y-2">
          <Label htmlFor="exam_datetime" className="text-sm font-medium">
            {t('investigation.general.exam_datetime')} *
          </Label>
          <Input
            id="exam_datetime"
            type="datetime-local"
            value={formData.exam_datetime || ''}
            onChange={(e) => onFieldChange('exam_datetime', e.target.value)}
            className={`h-10 ${errors.exam_datetime ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          />
          {errors.exam_datetime && (
            <p className="text-sm text-red-600">{errors.exam_datetime}</p>
          )}
        </div>
      </div>

      {/* Text Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Police Information - পুলিশ কর্তৃক প্রদত্ত তথ্য */}
        <div className="space-y-2">
          <Label htmlFor="police_info" className="text-sm font-medium">
            {t('investigation.general.police_info')} *
          </Label>
          <Textarea
            id="police_info"
            value={formData.police_info || ''}
            onChange={(e) => onFieldChange('police_info', e.target.value)}
            placeholder={language === 'bn' ? "পুলিশ কর্তৃক প্রদত্ত তথ্য" : "Police information"}
            rows={3}
            className={errors.police_info ? 'border-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200'}
          />
          {errors.police_info && (
            <p className="text-sm text-red-600">{errors.police_info}</p>
          )}
        </div>

        {/* Identifier Name - যে ব্যক্তি মেডিকেল অফিসিয়ারের সামনে সনাক্ত করিয়াছেন */}
        <div className="space-y-2">
          <Label htmlFor="identifier_name" className="text-sm font-medium">
            {t('investigation.general.identifier_name')} *
          </Label>
          <Input
            id="identifier_name"
            value={formData.identifier_name || ''}
            onChange={(e) => onFieldChange('identifier_name', e.target.value)}
            placeholder={language === 'bn' ? "সনাক্তকারীর নাম" : "Identifier name"}
            className={`h-10 ${errors.identifier_name ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          />
          {errors.identifier_name && (
            <p className="text-sm text-red-600">{errors.identifier_name}</p>
          )}
        </div>
      </div>
    </div>
  );
};
