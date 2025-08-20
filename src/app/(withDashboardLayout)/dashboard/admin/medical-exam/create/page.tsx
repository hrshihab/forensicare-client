'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { useToast } from '@/components/ui/use-toast';

type FormState = Record<string, any>;

const storageKey = 'medicalExamFormData_v1';

const Section = ({ titleBn, titleEn, children }: { titleBn: string; titleEn: string; children: React.ReactNode }) => {
  const { language } = useLanguage();
  return (
    <div className="bg-white border rounded-xl p-5 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">{language === 'bn' ? titleBn : titleEn}</h2>
      {children}
    </div>
  );
};

function CreateMedicalExamInner() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormState>({
    // A+B — Case Header + Facility (fixed values for institution/address)
    memo_no: '',
    date: '',
    source_thana: '',
    case_type: 'GD',
    case_no: '',
    institution_name: 'ফরেনসিক মেডিসিন বিভাগ',
    institution_address: 'ঢাকা মেডিকেল কলেজ, ঢাকা',
    // C — Victim Identity
    victim_name: '',
    age_years: '',
    gender: 'male',
    religion: '',
    occupation: '',
    guardian_name: '',
    address: '',
    // D — Consent & Attestation
    identifier_details: '',
    consent_given: false,
    signature_data_url: '',
    // E — Examination logistics
    exam_date: '',
    exam_time: '',
    female_attendant_info: '',
    // F — Narrative
    incident_narrative: '',
    // G — General exam
    build: '',
    height_cm: '',
    weight_kg: '',
    dental_arrangement: '',
    identifying_marks: '',
    // H — Injuries
    coercion_desc_a: '',
    coercion_desc_b: '',
    coercion_desc_c: '',
    acid_or_burn: '',
    injury_age: '',
    weapon_type: '',
    injury_nature: 'simple',
    mental_state: '',
    // I — Sexual Assault (conditional)
    is_sexual_assault_applicable: false,
    first_menses: '',
    cycle_duration: '',
    last_menses_date: '',
    marital_status: 'unmarried',
    child_or_last_child_age: '',
    axillary_hair: '',
    pubic_hair: '',
    breast_formation: 'undeveloped',
    breast_nature: 'soft',
    nipple: '',
    areola: '',
    abdomen_text: '',
    genital_vulva: '',
    genital_hymen: '',
    genital_vaginal_canal: '',
    genital_fourchette: '',
    genital_cervix: '',
    genital_rectum: '',
    // J — Investigations
    inv_xray: '',
    inv_ultrasound: '',
    inv_hvs_swab: '',
    inv_dna: '',
    inv_other: '',
    // K — Treatment & Disposition
    treatment_advice: '',
    discharge_date: '',
    discharge_time: '',
    referral_advice: '',
    opinion: '',
    // L — Examiner
    examiner_name: '',
    examiner_reg_no: '',
    examiner_code_no: '',
  });

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {}
  }, []);

  const onChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const saveDraft = () => {
    localStorage.setItem(storageKey, JSON.stringify(formData));
    toast({ title: language === 'bn' ? 'খসড়া সংরক্ষিত' : 'Draft saved', description: language === 'bn' ? 'আপনার ডেটা সংরক্ষণ করা হয়েছে' : 'Your data has been saved.' });
  };

  const Labeled = ({ id, labelBn, labelEn, children }: { id: string; labelBn: string; labelEn: string; children: React.ReactNode }) => (
    <div className="space-y-1">
      <Label htmlFor={id}>{language === 'bn' ? labelBn : labelEn}</Label>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{language === 'bn' ? 'সাধারণ তথ্য ও শারীরিক পরীক্ষা ফরম' : 'General Info & Physical Exam Form'}</h1>
          <p className="text-gray-600 text-sm">{language === 'bn' ? 'A+B, C, D, E, F, G, H, I, J, K একত্রে সাজানো' : 'Merged sections: A+B, C, D, E, F, G, H, I, J, K'}</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Button onClick={saveDraft} className="bg-blue-600 hover:bg-blue-700 text-white"><Save className="w-4 h-4 mr-2" />{language === 'bn' ? 'খসড়া সংরক্ষণ' : 'Save Draft'}</Button>
        </div>
      </div>

      {/* Section A+B — Case Header + Facility */}
      <Section titleBn="কেস হেডার ও প্রতিষ্ঠান" titleEn="Case Header & Facility">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Labeled id="memo_no" labelBn="স্বারক নং" labelEn="Memo No">
            <Input id="memo_no" value={formData.memo_no} onChange={(e) => onChange('memo_no', e.target.value)} />
          </Labeled>
          <Labeled id="date" labelBn="তারিখ" labelEn="Date">
            <Input id="date" type="date" value={formData.date} onChange={(e) => onChange('date', e.target.value)} />
          </Labeled>
          <div className="grid grid-cols-3 gap-2">
            <Labeled id="source_thana" labelBn="থানা" labelEn="Thana">
              <Input id="source_thana" value={formData.source_thana} onChange={(e) => onChange('source_thana', e.target.value)} />
            </Labeled>
            <Labeled id="case_type" labelBn="কেস টাইপ" labelEn="Case Type">
              <select id="case_type" className="border rounded-md h-10 px-2" value={formData.case_type} onChange={(e) => onChange('case_type', e.target.value)}>
                <option value="GD">GD</option>
                <option value="Case">Case</option>
                <option value="Others">Others</option>
              </select>
            </Labeled>
            <Labeled id="case_no" labelBn="নং" labelEn="No">
              <Input id="case_no" value={formData.case_no} onChange={(e) => onChange('case_no', e.target.value)} />
            </Labeled>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Labeled id="institution_name" labelBn="প্রতিষ্ঠানের নাম" labelEn="Institution Name">
            <Input id="institution_name" value={formData.institution_name} onChange={(e) => onChange('institution_name', e.target.value)} />
          </Labeled>
          <Labeled id="institution_address" labelBn="ঠিকানা" labelEn="Address">
            <Input id="institution_address" value={formData.institution_address} onChange={(e) => onChange('institution_address', e.target.value)} />
          </Labeled>
        </div>
      </Section>

      {/* Section C — Victim Identity */}
      <Section titleBn="ভিকটিম পরিচিতি" titleEn="Victim Identity">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Labeled id="victim_name" labelBn="ভিকটিমের নাম" labelEn="Victim Name"><Input id="victim_name" value={formData.victim_name} onChange={(e) => onChange('victim_name', e.target.value)} /></Labeled>
          <Labeled id="age_years" labelBn="বয়স (ভাষ্য মতে)" labelEn="Age (as stated)"><Input id="age_years" type="number" value={formData.age_years} onChange={(e) => onChange('age_years', e.target.value)} /></Labeled>
          <Labeled id="gender" labelBn="লিঙ্গ" labelEn="Gender">
            <div className="flex gap-4 h-10 items-center">
              {['male','female','other'].map(v => (
                <label key={v} className="inline-flex items-center gap-2"><input type="radio" name="gender" checked={formData.gender===v} onChange={() => onChange('gender', v)} />{language==='bn'? (v==='male'?'পুরুষ':v==='female'?'মহিলা':'অন্যান্য') : v}</label>
              ))}
            </div>
          </Labeled>
          <Labeled id="religion" labelBn="ধর্ম" labelEn="Religion"><Input id="religion" value={formData.religion} onChange={(e) => onChange('religion', e.target.value)} /></Labeled>
          <Labeled id="occupation" labelBn="পেশা" labelEn="Occupation"><Input id="occupation" value={formData.occupation} onChange={(e) => onChange('occupation', e.target.value)} /></Labeled>
          <Labeled id="guardian_name" labelBn="পিতা/মাতা/স্বামী" labelEn="Father/Mother/Spouse"><Input id="guardian_name" value={formData.guardian_name} onChange={(e) => onChange('guardian_name', e.target.value)} /></Labeled>
        </div>
        <Labeled id="address" labelBn="ঠিকানা" labelEn="Address"><Textarea id="address" value={formData.address} onChange={(e) => onChange('address', e.target.value)} /></Labeled>
      </Section>

      {/* Section D — Consent */}
      <Section titleBn="সম্মতি ও স্বাক্ষর" titleEn="Consent & Signature">
        <Labeled id="identifier_details" labelBn="সনাক্তকারী/আনয়নকারীর নাম ও ঠিকানা" labelEn="Identifier/Bringer details"><Textarea id="identifier_details" value={formData.identifier_details} onChange={(e) => onChange('identifier_details', e.target.value)} /></Labeled>
        <div className="flex items-center gap-3">
          <input id="consent_given" type="checkbox" checked={formData.consent_given} onChange={(e) => onChange('consent_given', e.target.checked)} />
          <Label htmlFor="consent_given">{language==='bn'?'সম্মতি প্রদান করা হয়েছে':'Consent given'}</Label>
        </div>
        <div className="text-sm text-gray-600">{language==='bn'?'স্বাক্ষর প্যাড পরে যুক্ত হবে':'Signature pad to be integrated later'}</div>
      </Section>

      {/* Section E — Logistics */}
      <Section titleBn="পরীক্ষার সময়সূচি" titleEn="Examination Logistics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Labeled id="exam_date" labelBn="তারিখ" labelEn="Date"><Input id="exam_date" type="date" value={formData.exam_date} onChange={(e) => onChange('exam_date', e.target.value)} /></Labeled>
          <Labeled id="exam_time" labelBn="সময়" labelEn="Time"><Input id="exam_time" type="time" value={formData.exam_time} onChange={(e) => onChange('exam_time', e.target.value)} /></Labeled>
          <Labeled id="female_attendant_info" labelBn="মহিলা সহকারীর নাম ও ঠিকানা" labelEn="Female attendant details"><Input id="female_attendant_info" value={formData.female_attendant_info} onChange={(e) => onChange('female_attendant_info', e.target.value)} /></Labeled>
        </div>
      </Section>

      {/* Section F — Incident Narrative */}
      <Section titleBn="ঘটনার সংক্ষিপ্ত বিবরণ" titleEn="Incident Narrative">
        <Textarea value={formData.incident_narrative} onChange={(e) => onChange('incident_narrative', e.target.value)} rows={4} />
      </Section>

      {/* Section G — General Physical Exam */}
      <Section titleBn="সাধারণ শারীরিক পরীক্ষা" titleEn="General Physical Examination">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Labeled id="build" labelBn="দৈহিক গঠন" labelEn="Build"><Input id="build" value={formData.build} onChange={(e) => onChange('build', e.target.value)} /></Labeled>
          <Labeled id="height_cm" labelBn="উচ্চতা (cm)" labelEn="Height (cm)"><Input id="height_cm" type="number" value={formData.height_cm} onChange={(e) => onChange('height_cm', e.target.value)} /></Labeled>
          <Labeled id="weight_kg" labelBn="ওজন (kg)" labelEn="Weight (kg)"><Input id="weight_kg" type="number" value={formData.weight_kg} onChange={(e) => onChange('weight_kg', e.target.value)} /></Labeled>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Labeled id="dental_arrangement" labelBn="দন্ত বিন্যাস" labelEn="Dental arrangement"><Textarea id="dental_arrangement" value={formData.dental_arrangement} onChange={(e) => onChange('dental_arrangement', e.target.value)} /></Labeled>
          <Labeled id="identifying_marks" labelBn="সনাক্তকরণ চিহ্ন" labelEn="Identifying marks"><Textarea id="identifying_marks" value={formData.identifying_marks} onChange={(e) => onChange('identifying_marks', e.target.value)} /></Labeled>
        </div>
      </Section>

      {/* Section H — Injuries */}
      <Section titleBn="জখম/জবরদস্তির বর্ণনা" titleEn="Injuries & Coercion">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Labeled id="coercion_desc_a" labelBn="বর্ণনা (ক)" labelEn="Description (a)"><Textarea id="coercion_desc_a" value={formData.coercion_desc_a} onChange={(e) => onChange('coercion_desc_a', e.target.value)} /></Labeled>
          <Labeled id="coercion_desc_b" labelBn="বর্ণনা (খ)" labelEn="Description (b)"><Textarea id="coercion_desc_b" value={formData.coercion_desc_b} onChange={(e) => onChange('coercion_desc_b', e.target.value)} /></Labeled>
          <Labeled id="coercion_desc_c" labelBn="বর্ণনা (গ)" labelEn="Description (c)"><Textarea id="coercion_desc_c" value={formData.coercion_desc_c} onChange={(e) => onChange('coercion_desc_c', e.target.value)} /></Labeled>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <Labeled id="acid_or_burn" labelBn="এসিড/অগ্নিদগ্ধ" labelEn="Acid/Burn"><Input id="acid_or_burn" value={formData.acid_or_burn} onChange={(e) => onChange('acid_or_burn', e.target.value)} /></Labeled>
          <Labeled id="injury_age" labelBn="জখমের বয়স" labelEn="Injury age"><Input id="injury_age" value={formData.injury_age} onChange={(e) => onChange('injury_age', e.target.value)} /></Labeled>
          <Labeled id="weapon_type" labelBn="অস্ত্রের ধরণ" labelEn="Weapon type"><Input id="weapon_type" value={formData.weapon_type} onChange={(e) => onChange('weapon_type', e.target.value)} /></Labeled>
          <Labeled id="injury_nature" labelBn="জখমের প্রকৃতি" labelEn="Nature of injury">
            <div className="flex gap-4 h-10 items-center">
              {[
                { v: 'simple', bn: 'সাধারণ জখম', en: 'Simple' },
                { v: 'grievous', bn: 'মারাত্মক জখম', en: 'Grievous' },
              ].map((opt) => (
                <label key={opt.v} className="inline-flex items-center gap-2"><input type="radio" name="injury_nature" checked={formData.injury_nature===opt.v} onChange={() => onChange('injury_nature', opt.v)} />{language==='bn'?opt.bn:opt.en}</label>
              ))}
            </div>
          </Labeled>
        </div>
        <Labeled id="mental_state" labelBn="ভিকটিমের মানসিক অবস্থা" labelEn="Victim mental state"><Textarea id="mental_state" value={formData.mental_state} onChange={(e) => onChange('mental_state', e.target.value)} /></Labeled>
      </Section>

      {/* Section I — Sexual Assault (conditional) */}
      <Section titleBn="যৌন নির্যাতন সংক্রান্ত" titleEn="Sexual assault (if applicable)">
        <div className="flex items-center gap-3 mb-3">
          <input id="is_sa" type="checkbox" checked={formData.is_sexual_assault_applicable} onChange={(e)=>onChange('is_sexual_assault_applicable', e.target.checked)} />
          <Label htmlFor="is_sa">{language==='bn'?'প্রযোজ্য':'Applicable'}</Label>
        </div>
        {formData.is_sexual_assault_applicable && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Labeled id="first_menses" labelBn="প্রথম মাসিক" labelEn="First menstruation"><Input id="first_menses" value={formData.first_menses} onChange={(e)=>onChange('first_menses', e.target.value)} /></Labeled>
              <Labeled id="cycle_duration" labelBn="ঋতুচক্রের সময়কাল" labelEn="Cycle duration"><Input id="cycle_duration" value={formData.cycle_duration} onChange={(e)=>onChange('cycle_duration', e.target.value)} /></Labeled>
              <Labeled id="last_menses_date" labelBn="শেষ মাসিক" labelEn="Last menstruation"><Input id="last_menses_date" type="date" value={formData.last_menses_date} onChange={(e)=>onChange('last_menses_date', e.target.value)} /></Labeled>
              <Labeled id="marital_status" labelBn="বৈবাহিক অবস্থা" labelEn="Marital status">
                <div className="flex gap-4 h-10 items-center">
                  {[
                    { v: 'unmarried', bn: 'অবিবাহিতা', en: 'Unmarried' },
                    { v: 'married', bn: 'বিবাহিতা', en: 'Married' },
                    { v: 'widowed', bn: 'বিধবা', en: 'Widowed' },
                  ].map((opt) => (
                    <label key={opt.v} className="inline-flex items-center gap-2"><input type="radio" name="marital_status" checked={formData.marital_status===opt.v} onChange={()=>onChange('marital_status', opt.v)} />{language==='bn'?opt.bn:opt.en}</label>
                  ))}
                </div>
              </Labeled>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Labeled id="child_or_last_child_age" labelBn="সন্তান/শেষ সন্তানের বয়স" labelEn="Child / Last child age"><Input id="child_or_last_child_age" value={formData.child_or_last_child_age} onChange={(e)=>onChange('child_or_last_child_age', e.target.value)} /></Labeled>
              <Labeled id="axillary_hair" labelBn="বগলের কেশ" labelEn="Axillary hair"><Textarea id="axillary_hair" value={formData.axillary_hair} onChange={(e)=>onChange('axillary_hair', e.target.value)} /></Labeled>
              <Labeled id="pubic_hair" labelBn="যোনীদেশের কেশ" labelEn="Pubic hair"><Textarea id="pubic_hair" value={formData.pubic_hair} onChange={(e)=>onChange('pubic_hair', e.target.value)} /></Labeled>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Labeled id="breast_formation" labelBn="স্তনের গঠন" labelEn="Breast formation">
                <div className="flex gap-4 h-10 items-center">
                  {[
                    { v: 'undeveloped', bn: 'এখনও গঠিত নহে', en: 'Undeveloped' },
                    { v: 'developed', bn: 'গঠিত হয়েছে', en: 'Developed' },
                    { v: 'well', bn: 'সুগঠিত', en: 'Well-developed' },
                  ].map((opt) => (
                    <label key={opt.v} className="inline-flex items-center gap-2"><input type="radio" name="breast_formation" checked={formData.breast_formation===opt.v} onChange={()=>onChange('breast_formation', opt.v)} />{language==='bn'?opt.bn:opt.en}</label>
                  ))}
                </div>
              </Labeled>
              <Labeled id="breast_nature" labelBn="স্তনের প্রকৃতি" labelEn="Breast nature">
                <div className="flex gap-4 h-10 items-center">
                  {[
                    { v: 'soft', bn: 'নরম', en: 'Soft' },
                    { v: 'firm', bn: 'শক্ত', en: 'Firm' },
                    { v: 'elastic', bn: 'স্থিতিস্থাপক', en: 'Elastic' },
                  ].map((opt) => (
                    <label key={opt.v} className="inline-flex items-center gap-2"><input type="radio" name="breast_nature" checked={formData.breast_nature===opt.v} onChange={()=>onChange('breast_nature', opt.v)} />{language==='bn'?opt.bn:opt.en}</label>
                  ))}
                </div>
              </Labeled>
              <div className="grid grid-cols-2 gap-4">
                <Labeled id="nipple" labelBn="স্তনবৃন্ত" labelEn="Nipple"><Textarea id="nipple" value={formData.nipple} onChange={(e)=>onChange('nipple', e.target.value)} /></Labeled>
                <Labeled id="areola" labelBn="স্তনমন্ডল" labelEn="Areola"><Textarea id="areola" value={formData.areola} onChange={(e)=>onChange('areola', e.target.value)} /></Labeled>
              </div>
            </div>
            <Labeled id="abdomen_text" labelBn="পেট (Abdomen)" labelEn="Abdomen"><Textarea id="abdomen_text" value={formData.abdomen_text} onChange={(e)=>onChange('abdomen_text', e.target.value)} /></Labeled>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Labeled id="genital_vulva" labelBn="বহিঃযৌনাঙ্গ (Valva)" labelEn="External genitalia (Vulva)"><Textarea id="genital_vulva" value={formData.genital_vulva} onChange={(e)=>onChange('genital_vulva', e.target.value)} /></Labeled>
              <Labeled id="genital_hymen" labelBn="সতীচ্ছেদ (Hymen)" labelEn="Hymen"><Textarea id="genital_hymen" value={formData.genital_hymen} onChange={(e)=>onChange('genital_hymen', e.target.value)} /></Labeled>
              <Labeled id="genital_vaginal_canal" labelBn="যোনী পথ (Vaginal Canal)" labelEn="Vaginal canal"><Textarea id="genital_vaginal_canal" value={formData.genital_vaginal_canal} onChange={(e)=>onChange('genital_vaginal_canal', e.target.value)} /></Labeled>
              <Labeled id="genital_fourchette" labelBn="যোনী বেড় (Fourchette)" labelEn="Fourchette"><Textarea id="genital_fourchette" value={formData.genital_fourchette} onChange={(e)=>onChange('genital_fourchette', e.target.value)} /></Labeled>
              <Labeled id="genital_cervix" labelBn="জরায়ু গ্রীবামুখ (Cervix)" labelEn="Cervix"><Textarea id="genital_cervix" value={formData.genital_cervix} onChange={(e)=>onChange('genital_cervix', e.target.value)} /></Labeled>
              <Labeled id="genital_rectum" labelBn="পায়ুমুখ (Rectum)" labelEn="Rectum"><Textarea id="genital_rectum" value={formData.genital_rectum} onChange={(e)=>onChange('genital_rectum', e.target.value)} /></Labeled>
            </div>
          </div>
        )}
      </Section>

      {/* Section J — Investigations */}
      <Section titleBn="বিভিন্ন পরীক্ষা" titleEn="Investigations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Labeled id="inv_xray" labelBn="এক্সরে পরীক্ষা" labelEn="X-ray"><Textarea id="inv_xray" value={formData.inv_xray} onChange={(e)=>onChange('inv_xray', e.target.value)} /></Labeled>
          <Labeled id="inv_ultrasound" labelBn="আল্ট্রাসোনোগ্রাফি" labelEn="Ultrasonography"><Textarea id="inv_ultrasound" value={formData.inv_ultrasound} onChange={(e)=>onChange('inv_ultrasound', e.target.value)} /></Labeled>
          <Labeled id="inv_hvs_swab" labelBn="ভেজাইনাল সোয়াব (HVS)/অন্যান্য" labelEn="Vaginal/Other swabs"><Textarea id="inv_hvs_swab" value={formData.inv_hvs_swab} onChange={(e)=>onChange('inv_hvs_swab', e.target.value)} /></Labeled>
          <Labeled id="inv_dna" labelBn="ডি.এন.এ পরীক্ষা" labelEn="DNA test"><Textarea id="inv_dna" value={formData.inv_dna} onChange={(e)=>onChange('inv_dna', e.target.value)} /></Labeled>
          <Labeled id="inv_other" labelBn="অন্যান্য পরীক্ষা" labelEn="Other tests"><Textarea id="inv_other" value={formData.inv_other} onChange={(e)=>onChange('inv_other', e.target.value)} /></Labeled>
        </div>
      </Section>

      {/* Section K — Treatment & Disposition */}
      <Section titleBn="চিকিৎসা ও অবমুক্তি" titleEn="Treatment & Disposition">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Labeled id="treatment_advice" labelBn="প্রদত্ত চিকিৎসা/পরামর্শ" labelEn="Treatment/Advice"><Textarea id="treatment_advice" value={formData.treatment_advice} onChange={(e)=>onChange('treatment_advice', e.target.value)} /></Labeled>
          <div className="grid grid-cols-2 gap-4">
            <Labeled id="discharge_date" labelBn="অবমুক্তির তারিখ" labelEn="Discharge date"><Input id="discharge_date" type="date" value={formData.discharge_date} onChange={(e)=>onChange('discharge_date', e.target.value)} /></Labeled>
            <Labeled id="discharge_time" labelBn="অবমুক্তির সময়" labelEn="Discharge time"><Input id="discharge_time" type="time" value={formData.discharge_time} onChange={(e)=>onChange('discharge_time', e.target.value)} /></Labeled>
          </div>
          <Labeled id="referral_advice" labelBn="রেফারেলের পরামর্শ" labelEn="Referral advice"><Textarea id="referral_advice" value={formData.referral_advice} onChange={(e)=>onChange('referral_advice', e.target.value)} /></Labeled>
          <Labeled id="opinion" labelBn="মতামত" labelEn="Opinion"><Textarea id="opinion" value={formData.opinion} onChange={(e)=>onChange('opinion', e.target.value)} /></Labeled>
        </div>
      </Section>

      {/* Section L — Examiner */}
      <Section titleBn="পরীক্ষাকারী চিকিৎসকের বিবরণ" titleEn="Examiner details">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Labeled id="examiner_name" labelBn="চিকিৎসকের নাম" labelEn="Doctor name"><Input id="examiner_name" value={formData.examiner_name} onChange={(e)=>onChange('examiner_name', e.target.value)} /></Labeled>
          <Labeled id="examiner_reg_no" labelBn="রেজিঃ নং" labelEn="Registration no."><Input id="examiner_reg_no" value={formData.examiner_reg_no} onChange={(e)=>onChange('examiner_reg_no', e.target.value)} /></Labeled>
          <Labeled id="examiner_code_no" labelBn="কোড নং" labelEn="Code no."><Input id="examiner_code_no" value={formData.examiner_code_no} onChange={(e)=>onChange('examiner_code_no', e.target.value)} /></Labeled>
        </div>
      </Section>
    </div>
  );
}

export default function CreateMedicalExamPage() {
  return (
    <LanguageProvider>
      <CreateMedicalExamInner />
    </LanguageProvider>
  );
}


