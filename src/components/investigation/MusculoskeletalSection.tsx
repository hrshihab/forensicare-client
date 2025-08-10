import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';

interface MusculoskeletalSectionProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  errors: Record<string, string>;
}

export default function MusculoskeletalSection({ formData, onFieldChange, errors }: MusculoskeletalSectionProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Upper Limbs Examination */}
      <div className="border-b pb-4">
        <h4 className="text-lg font-semibold mb-4">{t('investigation.musculoskeletal.upper_limbs_examination')}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="right_arm">{t('investigation.musculoskeletal.right_arm')}</Label>
            <Select
              value={formData.right_arm || ''}
              onValueChange={(value) => onFieldChange('right_arm', value)}
            >
              <SelectTrigger className={errors.right_arm ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_right_arm')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.musculoskeletal.fractured')}</SelectItem>
                <SelectItem value="dislocated">{t('investigation.musculoskeletal.dislocated')}</SelectItem>
                <SelectItem value="lacerated">{t('investigation.musculoskeletal.lacerated')}</SelectItem>
                <SelectItem value="amputated">{t('investigation.musculoskeletal.amputated')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.right_arm && (
              <p className="text-sm text-red-500 mt-1">{errors.right_arm}</p>
            )}
          </div>
          <div>
            <Label htmlFor="left_arm">{t('investigation.musculoskeletal.left_arm')}</Label>
            <Select
              value={formData.left_arm || ''}
              onValueChange={(value) => onFieldChange('left_arm', value)}
            >
              <SelectTrigger className={errors.left_arm ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_left_arm')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.musculoskeletal.fractured')}</SelectItem>
                <SelectItem value="dislocated">{t('investigation.musculoskeletal.dislocated')}</SelectItem>
                <SelectItem value="lacerated">{t('investigation.musculoskeletal.lacerated')}</SelectItem>
                <SelectItem value="amputated">{t('investigation.musculoskeletal.amputated')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.left_arm && (
              <p className="text-sm text-red-500 mt-1">{errors.left_arm}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="right_forearm">{t('investigation.musculoskeletal.right_forearm')}</Label>
            <Select
              value={formData.right_forearm || ''}
              onValueChange={(value) => onFieldChange('right_forearm', value)}
            >
              <SelectTrigger className={errors.right_forearm ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_right_forearm')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.musculoskeletal.fractured')}</SelectItem>
                <SelectItem value="dislocated">{t('investigation.musculoskeletal.dislocated')}</SelectItem>
                <SelectItem value="lacerated">{t('investigation.musculoskeletal.lacerated')}</SelectItem>
                <SelectItem value="amputated">{t('investigation.musculoskeletal.amputated')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.right_forearm && (
              <p className="text-sm text-red-500 mt-1">{errors.right_forearm}</p>
            )}
          </div>
          <div>
            <Label htmlFor="left_forearm">{t('investigation.musculoskeletal.left_forearm')}</Label>
            <Select
              value={formData.left_forearm || ''}
              onValueChange={(value) => onFieldChange('left_forearm', value)}
            >
              <SelectTrigger className={errors.left_forearm ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_left_forearm')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.musculoskeletal.fractured')}</SelectItem>
                <SelectItem value="dislocated">{t('investigation.musculoskeletal.dislocated')}</SelectItem>
                <SelectItem value="lacerated">{t('investigation.musculoskeletal.lacerated')}</SelectItem>
                <SelectItem value="amputated">{t('investigation.musculoskeletal.amputated')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.left_forearm && (
              <p className="text-sm text-red-500 mt-1">{errors.left_forearm}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="right_hand">{t('investigation.musculoskeletal.right_hand')}</Label>
            <Select
              value={formData.right_hand || ''}
              onValueChange={(value) => onFieldChange('right_hand', value)}
            >
              <SelectTrigger className={errors.right_hand ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_right_hand')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.musculoskeletal.fractured')}</SelectItem>
                <SelectItem value="lacerated">{t('investigation.musculoskeletal.lacerated')}</SelectItem>
                <SelectItem value="amputated">{t('investigation.musculoskeletal.amputated')}</SelectItem>
                <SelectItem value="missing_fingers">{t('investigation.musculoskeletal.missing_fingers')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.right_hand && (
              <p className="text-sm text-red-500 mt-1">{errors.right_hand}</p>
            )}
          </div>
          <div>
            <Label htmlFor="left_hand">{t('investigation.musculoskeletal.left_hand')}</Label>
            <Select
              value={formData.left_hand || ''}
              onValueChange={(value) => onFieldChange('left_hand', value)}
            >
              <SelectTrigger className={errors.left_hand ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_left_hand')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.musculoskeletal.fractured')}</SelectItem>
                <SelectItem value="lacerated">{t('investigation.musculoskeletal.lacerated')}</SelectItem>
                <SelectItem value="amputated">{t('investigation.musculoskeletal.amputated')}</SelectItem>
                <SelectItem value="missing_fingers">{t('investigation.musculoskeletal.missing_fingers')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.left_hand && (
              <p className="text-sm text-red-500 mt-1">{errors.left_hand}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="upper_limbs_details">{t('investigation.musculoskeletal.upper_limbs_details')}</Label>
          <Textarea
            id="upper_limbs_details"
            value={formData.upper_limbs_details || ''}
            onChange={(e) => onFieldChange('upper_limbs_details', e.target.value)}
            placeholder={t('investigation.musculoskeletal.upper_limbs_details_placeholder')}
            rows={3}
            className={errors.upper_limbs_details ? 'border-red-500' : ''}
          />
          {errors.upper_limbs_details && (
            <p className="text-sm text-red-500 mt-1">{errors.upper_limbs_details}</p>
          )}
        </div>
      </div>

      {/* Lower Limbs Examination */}
      <div className="border-b pb-4">
        <h4 className="text-lg font-semibold mb-4">{t('investigation.musculoskeletal.lower_limbs_examination')}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="right_thigh">{t('investigation.musculoskeletal.right_thigh')}</Label>
            <Select
              value={formData.right_thigh || ''}
              onValueChange={(value) => onFieldChange('right_thigh', value)}
            >
              <SelectTrigger className={errors.right_thigh ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_right_thigh')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.musculoskeletal.fractured')}</SelectItem>
                <SelectItem value="lacerated">{t('investigation.musculoskeletal.lacerated')}</SelectItem>
                <SelectItem value="amputated">{t('investigation.musculoskeletal.amputated')}</SelectItem>
                <SelectItem value="muscle_damage">{t('investigation.musculoskeletal.muscle_damage')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.right_thigh && (
              <p className="text-sm text-red-500 mt-1">{errors.right_thigh}</p>
            )}
          </div>
          <div>
            <Label htmlFor="left_thigh">{t('investigation.musculoskeletal.left_thigh')}</Label>
            <Select
              value={formData.left_thigh || ''}
              onValueChange={(value) => onFieldChange('left_thigh', value)}
            >
              <SelectTrigger className={errors.left_thigh ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_left_thigh')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.musculoskeletal.fractured')}</SelectItem>
                <SelectItem value="lacerated">{t('investigation.musculoskeletal.lacerated')}</SelectItem>
                <SelectItem value="amputated">{t('investigation.musculoskeletal.amputated')}</SelectItem>
                <SelectItem value="muscle_damage">{t('investigation.musculoskeletal.muscle_damage')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.left_thigh && (
              <p className="text-sm text-red-500 mt-1">{errors.left_thigh}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="right_leg">{t('investigation.musculoskeletal.right_leg')}</Label>
            <Select
              value={formData.right_leg || ''}
              onValueChange={(value) => onFieldChange('right_leg', value)}
            >
              <SelectTrigger className={errors.right_leg ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_right_leg')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.musculoskeletal.fractured')}</SelectItem>
                <SelectItem value="lacerated">{t('investigation.musculoskeletal.lacerated')}</SelectItem>
                <SelectItem value="amputated">{t('investigation.musculoskeletal.amputated')}</SelectItem>
                <SelectItem value="muscle_damage">{t('investigation.musculoskeletal.muscle_damage')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.right_leg && (
              <p className="text-sm text-red-500 mt-1">{errors.right_leg}</p>
            )}
          </div>
          <div>
            <Label htmlFor="left_leg">{t('investigation.musculoskeletal.left_leg')}</Label>
            <Select
              value={formData.left_leg || ''}
              onValueChange={(value) => onFieldChange('left_leg', value)}
            >
              <SelectTrigger className={errors.left_leg ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_left_leg')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.musculoskeletal.fractured')}</SelectItem>
                <SelectItem value="lacerated">{t('investigation.musculoskeletal.lacerated')}</SelectItem>
                <SelectItem value="amputated">{t('investigation.musculoskeletal.amputated')}</SelectItem>
                <SelectItem value="muscle_damage">{t('investigation.musculoskeletal.muscle_damage')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.left_leg && (
              <p className="text-sm text-red-500 mt-1">{errors.left_leg}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="right_foot">{t('investigation.musculoskeletal.right_foot')}</Label>
            <Select
              value={formData.right_foot || ''}
              onValueChange={(value) => onFieldChange('right_foot', value)}
            >
              <SelectTrigger className={errors.right_foot ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_right_foot')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.musculoskeletal.fractured')}</SelectItem>
                <SelectItem value="lacerated">{t('investigation.musculoskeletal.lacerated')}</SelectItem>
                <SelectItem value="amputated">{t('investigation.musculoskeletal.amputated')}</SelectItem>
                <SelectItem value="missing_toes">{t('investigation.musculoskeletal.missing_toes')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.right_foot && (
              <p className="text-sm text-red-500 mt-1">{errors.right_foot}</p>
            )}
          </div>
          <div>
            <Label htmlFor="left_foot">{t('investigation.musculoskeletal.left_foot')}</Label>
            <Select
              value={formData.left_foot || ''}
              onValueChange={(value) => onFieldChange('left_foot', value)}
            >
              <SelectTrigger className={errors.left_foot ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_left_foot')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.musculoskeletal.fractured')}</SelectItem>
                <SelectItem value="lacerated">{t('investigation.musculoskeletal.lacerated')}</SelectItem>
                <SelectItem value="amputated">{t('investigation.musculoskeletal.amputated')}</SelectItem>
                <SelectItem value="missing_toes">{t('investigation.musculoskeletal.missing_toes')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.left_foot && (
              <p className="text-sm text-red-500 mt-1">{errors.left_foot}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="lower_limbs_details">{t('investigation.musculoskeletal.lower_limbs_details')}</Label>
          <Textarea
            id="lower_limbs_details"
            value={formData.lower_limbs_details || ''}
            onChange={(e) => onFieldChange('lower_limbs_details', e.target.value)}
            placeholder={t('investigation.musculoskeletal.lower_limbs_details_placeholder')}
            rows={3}
            className={errors.lower_limbs_details ? 'border-red-500' : ''}
          />
          {errors.lower_limbs_details && (
            <p className="text-sm text-red-500 mt-1">{errors.lower_limbs_details}</p>
          )}
        </div>
      </div>

      {/* Joints Examination */}
      <div className="border-b pb-4">
        <h4 className="text-lg font-semibold mb-4">{t('investigation.musculoskeletal.joints_examination')}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="shoulder_joints">{t('investigation.musculoskeletal.shoulder_joints')}</Label>
            <Select
              value={formData.shoulder_joints || ''}
              onValueChange={(value) => onFieldChange('shoulder_joints', value)}
            >
              <SelectTrigger className={errors.shoulder_joints ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_shoulder_joints')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="dislocated">{t('investigation.musculoskeletal.dislocated')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.musculoskeletal.fractured')}</SelectItem>
                <SelectItem value="arthritic">{t('investigation.musculoskeletal.arthritic')}</SelectItem>
                <SelectItem value="stiff">{t('investigation.musculoskeletal.stiff')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.shoulder_joints && (
              <p className="text-sm text-red-500 mt-1">{errors.shoulder_joints}</p>
            )}
          </div>
          <div>
            <Label htmlFor="hip_joints">{t('investigation.musculoskeletal.hip_joints')}</Label>
            <Select
              value={formData.hip_joints || ''}
              onValueChange={(value) => onFieldChange('hip_joints', value)}
            >
              <SelectTrigger className={errors.hip_joints ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_hip_joints')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="dislocated">{t('investigation.musculoskeletal.dislocated')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.musculoskeletal.fractured')}</SelectItem>
                <SelectItem value="arthritic">{t('investigation.musculoskeletal.arthritic')}</SelectItem>
                <SelectItem value="stiff">{t('investigation.musculoskeletal.stiff')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.hip_joints && (
              <p className="text-sm text-red-500 mt-1">{errors.hip_joints}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="knee_joints">{t('investigation.musculoskeletal.knee_joints')}</Label>
            <Select
              value={formData.knee_joints || ''}
              onValueChange={(value) => onFieldChange('knee_joints', value)}
            >
              <SelectTrigger className={errors.knee_joints ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_knee_joints')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="dislocated">{t('investigation.musculoskeletal.dislocated')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.musculoskeletal.fractured')}</SelectItem>
                <SelectItem value="arthritic">{t('investigation.musculoskeletal.arthritic')}</SelectItem>
                <SelectItem value="stiff">{t('investigation.musculoskeletal.stiff')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.knee_joints && (
              <p className="text-sm text-red-500 mt-1">{errors.knee_joints}</p>
            )}
          </div>
          <div>
            <Label htmlFor="ankle_joints">{t('investigation.musculoskeletal.ankle_joints')}</Label>
            <Select
              value={formData.ankle_joints || ''}
              onValueChange={(value) => onFieldChange('ankle_joints', value)}
            >
              <SelectTrigger className={errors.ankle_joints ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_ankle_joints')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="dislocated">{t('investigation.musculoskeletal.dislocated')}</SelectItem>
                <SelectItem value="fractured">{t('investigation.musculoskeletal.fractured')}</SelectItem>
                <SelectItem value="arthritic">{t('investigation.musculoskeletal.arthritic')}</SelectItem>
                <SelectItem value="stiff">{t('investigation.musculoskeletal.stiff')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.ankle_joints && (
              <p className="text-sm text-red-500 mt-1">{errors.ankle_joints}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="joints_additional_findings">{t('investigation.musculoskeletal.joints_additional_findings')}</Label>
          <Textarea
            id="joints_additional_findings"
            value={formData.joints_additional_findings || ''}
            onChange={(e) => onFieldChange('joints_additional_findings', e.target.value)}
            placeholder={t('investigation.musculoskeletal.joints_additional_findings_placeholder')}
            rows={3}
            className={errors.joints_additional_findings ? 'border-red-500' : ''}
          />
          {errors.joints_additional_findings && (
            <p className="text-sm text-red-500 mt-1">{errors.joints_additional_findings}</p>
          )}
        </div>
      </div>

      {/* Muscles Examination */}
      <div className="border-b pb-4">
        <h4 className="text-lg font-semibold mb-4">{t('investigation.musculoskeletal.muscles_examination')}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="muscle_tone">{t('investigation.musculoskeletal.muscle_tone')}</Label>
            <Select
              value={formData.muscle_tone || ''}
              onValueChange={(value) => onFieldChange('muscle_tone', value)}
            >
              <SelectTrigger className={errors.muscle_tone ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_muscle_tone')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="increased">{t('investigation.musculoskeletal.increased')}</SelectItem>
                <SelectItem value="decreased">{t('investigation.musculoskeletal.decreased')}</SelectItem>
                <SelectItem value="flaccid">{t('investigation.musculoskeletal.flaccid')}</SelectItem>
                <SelectItem value="rigid">{t('investigation.musculoskeletal.rigid')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.muscle_tone && (
              <p className="text-sm text-red-500 mt-1">{errors.muscle_tone}</p>
            )}
          </div>
          <div>
            <Label htmlFor="muscle_bulk">{t('investigation.musculoskeletal.muscle_bulk')}</Label>
            <Select
              value={formData.muscle_bulk || ''}
              onValueChange={(value) => onFieldChange('muscle_bulk', value)}
            >
              <SelectTrigger className={errors.muscle_bulk ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('investigation.musculoskeletal.select_muscle_bulk')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">{t('investigation.musculoskeletal.normal')}</SelectItem>
                <SelectItem value="atrophied">{t('investigation.musculoskeletal.atrophied')}</SelectItem>
                <SelectItem value="hypertrophied">{t('investigation.musculoskeletal.hypertrophied')}</SelectItem>
                <SelectItem value="wasted">{t('investigation.musculoskeletal.wasted')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.muscle_bulk && (
              <p className="text-sm text-red-500 mt-1">{errors.muscle_bulk}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="muscles_additional_findings">{t('investigation.musculoskeletal.muscles_additional_findings')}</Label>
          <Textarea
            id="muscles_additional_findings"
            value={formData.muscles_additional_findings || ''}
            onChange={(e) => onFieldChange('muscles_additional_findings', e.target.value)}
            placeholder={t('investigation.musculoskeletal.muscles_additional_findings_placeholder')}
            rows={3}
            className={errors.muscles_additional_findings ? 'border-red-500' : ''}
          />
          {errors.muscles_additional_findings && (
            <p className="text-sm text-red-500 mt-1">{errors.muscles_additional_findings}</p>
          )}
        </div>
      </div>

      {/* Additional Observations */}
      <div>
        <Label htmlFor="musculoskeletal_additional_observations">{t('investigation.musculoskeletal.additional_observations')}</Label>
        <Textarea
          id="musculoskeletal_additional_observations"
          value={formData.musculoskeletal_additional_observations || ''}
          onChange={(e) => onFieldChange('musculoskeletal_additional_observations', e.target.value)}
          placeholder={t('investigation.musculoskeletal.additional_observations_placeholder')}
          rows={3}
          className={errors.musculoskeletal_additional_observations ? 'border-red-500' : ''}
        />
        {errors.musculoskeletal_additional_observations && (
          <p className="text-sm text-red-500 mt-1">{errors.musculoskeletal_additional_observations}</p>
        )}
      </div>
    </div>
  );
}
