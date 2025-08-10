import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChestLungsSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function ChestLungsSection({ formData, onFieldChange, errors }: ChestLungsSectionProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Chest Examination */}
      <div className="border-b pb-4">
        <h4 className="text-lg font-semibold mb-4">{t('investigation.chest_lungs.chest_examination')}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="chest_shape">{t('investigation.chest_lungs.chest_shape')}</Label>
            <Select
              value={formData.chest_shape || ''}
              onValueChange={(value) => onFieldChange('chest_shape', value)}
            >
              <SelectTrigger className={errors.chest_shape ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.chest_lungs.select_chest_shape')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.chest_lungs.normal')}</SelectItem>
                <SelectItem value="barrel_shaped">{t('investigation.chest_lungs.barrel_shaped')}</SelectItem>
                <SelectItem value="funnel_chest">{t('investigation.chest_lungs.funnel_chest')}</SelectItem>
                <SelectItem value="pigeon_chest">{t('investigation.chest_lungs.pigeon_chest')}</SelectItem>
                <SelectItem value="deformed">{t('investigation.chest_lungs.deformed')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.chest_shape && (
              <p className="text-sm text-red-500 mt-1">{errors.chest_shape}</p>
            )}
          </div>
          <div>
            <Label htmlFor="chest_symmetry">{t('investigation.chest_lungs.chest_symmetry')}</Label>
            <Select
              value={formData.chest_symmetry || ''}
              onValueChange={(value) => onFieldChange('chest_symmetry', value)}
            >
              <SelectTrigger className={errors.chest_symmetry ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.chest_lungs.select_chest_symmetry')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="symmetrical">{t('investigation.chest_lungs.symmetrical')}</SelectItem>
                <SelectItem value="asymmetrical">{t('investigation.chest_lungs.asymmetrical')}</SelectItem>
                <SelectItem value="right_side_larger">{t('investigation.chest_lungs.right_side_larger')}</SelectItem>
                <SelectItem value="left_side_larger">{t('investigation.chest_lungs.left_side_larger')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.chest_symmetry && (
              <p className="text-sm text-red-500 mt-1">{errors.chest_symmetry}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="chest_injuries">{t('investigation.chest_lungs.chest_injuries')}</Label>
            <Select
              value={formData.chest_injuries || ''}
              onValueChange={(value) => onFieldChange('chest_injuries', value)}
            >
              <SelectTrigger className={errors.chest_injuries ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.chest_lungs.select_chest_injuries')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{t('investigation.chest_lungs.none')}</SelectItem>
                <SelectItem value="abrasion">{t('investigation.chest_lungs.abrasion')}</SelectItem>
                <SelectItem value="contusion">{t('investigation.chest_lungs.contusion')}</SelectItem>
                <SelectItem value="laceration">{t('investigation.chest_lungs.laceration')}</SelectItem>
                <SelectItem value="penetrating">{t('investigation.chest_lungs.penetrating')}</SelectItem>
                <SelectItem value="fracture">{t('investigation.chest_lungs.fracture')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.chest_injuries && (
              <p className="text-sm text-red-500 mt-1">{errors.chest_injuries}</p>
            )}
          </div>
          <div>
            <Label htmlFor="rib_fractures">{t('investigation.chest_lungs.rib_fractures')}</Label>
            <Select
              value={formData.rib_fractures || ''}
              onValueChange={(value) => onFieldChange('rib_fractures', value)}
            >
              <SelectTrigger className={errors.rib_fractures ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.chest_lungs.select_rib_fractures')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{t('investigation.chest_lungs.none')}</SelectItem>
                <SelectItem value="single">{t('investigation.chest_lungs.single')}</SelectItem>
                <SelectItem value="multiple">{t('investigation.chest_lungs.multiple')}</SelectItem>
                <SelectItem value="bilateral">{t('investigation.chest_lungs.bilateral')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.rib_fractures && (
              <p className="text-sm text-red-500 mt-1">{errors.rib_fractures}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="chest_injuries_details">{t('investigation.chest_lungs.chest_injuries_details')}</Label>
          <Textarea
            id="chest_injuries_details"
            value={formData.chest_injuries_details || ''}
            onChange={(e) => onFieldChange('chest_injuries_details', e.target.value)}
            placeholder={t('investigation.chest_lungs.chest_injuries_details_placeholder')}
            rows={3}
            className={errors.chest_injuries_details ? 'border-red-500' : ''}
          />
          {errors.chest_injuries_details && (
            <p className="text-sm text-red-500 mt-1">{errors.chest_injuries_details}</p>
          )}
        </div>
      </div>

      {/* Lungs Examination */}
      <div className="border-b pb-4">
        <h4 className="text-lg font-semibold mb-4">{t('investigation.chest_lungs.lungs_examination')}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="right_lung">{t('investigation.chest_lungs.right_lung')}</Label>
            <Select
              value={formData.right_lung || ''}
              onValueChange={(value) => onFieldChange('right_lung', value)}
            >
              <SelectTrigger className={errors.right_lung ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.chest_lungs.select_right_lung')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.chest_lungs.normal')}</SelectItem>
                <SelectItem value="consolidated">{t('investigation.chest_lungs.consolidated')}</SelectItem>
                <SelectItem value="collapsed">{t('investigation.chest_lungs.collapsed')}</SelectItem>
                <SelectItem value="pneumothorax">{t('investigation.chest_lungs.pneumothorax')}</SelectItem>
                <SelectItem value="hemothorax">{t('investigation.chest_lungs.hemothorax')}</SelectItem>
                <SelectItem value="edema">{t('investigation.chest_lungs.edema')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.right_lung && (
              <p className="text-sm text-red-500 mt-1">{errors.right_lung}</p>
            )}
          </div>
          <div>
            <Label htmlFor="left_lung">{t('investigation.chest_lungs.left_lung')}</Label>
            <Select
              value={formData.left_lung || ''}
              onValueChange={(value) => onFieldChange('left_lung', value)}
            >
              <SelectTrigger className={errors.left_lung ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.chest_lungs.select_left_lung')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.chest_lungs.normal')}</SelectItem>
                <SelectItem value="consolidated">{t('investigation.chest_lungs.consolidated')}</SelectItem>
                <SelectItem value="collapsed">{t('investigation.chest_lungs.collapsed')}</SelectItem>
                <SelectItem value="pneumothorax">{t('investigation.chest_lungs.pneumothorax')}</SelectItem>
                <SelectItem value="hemothorax">{t('investigation.chest_lungs.hemothorax')}</SelectItem>
                <SelectItem value="edema">{t('investigation.chest_lungs.edema')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.left_lung && (
              <p className="text-sm text-red-500 mt-1">{errors.left_lung}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="pleural_cavity">{t('investigation.chest_lungs.pleural_cavity')}</Label>
            <Select
              value={formData.pleural_cavity || ''}
              onValueChange={(value) => onFieldChange('pleural_cavity', value)}
            >
              <SelectTrigger className={errors.pleural_cavity ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.chest_lungs.select_pleural_cavity')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.chest_lungs.normal')}</SelectItem>
                <SelectItem value="fluid_present">{t('investigation.chest_lungs.fluid_present')}</SelectItem>
                <SelectItem value="air_present">{t('investigation.chest_lungs.air_present')}</SelectItem>
                <SelectItem value="blood_present">{t('investigation.chest_lungs.blood_present')}</SelectItem>
                <SelectItem value="pus_present">{t('investigation.chest_lungs.pus_present')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.pleural_cavity && (
              <p className="text-sm text-red-500 mt-1">{errors.pleural_cavity}</p>
            )}
          </div>
          <div>
            <Label htmlFor="mediastinum">{t('investigation.chest_lungs.mediastinum')}</Label>
            <Select
              value={formData.mediastinum || ''}
              onValueChange={(value) => onFieldChange('mediastinum', value)}
            >
              <SelectTrigger className={errors.mediastinum ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.chest_lungs.select_mediastinum')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.chest_lungs.normal')}</SelectItem>
                <SelectItem value="shifted_right">{t('investigation.chest_lungs.shifted_right')}</SelectItem>
                <SelectItem value="shifted_left">{t('investigation.chest_lungs.shifted_left')}</SelectItem>
                <SelectItem value="widened">{t('investigation.chest_lungs.widened')}</SelectItem>
                <SelectItem value="compressed">{t('investigation.chest_lungs.compressed')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.mediastinum && (
              <p className="text-sm text-red-500 mt-1">{errors.mediastinum}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="lungs_additional_findings">{t('investigation.chest_lungs.lungs_additional_findings')}</Label>
          <Textarea
            id="lungs_additional_findings"
            value={formData.lungs_additional_findings || ''}
            onChange={(e) => onFieldChange('lungs_additional_findings', e.target.value)}
            placeholder={t('investigation.chest_lungs.lungs_additional_findings_placeholder')}
            rows={3}
            className={errors.lungs_additional_findings ? 'border-red-500' : ''}
          />
          {errors.lungs_additional_findings && (
            <p className="text-sm text-red-500 mt-1">{errors.lungs_additional_findings}</p>
          )}
        </div>
      </div>

      {/* Heart Examination */}
      <div className="border-b pb-4">
        <h4 className="text-lg font-semibold mb-4">{t('investigation.chest_lungs.heart_examination')}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="heart_size">{t('investigation.chest_lungs.heart_size')}</Label>
            <Select
              value={formData.heart_size || ''}
              onValueChange={(value) => onFieldChange('heart_size', value)}
            >
              <SelectTrigger className={errors.heart_size ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.chest_lungs.select_heart_size')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.chest_lungs.normal')}</SelectItem>
                <SelectItem value="enlarged">{t('investigation.chest_lungs.enlarged')}</SelectItem>
                <SelectItem value="hypertrophied">{t('investigation.chest_lungs.hypertrophied')}</SelectItem>
                <SelectItem value="dilated">{t('investigation.chest_lungs.dilated')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.heart_size && (
              <p className="text-sm text-red-500 mt-1">{errors.heart_size}</p>
            )}
          </div>
          <div>
            <Label htmlFor="heart_position">{t('investigation.chest_lungs.heart_position')}</Label>
            <Select
              value={formData.heart_position || ''}
              onValueChange={(value) => onFieldChange('heart_position', value)}
            >
              <SelectTrigger className={errors.heart_position ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.chest_lungs.select_heart_position')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.chest_lungs.normal')}</SelectItem>
                <SelectItem value="dextrocardia">{t('investigation.chest_lungs.dextrocardia')}</SelectItem>
                <SelectItem value="shifted_right">{t('investigation.chest_lungs.shifted_right')}</SelectItem>
                <SelectItem value="shifted_left">{t('investigation.chest_lungs.shifted_left')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.heart_position && (
              <p className="text-sm text-red-500 mt-1">{errors.heart_position}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="heart_additional_findings">{t('investigation.chest_lungs.heart_additional_findings')}</Label>
          <Textarea
            id="heart_additional_findings"
            value={formData.heart_additional_findings || ''}
            onChange={(e) => onFieldChange('heart_additional_findings', e.target.value)}
            placeholder={t('investigation.chest_lungs.heart_additional_findings_placeholder')}
            rows={3}
            className={errors.heart_additional_findings ? 'border-red-500' : ''}
          />
          {errors.heart_additional_findings && (
            <p className="text-sm text-red-500 mt-1">{errors.heart_additional_findings}</p>
          )}
        </div>
      </div>

      {/* Additional Observations */}
      <div>
        <Label htmlFor="chest_lungs_additional_observations">{t('investigation.chest_lungs.additional_observations')}</Label>
        <Textarea
          id="chest_lungs_additional_observations"
          value={formData.chest_lungs_additional_observations || ''}
          onChange={(e) => onFieldChange('chest_lungs_additional_observations', e.target.value)}
          placeholder={t('investigation.chest_lungs.additional_observations_placeholder')}
          rows={3}
          className={errors.chest_lungs_additional_observations ? 'border-red-500' : ''}
        />
        {errors.chest_lungs_additional_observations && (
          <p className="text-sm text-red-500 mt-1">{errors.chest_lungs_additional_observations}</p>
        )}
      </div>
    </div>
  );
}
