export type AnyRecord = Record<string, any>;

export function toNestedReport(flat: AnyRecord): AnyRecord {
  if (!flat || typeof flat !== 'object') return flat;

  const nested: AnyRecord = {
    id: flat.id,
    createdAt: flat.createdAt,
    updatedAt: flat.updatedAt,
    status: flat.status ?? 'draft',
    // submission/lock metadata
    locked: flat.locked ?? (flat.status === 'submitted'),
    lockedAt: flat.lockedAt,
    lockedBy: flat.lockedBy,
    lockReason: flat.lockReason,
    submittedAt: flat.submittedAt,
    submittedBy: flat.submittedBy,
    createdBy: flat.createdBy,
    updatedBy: flat.updatedBy,
    audit: Array.isArray(flat.audit) ? flat.audit : [],
    header: {
      thana_id: flat.thana_id,
      case_type: flat.case_type,
      gd_cid_case_no: flat.gd_cid_case_no,
      ref_date: flat.ref_date,
      pm_no: flat.pm_no,
      report_date: flat.report_date,
      station: flat.station,
    },
    general: {
      person_name: flat.person_name,
      gender: flat.gender,
      age_years: flat.age_years,
      caste_tribe: flat.caste_tribe,
      brought_from_village: flat.brought_from_village,
      brought_from_thana: flat.brought_from_thana,
      constable_name: flat.constable_name,
      relatives_names: flat.relatives_names,
      sent_datetime: flat.sent_datetime,
      brought_datetime: flat.brought_datetime,
      exam_datetime: flat.exam_datetime,
      police_info: flat.police_info,
      identifier_name: flat.identifier_name,
    },
    external_signs: {
      physique_state: flat.physique_state,
      wounds_desc: flat.wounds_desc,
      injuries_desc: flat.injuries_desc,
      neck_marks: flat.neck_marks,
    },
    head_spine: {
      scalp: flat.scalp,
      skull: flat.skull,
      vertebrae: flat.vertebrae,
      meninges: flat.meninges,
      brain: flat.brain,
      spinal_cord: flat.spinal_cord,
    },
    chest_lungs: {
      ribs_cartilage: flat.ribs_cartilage,
      pleura: flat.pleura,
      larynx: flat.larynx,
      trachea: flat.trachea,
      right_lung: flat.right_lung,
      left_lung: flat.left_lung,
      pericardium: flat.pericardium,
      heart: flat.heart,
      blood_vessels: flat.blood_vessels,
    },
    abdomen: {
      abdominal_general: flat.abdominal_general,
      peritoneum: flat.peritoneum,
      mouth_trachea_esophagus: flat.mouth_trachea_esophagus,
      stomach_and_contents: flat.stomach_and_contents,
      small_intestine_and_contents: flat.small_intestine_and_contents,
      large_intestine_and_contents: flat.large_intestine_and_contents,
      liver: flat.liver,
      spleen: flat.spleen,
      kidneys: flat.kidneys,
      urinary_bladder: flat.urinary_bladder,
      genital_organs: flat.genital_organs,
    },
    musculoskeletal: {
      ms_wounds: flat.ms_wounds,
      ms_disease_variations: flat.ms_disease_variations,
      fractures: flat.fractures,
      dislocations: flat.dislocations,
    },
    detailed_pathology: {
      pathology_description: flat.pathology_description,
    },
    opinions: {
      medical_officer_opinion: flat.medical_officer_opinion,
      civil_surgeon_remark: flat.civil_surgeon_remark,
    },
  };

  return nested;
}

export function toFlatForm(nested: AnyRecord): AnyRecord {
  if (!nested || typeof nested !== 'object') return nested;
  const flat: AnyRecord = { ...nested };

  const header = nested.header ?? {};
  const general = nested.general ?? {};
  const external_signs = nested.external_signs ?? {};
  const head_spine = nested.head_spine ?? {};
  const chest_lungs = nested.chest_lungs ?? {};
  const abdomen = nested.abdomen ?? {};
  const ms = nested.musculoskeletal ?? {};
  const detailed = nested.detailed_pathology ?? {};
  const opinions = nested.opinions ?? {};

  return {
    id: nested.id,
    createdAt: nested.createdAt,
    updatedAt: nested.updatedAt,
    status: nested.status,
    // submission/lock metadata
    locked: nested.locked ?? (nested.status === 'submitted'),
    lockedAt: nested.lockedAt,
    lockedBy: nested.lockedBy,
    lockReason: nested.lockReason,
    submittedAt: nested.submittedAt,
    submittedBy: nested.submittedBy,
    createdBy: nested.createdBy,
    updatedBy: nested.updatedBy,
    audit: Array.isArray(nested.audit) ? nested.audit : [],
    // header
    thana_id: header.thana_id,
    case_type: header.case_type,
    gd_cid_case_no: header.gd_cid_case_no,
    ref_date: header.ref_date,
    pm_no: header.pm_no,
    report_date: header.report_date,
    station: header.station,
    // general
    person_name: general.person_name,
    gender: general.gender,
    age_years: general.age_years,
    caste_tribe: general.caste_tribe,
    brought_from_village: general.brought_from_village,
    brought_from_thana: general.brought_from_thana,
    constable_name: general.constable_name,
    relatives_names: general.relatives_names,
    sent_datetime: general.sent_datetime,
    brought_datetime: general.brought_datetime,
    exam_datetime: general.exam_datetime,
    police_info: general.police_info,
    identifier_name: general.identifier_name,
    // external signs
    physique_state: external_signs.physique_state,
    wounds_desc: external_signs.wounds_desc,
    injuries_desc: external_signs.injuries_desc,
    neck_marks: external_signs.neck_marks,
    // head & spine
    scalp: head_spine.scalp,
    skull: head_spine.skull,
    vertebrae: head_spine.vertebrae,
    meninges: head_spine.meninges,
    brain: head_spine.brain,
    spinal_cord: head_spine.spinal_cord,
    // chest & lungs
    ribs_cartilage: chest_lungs.ribs_cartilage,
    pleura: chest_lungs.pleura,
    larynx: chest_lungs.larynx,
    trachea: chest_lungs.trachea,
    right_lung: chest_lungs.right_lung,
    left_lung: chest_lungs.left_lung,
    pericardium: chest_lungs.pericardium,
    heart: chest_lungs.heart,
    blood_vessels: chest_lungs.blood_vessels,
    // abdomen
    abdominal_general: abdomen.abdominal_general,
    peritoneum: abdomen.peritoneum,
    mouth_trachea_esophagus: abdomen.mouth_trachea_esophagus,
    stomach_and_contents: abdomen.stomach_and_contents,
    small_intestine_and_contents: abdomen.small_intestine_and_contents,
    large_intestine_and_contents: abdomen.large_intestine_and_contents,
    liver: abdomen.liver,
    spleen: abdomen.spleen,
    kidneys: abdomen.kidneys,
    urinary_bladder: abdomen.urinary_bladder,
    genital_organs: abdomen.genital_organs,
    // ms
    ms_wounds: ms.ms_wounds,
    ms_disease_variations: ms.ms_disease_variations,
    fractures: ms.fractures,
    dislocations: ms.dislocations,
    // detailed pathology
    pathology_description: detailed.pathology_description,
    // opinions
    medical_officer_opinion: opinions.medical_officer_opinion,
    civil_surgeon_remark: opinions.civil_surgeon_remark,
  };
}


