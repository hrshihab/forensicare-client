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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Person Name */}
        <div className="space-y-2">
          <Label htmlFor="person_name" className="text-sm font-medium">
            {t('investigation.general.person_name')} *
          </Label>
          <Input
            id="person_name"
            value={formData.person_name || ''}
            onChange={(e) => onFieldChange('person_name', e.target.value)}
            placeholder="Person Name"
            className={errors.person_name ? 'border-red-500' : ''}
          />
          {errors.person_name && (
            <p className="text-sm text-red-600">{errors.person_name}</p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender" className="text-sm font-medium">
            {t('investigation.general.gender')} *
          </Label>
          <Select
            value={formData.gender || ''}
            onValueChange={(value) => onFieldChange('gender', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-sm text-red-600">{errors.gender}</p>
          )}
        </div>

        {/* Age */}
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
            onChange={(e) => onFieldChange('age_years', parseInt(e.target.value) || undefined)}
            placeholder="Age in years"
            className={errors.age_years ? 'border-red-500' : ''}
          />
          {errors.age_years && (
            <p className="text-sm text-red-600">{errors.age_years}</p>
          )}
        </div>

        {/* Complexion */}
        <div className="space-y-2">
          <Label htmlFor="complexion" className="text-sm font-medium">
            {t('investigation.general.complexion')}
          </Label>
          <Input
            id="complexion"
            value={formData.complexion || ''}
            onChange={(e) => onFieldChange('complexion', e.target.value)}
            placeholder="Complexion"
          />
        </div>

        {/* Brought from Village */}
        <div className="space-y-2">
          <Label htmlFor="brought_from_village" className="text-sm font-medium">
            {t('investigation.general.brought_from_village')}
          </Label>
          <Input
            id="brought_from_village"
            value={formData.brought_from_village || ''}
            onChange={(e) => onFieldChange('brought_from_village', e.target.value)}
            placeholder="Village name"
          />
        </div>

        {/* Brought from Thana */}
        <div className="space-y-2">
          <Label htmlFor="brought_from_thana_id" className="text-sm font-medium">
            {t('investigation.general.brought_from_thana')}
          </Label>
          <Select
            value={formData.brought_from_thana_id || ''}
            onValueChange={(value) => onFieldChange('brought_from_thana_id', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Thana" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Dhanmondi</SelectItem>
              <SelectItem value="2">Gulshan</SelectItem>
              <SelectItem value="3">Banani</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Brought by List */}
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
                placeholder="Name"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleRemoveBroughtBy(index)}
                className="px-2"
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
              placeholder="Add new name"
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddBroughtBy}
              className="px-3"
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
        <div className="space-y-2">
          <Label htmlFor="sent_datetime" className="text-sm font-medium">
            {t('investigation.general.sent_datetime')} *
          </Label>
          <Input
            id="sent_datetime"
            type="datetime-local"
            value={formData.sent_datetime || ''}
            onChange={(e) => onFieldChange('sent_datetime', e.target.value)}
            className={errors.sent_datetime ? 'border-red-500' : ''}
          />
          {errors.sent_datetime && (
            <p className="text-sm text-red-600">{errors.sent_datetime}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="brought_datetime" className="text-sm font-medium">
            {t('investigation.general.brought_datetime')} *
          </Label>
          <Input
            id="brought_datetime"
            type="datetime-local"
            value={formData.brought_datetime || ''}
            onChange={(e) => onFieldChange('brought_datetime', e.target.value)}
            className={errors.brought_datetime ? 'border-red-500' : ''}
          />
          {errors.brought_datetime && (
            <p className="text-sm text-red-600">{errors.brought_datetime}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="exam_datetime" className="text-sm font-medium">
            {t('investigation.general.exam_datetime')} *
          </Label>
          <Input
            id="exam_datetime"
            type="datetime-local"
            value={formData.exam_datetime || ''}
            onChange={(e) => onFieldChange('exam_datetime', e.target.value)}
            className={errors.exam_datetime ? 'border-red-500' : ''}
          />
          {errors.exam_datetime && (
            <p className="text-sm text-red-600">{errors.exam_datetime}</p>
          )}
        </div>
      </div>

      {/* Text Areas */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="police_info" className="text-sm font-medium">
            {t('investigation.general.police_info')} *
          </Label>
          <Textarea
            id="police_info"
            value={formData.police_info || ''}
            onChange={(e) => onFieldChange('police_info', e.target.value)}
            placeholder="Police information"
            rows={3}
            className={errors.police_info ? 'border-red-500' : ''}
          />
          {errors.police_info && (
            <p className="text-sm text-red-600">{errors.police_info}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="identifier_name" className="text-sm font-medium">
            {t('investigation.general.identifier_name')} *
          </Label>
          <Input
            id="identifier_name"
            value={formData.identifier_name || ''}
            onChange={(e) => onFieldChange('identifier_name', e.target.value)}
            placeholder="Identifier name"
            className={errors.identifier_name ? 'border-red-500' : ''}
          />
          {errors.identifier_name && (
            <p className="text-sm text-red-600">{errors.identifier_name}</p>
          )}
        </div>
      </div>
    </div>
  );
};
