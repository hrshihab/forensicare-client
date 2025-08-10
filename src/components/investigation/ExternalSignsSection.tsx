import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface ExternalSignsSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function ExternalSignsSection({ formData, onFieldChange, errors }: ExternalSignsSectionProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* External Examination */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="external_examination_date">{t('investigation.external_signs.external_examination_date')}</Label>
          <Input
            id="external_examination_date"
            type="date"
            value={formData.external_examination_date || ''}
            onChange={(e) => onFieldChange('external_examination_date', e.target.value)}
            className={errors.external_examination_date ? 'border-red-500' : ''}
          />
          {errors.external_examination_date && (
            <p className="text-sm text-red-500 mt-1">{errors.external_examination_date}</p>
          )}
        </div>
        <div>
          <Label htmlFor="external_examination_time">{t('investigation.external_signs.external_examination_time')}</Label>
          <Input
            id="external_examination_time"
            type="time"
            value={formData.external_examination_time || ''}
            onChange={(e) => onFieldChange('external_examination_time', e.target.value)}
            className={errors.external_examination_time ? 'border-red-500' : ''}
          />
          {errors.external_examination_time && (
            <p className="text-sm text-red-500 mt-1">{errors.external_examination_time}</p>
          )}
        </div>
      </div>

      {/* Body Condition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="body_condition">{t('investigation.external_signs.body_condition')}</Label>
          <Select
            value={formData.body_condition || ''}
            onValueChange={(value) => onFieldChange('body_condition', value)}
          >
            <SelectTrigger className={errors.body_condition ? 'border-red-500' : ''}>
              <SelectValue placeholder={t('investigation.external_signs.select_body_condition')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fresh">{t('investigation.external_signs.fresh')}</SelectItem>
              <SelectItem value="decomposed">{t('investigation.external_signs.decomposed')}</SelectItem>
              <SelectItem value="mummified">{t('investigation.external_signs.mummified')}</SelectItem>
              <SelectItem value="skeletonized">{t('investigation.external_signs.skeletonized')}</SelectItem>
            </SelectContent>
          </Select>
          {errors.body_condition && (
            <p className="text-sm text-red-500 mt-1">{errors.body_condition}</p>
          )}
        </div>
        <div>
          <Label htmlFor="rigor_mortis">{t('investigation.external_signs.rigor_mortis')}</Label>
          <Select
            value={formData.rigor_mortis || ''}
            onValueChange={(value) => onFieldChange('rigor_mortis', value)}
          >
            <SelectTrigger className={errors.rigor_mortis ? 'border-red-500' : ''}>
              <SelectValue placeholder={t('investigation.external_signs.select_rigor_mortis')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="present">{t('investigation.external_signs.present')}</SelectItem>
              <SelectItem value="absent">{t('investigation.external_signs.absent')}</SelectItem>
              <SelectItem value="partial">{t('investigation.external_signs.partial')}</SelectItem>
            </SelectContent>
          </Select>
          {errors.rigor_mortis && (
            <p className="text-sm text-red-500 mt-1">{errors.rigor_mortis}</p>
          )}
        </div>
      </div>

      {/* Livor Mortis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="livor_mortis">{t('investigation.external_signs.livor_mortis')}</Label>
          <Select
            value={formData.livor_mortis || ''}
            onValueChange={(value) => onFieldChange('livor_mortis', value)}
          >
            <SelectTrigger className={errors.livor_mortis ? 'border-red-500' : ''}>
              <SelectValue placeholder={t('investigation.external_signs.select_livor_mortis')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="present">{t('investigation.external_signs.present')}</SelectItem>
              <SelectItem value="absent">{t('investigation.external_signs.absent')}</SelectItem>
              <SelectItem value="fixed">{t('investigation.external_signs.fixed')}</SelectItem>
              <SelectItem value="blanching">{t('investigation.external_signs.blanching')}</SelectItem>
            </SelectContent>
          </Select>
          {errors.livor_mortis && (
            <p className="text-sm text-red-500 mt-1">{errors.livor_mortis}</p>
          )}
        </div>
        <div>
          <Label htmlFor="livor_color">{t('investigation.external_signs.livor_color')}</Label>
          <Input
            id="livor_color"
            value={formData.livor_color || ''}
            onChange={(e) => onFieldChange('livor_color', e.target.value)}
            placeholder={t('investigation.external_signs.livor_color_placeholder')}
            className={errors.livor_color ? 'border-red-500' : ''}
          />
          {errors.livor_color && (
            <p className="text-sm text-red-500 mt-1">{errors.livor_color}</p>
          )}
        </div>
      </div>

      {/* Body Measurements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="body_length">{t('investigation.external_signs.body_length')} (cm)</Label>
          <Input
            id="body_length"
            type="number"
            step="0.1"
            value={formData.body_length || ''}
            onChange={(e) => onFieldChange('body_length', e.target.value)}
            className={errors.body_length ? 'border-red-500' : ''}
          />
          {errors.body_length && (
            <p className="text-sm text-red-500 mt-1">{errors.body_length}</p>
          )}
        </div>
        <div>
          <Label htmlFor="body_weight">{t('investigation.external_signs.body_weight')} (kg)</Label>
          <Input
            id="body_weight"
            type="number"
            step="0.1"
            value={formData.body_weight || ''}
            onChange={(e) => onFieldChange('body_weight', e.target.value)}
            className={errors.body_weight ? 'border-red-500' : ''}
          />
          {errors.body_weight && (
            <p className="text-sm text-red-500 mt-1">{errors.body_weight}</p>
          )}
        </div>
        <div>
          <Label htmlFor="body_temperature">{t('investigation.external_signs.body_temperature')} (°C)</Label>
          <Input
            id="body_temperature"
            type="number"
            step="0.1"
            value={formData.body_temperature || ''}
            onChange={(e) => onFieldChange('body_temperature', e.target.value)}
            className={errors.body_temperature ? 'border-red-500' : ''}
          />
          {errors.body_temperature && (
            <p className="text-sm text-red-500 mt-1">{errors.body_temperature}</p>
          )}
        </div>
      </div>

      {/* Clothing and Personal Effects */}
      <div>
        <Label htmlFor="clothing_description">{t('investigation.external_signs.clothing_description')}</Label>
        <Textarea
          id="clothing_description"
          value={formData.clothing_description || ''}
          onChange={(e) => onFieldChange('clothing_description', e.target.value)}
          placeholder={t('investigation.external_signs.clothing_description_placeholder')}
          rows={3}
          className={errors.clothing_description ? 'border-red-500' : ''}
        />
        {errors.clothing_description && (
          <p className="text-sm text-red-500 mt-1">{errors.clothing_description}</p>
        )}
      </div>

      <div>
        <Label htmlFor="personal_effects">{t('investigation.external_signs.personal_effects')}</Label>
        <Textarea
          id="personal_effects"
          value={formData.personal_effects || ''}
          onChange={(e) => onFieldChange('personal_effects', e.target.value)}
          placeholder={t('investigation.external_signs.personal_effects_placeholder')}
          rows={3}
          className={errors.personal_effects ? 'border-red-500' : ''}
        />
        {errors.personal_effects && (
          <p className="text-sm text-red-500 mt-1">{errors.personal_effects}</p>
        )}
      </div>

      {/* External Injuries */}
      <div>
        <Label htmlFor="external_injuries">{t('investigation.external_signs.external_injuries')}</Label>
        <Textarea
          id="external_injuries"
          value={formData.external_injuries || ''}
          onChange={(e) => onFieldChange('external_injuries', e.target.value)}
          placeholder={t('investigation.external_signs.external_injuries_placeholder')}
          rows={4}
          className={errors.external_injuries ? 'border-red-500' : ''}
        />
        {errors.external_injuries && (
          <p className="text-sm text-red-500 mt-1">{errors.external_injuries}</p>
        )}
      </div>

      {/* Additional Observations */}
      <div>
        <Label htmlFor="additional_observations">{t('investigation.external_signs.additional_observations')}</Label>
        <Textarea
          id="additional_observations"
          value={formData.additional_observations || ''}
          onChange={(e) => onFieldChange('additional_observations', e.target.value)}
          placeholder={t('investigation.external_signs.additional_observations_placeholder')}
          rows={3}
          className={errors.additional_observations ? 'border-red-500' : ''}
        />
        {errors.additional_observations && (
          <p className="text-sm text-red-500 mt-1">{errors.additional_observations}</p>
        )}
      </div>
    </div>
  );
}
