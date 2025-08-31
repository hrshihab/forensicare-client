// Section progress helpers for Medical Exam Design 2

export type MedSectionId =
  | 'header_facility'
  | 'consent'
  | 'logistics'
  | 'narrative'
  | 'general_exam'
  | 'injuries'
  | 'sexual_assault'
  | 'investigations'
  | 'treatment'
  | 'examiner';

export const getMedSectionFields = (id: MedSectionId): string[] => {
  switch (id) {
    case 'header_facility':
      // Do not count fixed institution fields towards progress
      // Now includes victim identity fields - Total 16 fields
      return [
        'memo_no',
        'date', 
        'source_thana',
        'case_type',
        'case_no',
        'case_issue_date',
        'victim_name',
        'victim_age',
        'victim_gender', 
        'victim_religion',
        'victim_occupation',
        'guardian_type',
        'guardian_name',
        'victim_address',
        'identifier_name',
        'identifier_address'
      ];
    case 'consent':
      return ['identifier_details','consent_given'];
    case 'logistics':
      return ['exam_date','exam_time','female_attendant_info'];
    case 'narrative':
      return ['incident_narrative'];
    case 'general_exam':
      return ['build','height_cm','weight_kg','dental_arrangement','identifying_marks'];
    case 'injuries':
      return ['coercion_desc_a','coercion_desc_b','coercion_desc_c','acid_or_burn','injury_age','weapon_type','injury_nature','mental_state'];
    case 'sexual_assault':
      // Only counted if applicable flag is true; compute function will handle that
      return [
        'first_menses','cycle_duration','last_menses_date','marital_status','child_or_last_child_age',
        'axillary_hair','pubic_hair','breast_formation','breast_nature','nipple','areola','abdomen_text',
        'genital_vulva','genital_hymen','genital_vaginal_canal','genital_fourchette','genital_cervix','genital_rectum'
      ];
    case 'investigations':
      return ['inv_xray','inv_ultrasound','inv_hvs_swab','inv_dna','inv_other'];
    case 'treatment':
      return ['treatment_advice','discharge_date','discharge_time','referral_advice','opinion'];
    case 'examiner':
      return ['examiner_name','examiner_reg_no','examiner_code_no'];
    default:
      return [];
  }
};

const isMeaningful = (v: unknown): boolean => {
  if (v === null || v === undefined) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === 'string') return v.trim().length > 0;
  if (typeof v === 'number') return !Number.isNaN(v);
  if (typeof v === 'boolean') return v === true;
  if (typeof v === 'object') return true;
  return false;
};

export const computeMedSectionProgress = (
  id: MedSectionId,
  data: Record<string, any>
): { completed: number; total: number } => {
  const fields = getMedSectionFields(id);
  if (id === 'sexual_assault' && !data?.is_sexual_assault_applicable) {
    return { completed: 0, total: fields.length };
  }
  let completed = 0;
  for (const f of fields) if (isMeaningful(data?.[f])) completed += 1;
  return { completed, total: fields.length };
};


