export interface PostmortemReport {
  id?: string;
  // lifecycle
  status?: 'draft' | 'submitted';
  locked?: boolean;
  lockedAt?: string;
  lockedBy?: string;
  rejectionFeedback?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;

  // header
  pm_no: string;
  thana: string;
  gd_ud_case_no: string;
  case_type: 'none' | 'GD' | 'UD' | 'CASE';
  ref_date: string;
  report_date: string;
  station: string;

  
  // General Info
  person_name: string;
  gender: 'male' | 'female' | 'other';
  age_years: number;
  caste_tribe?: string;
  brought_from_village?: string;
  brought_from_thana?: string;

  // Current UI fields
  constable_name?: string;
  relatives_names?: string[];
  sent_datetime: string;
  brought_datetime: string;
  exam_datetime: string;
  police_info: string;
  identifier_name: string;
  
  // External Signs
  physique_state?: string;
  wounds_injuries_neck_desc?: string;
  //injuries_desc?: string;
  //neck_marks?: string;
  
  // Head & Spine
  scalp?: string;
  skull?: string;
  vertebrae?: string;
  meninges?: string;
  brain_spinal?: string;
  
  // Chest & Lungs
  ribs_cartilage?: string;
  pleura?: string;
  larynx_trachea_bronchi?: string;
  right_lung?: string;
  left_lung?: string;
  pericardium?: string;
  heart?: string;
  blood_vessels?: string;
  
  // Abdomen
  abdominal_general?: string;
  peritoneum?: string;
  mouth_trachea_esophagus?: string;
  stomach_and_contents?: string;
  small_intestine_and_contents?: string;
  large_intestine_and_contents?: string;
  liver?: string;
  spleen?: string;
  kidneys?: string;
  urinary_bladder?: string;
  genital_organs?: string;
  
  // Musculoskeletal
  ms_wounds?: string;
  ms_disease_variations?: string;
  fractures?: string;
  dislocations?: string;
  detailed_pathology?: string;
  
  // Opinions
  medical_officer_opinion: string;
  civil_surgeon_remark?: string;
  
  // Attachments & Sign-off
  attachments?: File[];
  sign_datetime: string;
  officer_name: string;
  officer_designation: string;
  civil_name?: string;
  civil_signature_attachment?: File;
  
  // Meta
  skip_status?: 'none' | 'optional_skipped' | 'required_skipped';
  skip_reason?: string;
  section_status?: 'done' | 'in_progress' | 'error' | 'skipped';
  created_by?: string; 
  created_at?: string; 
  updated_by?: string; 
  updated_at?: string; 
  version_no?: number;
}

export interface GeoLocation {
  id: string;
  name_bn: string;
  name_en: string;
}

export interface Division extends GeoLocation {}

export interface District extends GeoLocation {
  division_id: string;
}

export interface Thana extends GeoLocation {
  district_id: string;
}

export interface FormSection {
  id: string;
  title: string;
  title_bn: string;
  isOpen: boolean;
  status: 'done' | 'in_progress' | 'error' | 'skipped' | 'not_started';
  required: boolean;
}
