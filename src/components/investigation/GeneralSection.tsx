'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X, Plus, User, MapPin, Users, Calendar, Info } from 'lucide-react';
import { useDropdownValues } from '@/hooks/useDropdownValues';

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
  const { genderOptions, getLabel } = useDropdownValues();
  const [newBroughtBy, setNewBroughtBy] = useState('');
  const [newRelativeName, setNewRelativeName] = useState('');

  const handleAddConstable = () => {
    if (newBroughtBy.trim()) {
      const currentList = formData.constable_name || [];
      onFieldChange('constable_name', [...currentList, newBroughtBy.trim()]);
      setNewBroughtBy('');
    }
  };

  const handleAddRelative = () => {
    if (newRelativeName.trim()) {
      const currentList = formData.relatives_names || [];
      onFieldChange('relatives_names', [...currentList, newRelativeName.trim()]);
      setNewRelativeName('');
    }
  };

  const handleRemoveConstable = (index: number) => {
    const currentList = formData.constable_name || [];
    const newList = currentList.filter((_: any, i: number) => i !== index);
    onFieldChange('constable_name', newList);
  };

  const handleRemoveRelative = (index: number) => {
    const currentList = formData.relatives_names || [];
    const newList = currentList.filter((_: any, i: number) => i !== index);
    onFieldChange('relatives_names', newList);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddConstable();
    }
  };

  const handleRelativeKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddRelative();
    }
  };

  return (
    <div className="space-y-6">
		{/* Basic Information - নাম, লিঙ্গ, বয়স এবং গোত্র */}
		<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
			<div className="flex items-center gap-2 mb-4">
				<span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
					<User className="h-4 w-4 text-blue-600" />
				</span>
				<h4 className="text-base font-semibold text-gray-800">
					{language === 'bn' ? 'মৌলিক তথ্য' : 'Basic Information'}
				</h4>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-5 gap-4">
				{/* Person Name - 2/5 width */}
				<div className="md:col-span-2 space-y-2">
					<Label htmlFor="person_name" className="text-base font-medium font-bangla">
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

				{/* Gender - 1/5 width */}
				<div className="space-y-2">
					<Label htmlFor="gender" className="text-base font-medium font-bangla">
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
							{genderOptions.map((gender) => (
								<SelectItem key={gender.value} value={gender.value}>
									{getLabel(genderOptions, gender.value)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors.gender && (
						<p className="text-sm text-red-600">{errors.gender}</p>
					)}
				</div>

				{/* Age - 1/5 width */}
				<div className="space-y-2">
					<Label htmlFor="age_years" className="text-base font-medium font-bangla">
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
					<Label htmlFor="caste_tribe" className="text-base font-medium font-bangla">
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
		</div>

		{/* Location Information - কোন স্থান হতে আনা হইয়াছে—গ্রাম ও থানা */}
		<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
			<div className="flex items-center gap-2 mb-4">
				<span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
					<MapPin className="h-4 w-4 text-emerald-600" />
				</span>
				<h4 className="text-base font-semibold text-gray-800">
					{language === 'bn' ? 'কোন স্থান হতে আনা হইয়াছে' : 'Brought from which Location'}
				</h4>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Brought from Village */}
				<div className="space-y-2">
					<Label htmlFor="brought_from_village" className="text-base font-medium font-bangla">
						{language === 'bn' ? 'গ্রাম' : 'Village'} *
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

				{/* Brought from Thana - 1/2 width */}
				<div className="space-y-2">
					<Label htmlFor="brought_from_thana" className="text-base font-medium font-bangla">
						{language === 'bn' ? 'থানা' : 'Thana'} *
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
		</div>

		{/* Brought by Information - Single constable field */}
		<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
			<div className="flex items-center gap-2 mb-4">
				<span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100">
					<Users className="h-4 w-4 text-purple-600" />
				</span>
				<h4 className="text-base font-semibold text-gray-800">
					{language === 'bn' ? 'সাথে আগত ব্যক্তিবর্গ' : 'Accompanying Persons'}
				</h4>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Constable Name - যে কনস্টাবল কর্তৃক আনা হইয়াছে - 1/2 width */}
        <div className="md:col-span-2 space-y-2">
          <Label className="text-base font-medium font-bangla">
            {language === 'bn' ? "যে কনস্টাবল কর্তৃক আনা হইয়াছে" : "Constable who brought the body"} *
          </Label>
          <Input
            value={formData.constable_name || ''}
            onChange={(e) => onFieldChange('constable_name', e.target.value)}
            placeholder={language === 'bn' ? "কনস্টাবলের নাম" : "Constable name"}
            className={`h-10 ${errors.constable_name ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
          />
          {errors.constable_name && (
            <p className="text-sm text-red-600">{errors.constable_name}</p>
          )}
        </div>

        {/* Relatives Names - আত্মীয়-স্বজনের নামসমূহ - 1/2 width */}
        <div className="md:col-span-2 space-y-2">
          <Label className="text-base font-medium font-bangla">
            {language === 'bn' ? "আত্মীয়-স্বজনের নামসমূহ" : "Relatives who accompanied"} *
          </Label>
          <div className="space-y-2">
            {/* Display existing relatives */}
            {formData.relatives_names && formData.relatives_names.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.relatives_names.map((relative: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    <span>{relative}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRelative(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Add new relative */}
            <div className="flex gap-2">
              <Input
                value={newRelativeName}
                onChange={(e) => setNewRelativeName(e.target.value)}
                onKeyPress={handleRelativeKeyPress}
                placeholder={language === 'bn' ? "আত্মীয়ের নাম" : "Relative name"}
                className="flex-1 h-10 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
              <Button
                type="button"
                onClick={handleAddRelative}
                disabled={!newRelativeName.trim()}
                className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {errors.relatives_names && (
            <p className="text-sm text-red-600">{errors.relatives_names}</p>
          )}
        </div>
      </div>
		</div>

		{/* Date and Time Information */}
		<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
			<div className="flex items-center gap-2 mb-4">
				<span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
					<Calendar className="h-4 w-4 text-amber-600" />
				</span>
				<h4 className="text-base font-semibold text-gray-800">
					{language === 'bn' ? 'তারিখ ও সময়' : 'Date & Time'}
				</h4>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* Sent Date & Time - 1/3 width */}
				<div className="space-y-2">
					<Label htmlFor="sent_datetime" className="text-base font-medium font-bangla">
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

				{/* Brought Date & Time - 1/3 width */}
				<div className="space-y-2">
					<Label htmlFor="brought_datetime" className="text-base font-medium font-bangla">
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

				{/* Examination Date & Time - 1/3 width */}
				<div className="space-y-2">
					<Label htmlFor="exam_datetime" className="text-base font-medium font-bangla">
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
		</div>

		{/* Police Information and Identifier - Moved to end */}
		<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
			<div className="flex items-center gap-2 mb-4">
				<span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100">
					<Info className="h-4 w-4 text-sky-600" />
				</span>
				<h4 className="text-base font-semibold text-gray-800">
					{language === 'bn' ? 'অতিরিক্ত তথ্য' : 'Additional Information'}
				</h4>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        	{/* Identifier Name - 1/2 width */}
				<div className="space-y-2">
					<Label htmlFor="identifier_name" className="text-base font-medium font-bangla">
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

				{/* Police Information - 1/2 width */}
				<div className="space-y-2">
					<Label htmlFor="police_info" className="text-base font-medium font-bangla">
						{t('investigation.general.police_info')} *
					</Label>
					<Textarea
						id="police_info"
						value={formData.police_info || ''}
						onChange={(e) => onFieldChange('police_info', e.target.value)}
						placeholder={language === 'bn' ? "পুলিশের দেওয়া তথ্য লিখুন" : "Enter police information"}
						rows={3}
						className={`${errors.police_info ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
					/>
					{errors.police_info && (
						<p className="text-sm text-red-600">{errors.police_info}</p>
					)}
				</div>

			
			</div>
		</div>
    </div>
  );
};