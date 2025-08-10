import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface AbdomenSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function AbdomenSection({ formData, onFieldChange, errors }: AbdomenSectionProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Abdominal Examination */}
      <div className="border-b pb-4">
        <h4 className="text-lg font-semibold mb-4">{t('investigation.abdomen.abdominal_examination')}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="abdomen_shape">{t('investigation.abdomen.abdomen_shape')}</Label>
            <Select
              value={formData.abdomen_shape || ''}
              onValueChange={(value) => onFieldChange('abdomen_shape', value)}
            >
              <SelectTrigger className={errors.abdomen_shape ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.abdomen.select_abdomen_shape')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.abdomen.normal')}</SelectItem>
                <SelectItem value="distended">{t('investigation.abdomen.distended')}</SelectItem>
                <SelectItem value="scaphoid">{t('investigation.abdomen.scaphoid')}</SelectItem>
                <SelectItem value="asymmetrical">{t('investigation.abdomen.asymmetrical')}</SelectItem>
                <SelectItem value="deformed">{t('investigation.abdomen.deformed')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.abdomen_shape && (
              <p className="text-sm text-red-500 mt-1">{errors.abdomen_shape}</p>
            )}
          </div>
          <div>
            <Label htmlFor="abdomen_symmetry">{t('investigation.abdomen.abdomen_symmetry')}</Label>
            <Select
              value={formData.abdomen_symmetry || ''}
              onValueChange={(value) => onFieldChange('abdomen_symmetry', value)}
            >
              <SelectTrigger className={errors.abdomen_symmetry ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.abdomen.select_abdomen_symmetry')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="symmetrical">{t('investigation.abdomen.symmetrical')}</SelectItem>
                <SelectItem value="asymmetrical">{t('investigation.abdomen.asymmetrical')}</SelectItem>
                <SelectItem value="right_side_larger">{t('investigation.abdomen.right_side_larger')}</SelectItem>
                <SelectItem value="left_side_larger">{t('investigation.abdomen.left_side_larger')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.abdomen_symmetry && (
              <p className="text-sm text-red-500 mt-1">{errors.abdomen_symmetry}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="abdomen_injuries">{t('investigation.abdomen.abdomen_injuries')}</Label>
            <Select
              value={formData.abdomen_injuries || ''}
              onValueChange={(value) => onFieldChange('abdomen_injuries', value)}
            >
              <SelectTrigger className={errors.abdomen_injuries ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.abdomen.select_abdomen_injuries')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{t('investigation.abdomen.none')}</SelectItem>
                <SelectItem value="abrasion">{t('investigation.abdomen.abrasion')}</SelectItem>
                <SelectItem value="contusion">{t('investigation.abdomen.contusion')}</SelectItem>
                <SelectItem value="laceration">{t('investigation.abdomen.laceration')}</SelectItem>
                <SelectItem value="penetrating">{t('investigation.abdomen.penetrating')}</SelectItem>
                <SelectItem value="stab_wound">{t('investigation.abdomen.stab_wound')}</SelectItem>
                <SelectItem value="gunshot_wound">{t('investigation.abdomen.gunshot_wound')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.abdomen_injuries && (
              <p className="text-sm text-red-500 mt-1">{errors.abdomen_injuries}</p>
            )}
          </div>
          <div>
            <Label htmlFor="abdominal_wall">{t('investigation.abdomen.abdominal_wall')}</Label>
            <Select
              value={formData.abdominal_wall || ''}
              onValueChange={(value) => onFieldChange('abdominal_wall', value)}
            >
              <SelectTrigger className={errors.abdominal_wall ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.abdomen.select_abdominal_wall')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="intact">{t('investigation.abdomen.intact')}</SelectItem>
                <SelectItem value="lacerated">{t('investigation.abdomen.lacerated')}</SelectItem>
                <SelectItem value="contused">{t('investigation.abdomen.contused')}</SelectItem>
                <SelectItem value="perforated">{t('investigation.abdomen.perforated')}</SelectItem>
                <SelectItem value="herniated">{t('investigation.abdomen.herniated')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.abdominal_wall && (
              <p className="text-sm text-red-500 mt-1">{errors.abdominal_wall}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="abdomen_injuries_details">{t('investigation.abdomen.abdomen_injuries_details')}</Label>
          <Textarea
            id="abdomen_injuries_details"
            value={formData.abdomen_injuries_details || ''}
            onChange={(e) => onFieldChange('abdomen_injuries_details', e.target.value)}
            placeholder={t('investigation.abdomen.abdomen_injuries_details_placeholder')}
            rows={3}
            className={errors.abdomen_injuries_details ? 'border-red-500' : ''}
          />
          {errors.abdomen_injuries_details && (
            <p className="text-sm text-red-500 mt-1">{errors.abdomen_injuries_details}</p>
          )}
        </div>
      </div>

      {/* Liver Examination */}
      <div className="border-b pb-4">
        <h4 className="text-lg font-semibold mb-4">{t('investigation.abdomen.liver_examination')}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="liver_size">{t('investigation.abdomen.liver_size')}</Label>
            <Select
              value={formData.liver_size || ''}
              onValueChange={(value) => onFieldChange('liver_size', value)}
            >
              <SelectTrigger className={errors.liver_size ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.abdomen.select_liver_size')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.abdomen.normal')}</SelectItem>
                <SelectItem value="enlarged">{t('investigation.abdomen.enlarged')}</SelectItem>
                <SelectItem value="atrophied">{t('investigation.abdomen.atrophied')}</SelectItem>
                <SelectItem value="nodular">{t('investigation.abdomen.nodular')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.liver_size && (
              <p className="text-sm text-red-500 mt-1">{errors.liver_size}</p>
            )}
          </div>
          <div>
            <Label htmlFor="liver_consistency">{t('investigation.abdomen.liver_consistency')}</Label>
            <Select
              value={formData.liver_consistency || ''}
              onValueChange={(value) => onFieldChange('liver_consistency', value)}
            >
              <SelectTrigger className={errors.liver_consistency ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.abdomen.select_liver_consistency')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.abdomen.normal')}</SelectItem>
                <SelectItem value="soft">{t('investigation.abdomen.soft')}</SelectItem>
                <SelectItem value="firm">{t('investigation.abdomen.firm')}</SelectItem>
                <SelectItem value="hard">{t('investigation.abdomen.hard')}</SelectItem>
                <SelectItem value="nodular">{t('investigation.abdomen.nodular')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.liver_consistency && (
              <p className="text-sm text-red-500 mt-1">{errors.liver_consistency}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="liver_additional_findings">{t('investigation.abdomen.liver_additional_findings')}</Label>
          <Textarea
            id="liver_additional_findings"
            value={formData.liver_additional_findings || ''}
            onChange={(e) => onFieldChange('liver_additional_findings', e.target.value)}
            placeholder={t('investigation.abdomen.liver_additional_findings_placeholder')}
            rows={3}
            className={errors.liver_additional_findings ? 'border-red-500' : ''}
          />
          {errors.liver_additional_findings && (
            <p className="text-sm text-red-500 mt-1">{errors.liver_additional_findings}</p>
          )}
        </div>
      </div>

      {/* Spleen Examination */}
      <div className="border-b pb-4">
        <h4 className="text-lg font-semibold mb-4">{t('investigation.abdomen.spleen_examination')}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="spleen_size">{t('investigation.abdomen.spleen_size')}</Label>
            <Select
              value={formData.spleen_size || ''}
              onValueChange={(value) => onFieldChange('spleen_size', value)}
            >
              <SelectTrigger className={errors.spleen_size ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.abdomen.select_spleen_size')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.abdomen.normal')}</SelectItem>
                <SelectItem value="enlarged">{t('investigation.abdomen.enlarged')}</SelectItem>
                <SelectItem value="atrophied">{t('investigation.abdomen.atrophied')}</SelectItem>
                <SelectItem value="ruptured">{t('investigation.abdomen.ruptured')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.spleen_size && (
              <p className="text-sm text-red-500 mt-1">{errors.spleen_size}</p>
            )}
          </div>
          <div>
            <Label htmlFor="spleen_condition">{t('investigation.abdomen.spleen_condition')}</Label>
            <Select
              value={formData.spleen_condition || ''}
              onValueChange={(value) => onFieldChange('spleen_condition', value)}
            >
              <SelectTrigger className={errors.spleen_condition ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.abdomen.select_spleen_condition')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.abdomen.normal')}</SelectItem>
                <SelectItem value="congested">{t('investigation.abdomen.congested')}</SelectItem>
                <SelectItem value="pale">{t('investigation.abdomen.pale')}</SelectItem>
                <SelectItem value="infarcted">{t('investigation.abdomen.infarcted')}</SelectItem>
                <SelectItem value="ruptured">{t('investigation.abdomen.ruptured')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.spleen_condition && (
              <p className="text-sm text-red-500 mt-1">{errors.spleen_condition}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="spleen_additional_findings">{t('investigation.abdomen.spleen_additional_findings')}</Label>
          <Textarea
            id="spleen_additional_findings"
            value={formData.spleen_additional_findings || ''}
            onChange={(e) => onFieldChange('spleen_additional_findings', e.target.value)}
            placeholder={t('investigation.abdomen.spleen_additional_findings_placeholder')}
            rows={3}
            className={errors.spleen_additional_findings ? 'border-red-500' : ''}
          />
          {errors.spleen_additional_findings && (
            <p className="text-sm text-red-500 mt-1">{errors.spleen_additional_findings}</p>
          )}
        </div>
      </div>

      {/* Intestines Examination */}
      <div className="border-b pb-4">
        <h4 className="text-lg font-semibold mb-4">{t('investigation.abdomen.intestines_examination')}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="small_intestine">{t('investigation.abdomen.small_intestine')}</Label>
            <Select
              value={formData.small_intestine || ''}
              onValueChange={(value) => onFieldChange('small_intestine', value)}
            >
              <SelectTrigger className={errors.small_intestine ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.abdomen.select_small_intestine')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.abdomen.normal')}</SelectItem>
                <SelectItem value="dilated">{t('investigation.abdomen.dilated')}</SelectItem>
                <SelectItem value="perforated">{t('investigation.abdomen.perforated')}</SelectItem>
                <SelectItem value="obstructed">{t('investigation.abdomen.obstructed')}</SelectItem>
                <SelectItem value="gangrenous">{t('investigation.abdomen.gangrenous')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.small_intestine && (
              <p className="text-sm text-red-500 mt-1">{errors.small_intestine}</p>
            )}
          </div>
          <div>
            <Label htmlFor="large_intestine">{t('investigation.abdomen.large_intestine')}</Label>
            <Select
              value={formData.large_intestine || ''}
              onValueChange={(value) => onFieldChange('large_intestine', value)}
            >
              <SelectTrigger className={errors.large_intestine ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.abdomen.select_large_intestine')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.abdomen.normal')}</SelectItem>
                <SelectItem value="dilated">{t('investigation.abdomen.dilated')}</SelectItem>
                <SelectItem value="perforated">{t('investigation.abdomen.perforated')}</SelectItem>
                <SelectItem value="obstructed">{t('investigation.abdomen.obstructed')}</SelectItem>
                <SelectItem value="gangrenous">{t('investigation.abdomen.gangrenous')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.large_intestine && (
              <p className="text-sm text-red-500 mt-1">{errors.large_intestine}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="intestines_additional_findings">{t('investigation.abdomen.intestines_additional_findings')}</Label>
          <Textarea
            id="intestines_additional_findings"
            value={formData.intestines_additional_findings || ''}
            onChange={(e) => onFieldChange('intestines_additional_findings', e.target.value)}
            placeholder={t('investigation.abdomen.intestines_additional_findings_placeholder')}
            rows={3}
            className={errors.intestines_additional_findings ? 'border-red-500' : ''}
          />
          {errors.intestines_additional_findings && (
            <p className="text-sm text-red-500 mt-1">{errors.intestines_additional_findings}</p>
          )}
        </div>
      </div>

      {/* Peritoneal Cavity */}
      <div className="border-b pb-4">
        <h4 className="text-lg font-semibold mb-4">{t('investigation.abdomen.peritoneal_cavity')}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="peritoneal_fluid">{t('investigation.abdomen.peritoneal_fluid')}</Label>
            <Select
              value={formData.peritoneal_fluid || ''}
              onValueChange={(value) => onFieldChange('peritoneal_fluid', value)}
            >
              <SelectTrigger className={errors.peritoneal_fluid ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.abdomen.select_peritoneal_fluid')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{t('investigation.abdomen.none')}</SelectItem>
                <SelectItem value="clear">{t('investigation.abdomen.clear')}</SelectItem>
                <SelectItem value="bloody">{t('investigation.abdomen.bloody')}</SelectItem>
                <SelectItem value="purulent">{t('investigation.abdomen.purulent')}</SelectItem>
                <SelectItem value="fecal">{t('investigation.abdomen.fecal')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.peritoneal_fluid && (
              <p className="text-sm text-red-500 mt-1">{errors.peritoneal_fluid}</p>
            )}
          </div>
          <div>
            <Label htmlFor="peritoneal_fluid_volume">{t('investigation.abdomen.peritoneal_fluid_volume')} (ml)</Label>
            <Input
              id="peritoneal_fluid_volume"
              type="number"
              step="10"
              value={formData.peritoneal_fluid_volume || ''}
              onChange={(e) => onFieldChange('peritoneal_fluid_volume', e.target.value)}
              className={errors.peritoneal_fluid_volume ? 'border-red-500' : ''}
            />
            {errors.peritoneal_fluid_volume && (
              <p className="text-sm text-red-500 mt-1">{errors.peritoneal_fluid_volume}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="peritoneal_additional_findings">{t('investigation.abdomen.peritoneal_additional_findings')}</Label>
          <Textarea
            id="peritoneal_additional_findings"
            value={formData.peritoneal_additional_findings || ''}
            onChange={(e) => onFieldChange('peritoneal_additional_findings', e.target.value)}
            placeholder={t('investigation.abdomen.peritoneal_additional_findings_placeholder')}
            rows={3}
            className={errors.peritoneal_additional_findings ? 'border-red-500' : ''}
          />
          {errors.peritoneal_additional_findings && (
            <p className="text-sm text-red-500 mt-1">{errors.peritoneal_additional_findings}</p>
          )}
        </div>
      </div>

      {/* Additional Observations */}
      <div>
        <Label htmlFor="abdomen_additional_observations">{t('investigation.abdomen.additional_observations')}</Label>
        <Textarea
          id="abdomen_additional_observations"
          value={formData.abdomen_additional_observations || ''}
          onChange={(e) => onFieldChange('abdomen_additional_observations', e.target.value)}
          placeholder={t('investigation.abdomen.additional_observations_placeholder')}
          rows={3}
          className={errors.abdomen_additional_observations ? 'border-red-500' : ''}
        />
        {errors.abdomen_additional_observations && (
          <p className="text-sm text-red-500 mt-1">{errors.abdomen_additional_observations}</p>
        )}
      </div>
    </div>
  );
}
