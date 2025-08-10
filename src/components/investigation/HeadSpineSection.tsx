import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeadSpineSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function HeadSpineSection({ formData, onFieldChange, errors }: HeadSpineSectionProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Head Examination */}
      <div className="border-b pb-4">
        <h4 className="text-lg font-semibold mb-4">{t('investigation.head_spine.head_examination')}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="head_shape">{t('investigation.head_spine.head_shape')}</Label>
            <Select
              value={formData.head_shape || ''}
              onValueChange={(value) => onFieldChange('head_shape', value)}
            >
              <SelectTrigger className={errors.head_shape ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.head_spine.select_head_shape')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.head_spine.normal')}</SelectItem>
                <SelectItem value="abnormal">{t('investigation.head_spine.abnormal')}</SelectItem>
                <SelectItem value="deformed">{t('investigation.head_spine.deformed')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.head_shape && (
              <p className="text-sm text-red-500 mt-1">{errors.head_shape}</p>
            )}
          </div>
          <div>
            <Label htmlFor="head_injuries">{t('investigation.head_spine.head_injuries')}</Label>
            <Select
              value={formData.head_injuries || ''}
              onValueChange={(value) => onFieldChange('head_injuries', value)}
            >
              <SelectTrigger className={errors.head_injuries ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.head_spine.select_head_injuries')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{t('investigation.head_spine.none')}</SelectItem>
                <SelectItem value="abrasion">{t('investigation.head_spine.abrasion')}</SelectItem>
                <SelectItem value="contusion">{t('investigation.head_spine.contusion')}</SelectItem>
                <SelectItem value="laceration">{t('investigation.head_spine.laceration')}</SelectItem>
                <SelectItem value="fracture">{t('investigation.head_spine.fracture')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.head_injuries && (
              <p className="text-sm text-red-500 mt-1">{errors.head_injuries}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="head_injuries_details">{t('investigation.head_spine.head_injuries_details')}</Label>
          <Textarea
            id="head_injuries_details"
            value={formData.head_injuries_details || ''}
            onChange={(e) => onFieldChange('head_injuries_details', e.target.value)}
            placeholder={t('investigation.head_spine.head_injuries_details_placeholder')}
            rows={3}
            className={errors.head_injuries_details ? 'border-red-500' : ''}
          />
          {errors.head_injuries_details && (
            <p className="text-sm text-red-500 mt-1">{errors.head_injuries_details}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="scalp_condition">{t('investigation.head_spine.scalp_condition')}</Label>
            <Select
              value={formData.scalp_condition || ''}
              onValueChange={(value) => onFieldChange('scalp_condition', value)}
            >
              <SelectTrigger className={errors.scalp_condition ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.head_spine.select_scalp_condition')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="intact">{t('investigation.head_spine.intact')}</SelectItem>
                <SelectItem value="lacerated">{t('investigation.head_spine.lacerated')}</SelectItem>
                <SelectItem value="contused">{t('investigation.head_spine.contused')}</SelectItem>
                <SelectItem value="avulsed">{t('investigation.head_spine.avulsed')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.scalp_condition && (
              <p className="text-sm text-red-500 mt-1">{errors.scalp_condition}</p>
            )}
          </div>
          <div>
            <Label htmlFor="hair_condition">{t('investigation.head_spine.hair_condition')}</Label>
            <Select
              value={formData.hair_condition || ''}
              onValueChange={(value) => onFieldChange('hair_condition', value)}
            >
              <SelectTrigger className={errors.hair_condition ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.head_spine.select_hair_condition')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.head_spine.normal')}</SelectItem>
                <SelectItem value="matted">{t('investigation.head_spine.matted')}</SelectItem>
                <SelectItem value="missing">{t('investigation.head_spine.missing')}</SelectItem>
                <SelectItem value="blood_stained">{t('investigation.head_spine.blood_stained')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.hair_condition && (
              <p className="text-sm text-red-500 mt-1">{errors.hair_condition}</p>
            )}
          </div>
        </div>
      </div>

      {/* Face Examination */}
      <div className="border-b pb-4">
        <h4 className="text-lg font-semibold mb-4">{t('investigation.head_spine.face_examination')}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="facial_features">{t('investigation.head_spine.facial_features')}</Label>
            <Select
              value={formData.facial_features || ''}
              onValueChange={(value) => onFieldChange('facial_features', value)}
            >
              <SelectTrigger className={errors.facial_features ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.head_spine.select_facial_features')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.head_spine.normal')}</SelectItem>
                <SelectItem value="swollen">{t('investigation.head_spine.swollen')}</SelectItem>
                <SelectItem value="deformed">{t('investigation.head_spine.deformed')}</SelectItem>
                <SelectItem value="contused">{t('investigation.head_spine.contused')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.facial_features && (
              <p className="text-sm text-red-500 mt-1">{errors.facial_features}</p>
            )}
          </div>
          <div>
            <Label htmlFor="eyes_condition">{t('investigation.head_spine.eyes_condition')}</Label>
            <Select
              value={formData.eyes_condition || ''}
              onValueChange={(value) => onFieldChange('eyes_condition', value)}
            >
              <SelectTrigger className={errors.eyes_condition ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.head_spine.select_eyes_condition')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="closed">{t('investigation.head_spine.closed')}</SelectItem>
                <SelectItem value="open">{t('investigation.head_spine.open')}</SelectItem>
                <SelectItem value="swollen">{t('investigation.head_spine.swollen')}</SelectItem>
                <SelectItem value="injured">{t('investigation.head_spine.injured')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.eyes_condition && (
              <p className="text-sm text-red-500 mt-1">{errors.eyes_condition}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="facial_injuries_details">{t('investigation.head_spine.facial_injuries_details')}</Label>
          <Textarea
            id="facial_injuries_details"
            value={formData.facial_injuries_details || ''}
            onChange={(e) => onFieldChange('facial_injuries_details', e.target.value)}
            placeholder={t('investigation.head_spine.facial_injuries_details_placeholder')}
            rows={3}
            className={errors.facial_injuries_details ? 'border-red-500' : ''}
          />
          {errors.facial_injuries_details && (
            <p className="text-sm text-red-500 mt-1">{errors.facial_injuries_details}</p>
          )}
        </div>
      </div>

      {/* Spine Examination */}
      <div>
        <h4 className="text-lg font-semibold mb-4">{t('investigation.head_spine.spine_examination')}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cervical_spine">{t('investigation.head_spine.cervical_spine')}</Label>
            <Select
              value={formData.cervical_spine || ''}
              onValueChange={(value) => onFieldChange('cervical_spine', value)}
            >
              <SelectTrigger className={errors.cervical_spine ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.head_spine.select_cervical_spine')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.head_spine.normal')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.head_spine.fractured')}</SelectItem>
                <SelectItem value="dislocated">{t('investigation.head_spine.dislocated')}</SelectItem>
                <SelectItem value="tender">{t('investigation.head_spine.tender')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.cervical_spine && (
              <p className="text-sm text-red-500 mt-1">{errors.cervical_spine}</p>
            )}
          </div>
          <div>
            <Label htmlFor="thoracic_spine">{t('investigation.head_spine.thoracic_spine')}</Label>
            <Select
              value={formData.thoracic_spine || ''}
              onValueChange={(value) => onFieldChange('thoracic_spine', value)}
            >
              <SelectTrigger className={errors.thoracic_spine ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.head_spine.select_thoracic_spine')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.head_spine.normal')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.head_spine.fractured')}</SelectItem>
                <SelectItem value="deformed">{t('investigation.head_spine.deformed')}</SelectItem>
                <SelectItem value="tender">{t('investigation.head_spine.tender')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.thoracic_spine && (
              <p className="text-sm text-red-500 mt-1">{errors.thoracic_spine}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="lumbar_spine">{t('investigation.head_spine.lumbar_spine')}</Label>
            <Select
              value={formData.lumbar_spine || ''}
              onValueChange={(value) => onFieldChange('lumbar_spine', value)}
            >
              <SelectTrigger className={errors.lumbar_spine ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.head_spine.select_lumbar_spine')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.head_spine.normal')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.head_spine.fractured')}</SelectItem>
                <SelectItem value="deformed">{t('investigation.head_spine.deformed')}</SelectItem>
                <SelectItem value="tender">{t('investigation.head_spine.tender')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.lumbar_spine && (
              <p className="text-sm text-red-500 mt-1">{errors.lumbar_spine}</p>
            )}
          </div>
          <div>
            <Label htmlFor="sacral_spine">{t('investigation.head_spine.sacral_spine')}</Label>
            <Select
              value={formData.sacral_spine || ''}
              onValueChange={(value) => onFieldChange('sacral_spine', value)}
            >
              <SelectTrigger className={errors.sacral_spine ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.head_spine.select_sacral_spine')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.head_spine.normal')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.head_spine.fractured')}</SelectItem>
                <SelectItem value="deformed">{t('investigation.head_spine.deformed')}</SelectItem>
                <SelectItem value="tender">{t('investigation.head_spine.tender')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.sacral_spine && (
              <p className="text-sm text-red-500 mt-1">{errors.sacral_spine}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="spine_injuries_details">{t('investigation.head_spine.spine_injuries_details')}</Label>
          <Textarea
            id="spine_injuries_details"
            value={formData.spine_injuries_details || ''}
            onChange={(e) => onFieldChange('spine_injuries_details', e.target.value)}
            placeholder={t('investigation.head_spine.spine_injuries_details_placeholder')}
            rows={3}
            className={errors.spine_injuries_details ? 'border-red-500' : ''}
          />
          {errors.spine_injuries_details && (
            <p className="text-sm text-red-500 mt-1">{errors.spine_injuries_details}</p>
          )}
        </div>
      </div>

      {/* Additional Observations */}
      <div>
        <Label htmlFor="head_spine_additional_observations">{t('investigation.head_spine.additional_observations')}</Label>
        <Textarea
          id="head_spine_additional_observations"
          value={formData.head_spine_additional_observations || ''}
          onChange={(e) => onFieldChange('head_spine_additional_observations', e.target.value)}
          placeholder={t('investigation.head_spine.additional_observations_placeholder')}
          rows={3}
          className={errors.head_spine_additional_observations ? 'border-red-500' : ''}
        />
        {errors.head_spine_additional_observations && (
          <p className="text-sm text-red-500 mt-1">{errors.head_spine_additional_observations}</p>
        )}
      </div>
    </div>
  );
}
