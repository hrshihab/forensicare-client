// Shared utilities for section field lists, progress, and status
// Keep logic DRY across pages/components

export type SectionId =
  | 'header'
  | 'general'
  | 'external_signs'
  | 'head_spine'
  | 'chest_lungs'
  | 'abdomen'
  | 'musculoskeletal'
  | 'detailed_pathology'
  | 'opinions';

export type SectionStatus = 'not_started' | 'in_progress' | 'done' | 'error';

type ComputeProgressOptions = {
  // For GeneralSection local UX: pending relative typed but not yet added
  newRelativeName?: string;
};

// Which sections are required for overall completion on both designs
const REQUIRED_SECTIONS: Record<SectionId, boolean> = {
  header: true,
  general: true,
  external_signs: false,
  head_spine: false,
  chest_lungs: false,
  abdomen: false,
  musculoskeletal: false,
  detailed_pathology: false,
  opinions: true,
};

export const getSectionFields = (sectionId: SectionId): string[] => {
  switch (sectionId) {
    case 'header':
      return ['thana_id', 'gd_cid_case_no', 'ref_date', 'pm_no', 'report_date', 'station', 'case_type'];
    case 'general':
      // Exactly 12 required fields used by GeneralSection UI
      return [
        'person_name',
        'gender',
        'age_years',
        'brought_from_village',
        'brought_from_thana',
        'constable_name',
        'relatives_names',
        'sent_datetime',
        'brought_datetime',
        'exam_datetime',
        'identifier_name',
        'police_info',
      ];
    case 'external_signs':
      return ['physique_state', 'wounds_desc', 'injuries_desc', 'neck_marks'];
    case 'head_spine':
      return ['scalp', 'skull', 'vertebrae', 'meninges', 'brain', 'spinal_cord'];
    case 'chest_lungs':
      return ['ribs_cartilage', 'pleura', 'larynx', 'trachea', 'right_lung', 'left_lung', 'pericardium', 'heart', 'blood_vessels'];
    case 'abdomen':
      return [
        'abdominal_general',
        'peritoneum',
        'mouth_trachea_esophagus',
        'stomach_and_contents',
        'small_intestine_and_contents',
        'large_intestine_and_contents',
        'liver',
        'spleen',
        'kidneys',
        'urinary_bladder',
        'genital_organs',
      ];
    case 'musculoskeletal':
      // Design 2 shows five inputs inside Musculoskeletal; the last one
      // reuses the global detailed pathology field key (pathology_description)
      // to keep a single source of truth in the persisted shape.
      return ['ms_wounds', 'ms_disease_variations', 'fractures', 'dislocations', 'pathology_description'];
    case 'detailed_pathology':
      return ['pathology_description'];
    case 'opinions':
      return ['medical_officer_opinion', 'civil_surgeon_remark'];
    default:
      return [];
  }
};

const isMeaningfullyFilled = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return !Number.isNaN(value);
  if (typeof value === 'object') return true; // non-empty object or File
  return false;
};

export const computeSectionProgress = (
  sectionId: SectionId,
  formData: Record<string, any>,
  options?: ComputeProgressOptions
): { completed: number; total: number } => {
  const fields = getSectionFields(sectionId);

  // Baseline: total is number of required fields for most sections
  let totalForDisplay = fields.length;
  let completed = 0;

  for (const field of fields) {
    if (sectionId === 'general' && field === 'relatives_names') {
      const hasExisting = Array.isArray(formData.relatives_names) && formData.relatives_names.length > 0;
      const hasPending = (options?.newRelativeName ?? '').toString().trim().length > 0;
      if (hasExisting || hasPending) completed += 1;
      continue;
    }
    if (isMeaningfullyFilled(formData[field])) completed += 1;
  }

  // Special display logic for general: 12 required + 1 optional = 13 total
  if (sectionId === 'general') {
    totalForDisplay = 13;
    if (isMeaningfullyFilled(formData.caste_tribe)) {
      completed += 1; // count optional for display only
    }
  }

  return { completed, total: totalForDisplay };
};

export const computeSectionStatus = (
  sectionId: SectionId,
  formData: Record<string, any>,
  errors: Record<string, string>
): SectionStatus => {
  const fields = getSectionFields(sectionId);

  // Any error among relevant fields => error
  const hasErrors = fields.some((f) => Boolean(errors?.[f]));
  if (hasErrors) return 'error';

  // Compute required completion (exclude optional caste_tribe)
  let completedRequired = 0;
  for (const field of fields) {
    if (field === 'relatives_names') {
      if (Array.isArray(formData.relatives_names) && formData.relatives_names.length > 0) {
        completedRequired += 1;
      }
      continue;
    }
    if (isMeaningfullyFilled(formData[field])) completedRequired += 1;
  }
  const totalRequired = fields.length;

  if (completedRequired === 0) return 'not_started';
  if (completedRequired === totalRequired) return 'done';
  return 'in_progress';
};


