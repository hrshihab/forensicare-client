'use client';

import React, { useEffect, useRef, useState } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Save, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { LanguageToggle } from '@/components/LanguageToggle';
import HeaderFacilitySection from '@/components/medical-exam/HeaderFacilitySection';
import ConsentSection from '@/components/medical-exam/ConsentSection';
import LogisticsSection from '@/components/medical-exam/LogisticsSection';
import NarrativeSection from '@/components/medical-exam/NarrativeSection';
import GeneralExamSection from '@/components/medical-exam/GeneralExamSection';
import InjuriesSection from '@/components/medical-exam/InjuriesSection';
import SexualAssaultSection from '@/components/medical-exam/SexualAssaultSection';
import InvestigationsSection from '@/components/medical-exam/InvestigationsSection';
import TreatmentSection from '@/components/medical-exam/TreatmentSection';
import ExaminerSection from '@/components/medical-exam/ExaminerSection';
import { computeMedSectionProgress, MedSectionId } from '@/utils/medical-exam-progress';
import SectionHeader from '@/components/ui/section-header';
import { FileText, User, CheckSquare, Clock, AlignLeft, Activity, Shield, Heart, Search } from 'lucide-react';
import { useUpsertMedicalReportMutation } from '@/redux/api/postApis';
import { useHeaderFacility } from '@/hooks/useHeaderFacility';

const tabs: { id: MedSectionId; labelBn: string; labelEn: string }[] = [
  { id: 'header_facility', labelBn: 'সাধারণ তথ্য', labelEn: 'General Data' },
  { id: 'consent', labelBn: 'সম্মতি', labelEn: 'Consent' },
  { id: 'logistics', labelBn: 'সময়সূচি', labelEn: 'Logistics' },
  { id: 'narrative', labelBn: 'ঘটনা', labelEn: 'Narrative' },
  { id: 'general_exam', labelBn: 'শারীরিক পরীক্ষা', labelEn: 'General Exam' },
  { id: 'injuries', labelBn: 'জখম', labelEn: 'Injuries' },
  { id: 'sexual_assault', labelBn: 'যৌন নির্যাতন', labelEn: 'Sexual Assault' },
  { id: 'investigations', labelBn: 'পরীক্ষাসমূহ', labelEn: 'Investigations' },
  { id: 'treatment', labelBn: 'চিকিৎসা', labelEn: 'Treatment' },
  { id: 'examiner', labelBn: 'চিকিৎসক', labelEn: 'Examiner' },
];

function Inner() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<MedSectionId>('header_facility');
  const [upsertMedicalReport] = useUpsertMedicalReportMutation();
  const tabsScrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({ institution_name: 'ফরেনসিক মেডিসিন বিভাগ', institution_address: 'ঢাকা মেডিকেল কলেজ, ঢাকা' });
  const [isClient, setIsClient] = useState(false);
  
  // Get header facility data from Redux
  const { data: headerFacilityData, loadFromStorage } = useHeaderFacility();

  // Load data from storage on mount
  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateScrollState = () => {
    const el = tabsScrollRef.current; if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const needsScroll = scrollWidth - clientWidth > 2;
    setCanScrollLeft(needsScroll && scrollLeft > 1);
    setCanScrollRight(needsScroll && scrollLeft + clientWidth < scrollWidth - 1);
  };
  const scrollTabs = (delta: number) => { const el = tabsScrollRef.current; if (el) { el.scrollBy({ left: delta, behavior: 'smooth' }); setTimeout(updateScrollState, 220); } };

  useEffect(() => {
    updateScrollState();
    const el = tabsScrollRef.current; if (!el) return;
    const onScroll = () => updateScrollState();
    el.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => updateScrollState();
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(() => updateScrollState());
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    return () => { el.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); ro.disconnect(); };
  }, []);

  const onFieldChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
  
  const saveDraft = () => {
    // Save both local form data and Redux header facility data
    localStorage.setItem('medicalExamFormData_v2', JSON.stringify(formData));
    localStorage.setItem('headerFacilityData', JSON.stringify(headerFacilityData));
    toast({ title: language==='bn'?'খসড়া সংরক্ষিত':'Draft saved', description: language==='bn'?'ডেটা সংরক্ষণ করা হয়েছে':'Your data has been saved.' });
  };

  const saveLocalJson = async () => {
    const id = (headerFacilityData as any)?.id || `${Date.now()}`;
    const flat = {
      id,
      // Map fields from headerFacilityData into the API flat shape (minimal header/general)
      thana_id: headerFacilityData.source_thana || '',
      case_type: 'case',
      gd_cid_case_no: headerFacilityData.case_no || '',
      ref_date: headerFacilityData.case_issue_date || headerFacilityData.date || '',
      pm_no: headerFacilityData.memo_no || '',
      report_date: headerFacilityData.date || '',
      station: headerFacilityData.institution_name || '',
      person_name: headerFacilityData.victim_name || '',
      gender: headerFacilityData.victim_gender || '',
      age_years: headerFacilityData.victim_age || '',
      caste_tribe: headerFacilityData.victim_religion || '',
      brought_from_village: headerFacilityData.victim_address || '',
      brought_from_thana: headerFacilityData.source_thana || '',
      constable_name: '',
      relatives_names: headerFacilityData.guardian_name || '',
      sent_datetime: '',
      brought_datetime: '',
      exam_datetime: '',
      police_info: '',
      identifier_name: headerFacilityData.identifier_name || '',
      status: 'draft',
    } as any;
    try {
      const resp = await upsertMedicalReport(flat).unwrap();
      if (resp) {
        toast({ title: language==='bn'?'সার্ভারে সংরক্ষিত':'Saved to server' });
      } else {
        toast({ title: 'Save failed', description: 'No response' });
      }
    } catch (e: any) {
      toast({ title: 'Error', description: e?.message || String(e) });
    }
  };

  // Status-based color functions for tabs (matching investigation design2)
  const getStatusColor = (status: string, isActive: boolean) => {
    if (isActive) {
      return 'bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white border-transparent shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300';
    }
    if (status === 'done') {
      return 'bg-gradient-to-r from-emerald-50 via-emerald-100 to-teal-50 text-emerald-800 border-emerald-200/60 hover:from-emerald-100 hover:via-emerald-200 hover:to-teal-100 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all duration-300';
    }
    if (status === 'in_progress') {
      return 'bg-gradient-to-r from-amber-50 via-orange-100 to-yellow-50 text-amber-800 border-amber-200/60 hover:from-amber-100 hover:via-orange-200 hover:to-yellow-100 hover:border-amber-300 shadow-sm hover:shadow-md transition-all duration-300';
    }
    return 'bg-gradient-to-r from-slate-50 via-gray-100 to-zinc-50 text-gray-700 border-gray-200/60 hover:from-gray-100 hover:via-slate-200 hover:to-zinc-100 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300';
  };

  const getTabStatus = (completed: number, total: number) => {
    if (completed === 0) return 'not_started';
    if (completed === total) return 'done';
    return 'in_progress';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'header_facility': return <HeaderFacilitySection />;
      case 'consent': return <ConsentSection formData={formData} onFieldChange={onFieldChange} />;
      case 'logistics': return <LogisticsSection formData={formData} onFieldChange={onFieldChange} />;
      case 'narrative': return <NarrativeSection formData={formData} onFieldChange={onFieldChange} />;
      case 'general_exam': return <GeneralExamSection formData={formData} onFieldChange={onFieldChange} />;
      case 'injuries': return <InjuriesSection formData={formData} onFieldChange={onFieldChange} />;
      case 'sexual_assault': return <SexualAssaultSection formData={formData} onFieldChange={onFieldChange} />;
      case 'investigations': return <InvestigationsSection formData={formData} onFieldChange={onFieldChange} />;
      case 'treatment': return <TreatmentSection formData={formData} onFieldChange={onFieldChange} />;
      case 'examiner': return <ExaminerSection formData={formData} onFieldChange={onFieldChange} />;
      default: return <HeaderFacilitySection />;
    }
  };

  return (
    <div className="min-h-screen p-6 overflow-x-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">{language==='bn'?'মেডিকেল পরীক্ষা ফরম - ডিজাইন ২':'Medical Exam Form - Design 2'}</h1>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Button onClick={saveDraft} className="bg-blue-600 hover:bg-blue-700 text-white"><Save className="w-4 h-4 mr-2" />{language==='bn'?'খসড়া সংরক্ষণ':'Save Draft'}</Button>
          <Button onClick={saveLocalJson} className="bg-emerald-600 hover:bg-emerald-700 text-white">{language==='bn'?'JSON এ সংরক্ষণ':'Save to JSON'}</Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-50/50 to-blue-50/30 rounded-xl px-4 py-2 border border-slate-100/50">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <button onClick={()=>scrollTabs(-240)} className={`pointer-events-auto inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/60 shadow-lg hover:bg-white hover:shadow-xl hover:border-slate-300 transition-all duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden={!canScrollLeft}>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <button onClick={()=>scrollTabs(240)} className={`pointer-events-auto inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/60 shadow-lg hover:bg-white hover:shadow-xl hover:border-slate-300 transition-all duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden={!canScrollRight}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div ref={tabsScrollRef} className="overflow-hidden no-scrollbar w-full max-w-full">
            <ul className="flex flex-nowrap gap-2 text-sm font-medium pl-10 pr-10 py-1" role="tablist">
              {tabs.map((t) => {
                const progressData = t.id === 'header_facility' ? headerFacilityData : formData;
                const { completed, total } = isClient ? computeMedSectionProgress(t.id, progressData) : { completed: 0, total: 0 } as any;
                const status = getTabStatus(completed, total);
                const isActive = activeTab === t.id;
                return (
                  <li key={t.id} role="presentation" className="whitespace-nowrap max-w-none">
                    <button className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 truncate ${isActive ? getStatusColor(status, true) : getStatusColor(status, false)}`} onClick={()=>setActiveTab(t.id)} type="button" role="tab" aria-controls={t.id} aria-selected={isActive}>
                      <span className="truncate max-w-[12ch]">{language==='bn'?t.labelBn:t.labelEn}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${isActive ? 'bg-white/20 text-white border border-white/30' : 'bg-white/90 text-gray-700 border border-gray-200/40 shadow-sm'}`}>{completed}/{total}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 space-y-6">
          {/* Section-style header matching Investigation Design 2 */}
          {(() => {
            const progressData = activeTab === 'header_facility' ? headerFacilityData : formData;
            const { completed, total } = isClient ? computeMedSectionProgress(activeTab, progressData) : { completed: 0, total: 0 } as any;
            const label = tabs.find(t => t.id === activeTab);
            const title = language==='bn'?label?.labelBn:label?.labelEn;
            const icons: Partial<Record<MedSectionId, any>> = {
              header_facility: FileText,
              consent: CheckSquare,
              logistics: Clock,
              narrative: AlignLeft,
              general_exam: Activity,
              injuries: Shield,
              sexual_assault: Heart,
              investigations: Search,
              treatment: Activity,
              examiner: User,
            };
            const Icon = icons[activeTab] || FileText;
            return (
              <SectionHeader
                icon={Icon}
                iconBgColor="bg-indigo-100"
                iconColor="text-indigo-600"
                title={title || ''}
                description={language==='bn'?'এই সেকশনের প্রয়োজনীয় তথ্য পূরণ করুন':'Fill the required information in this section'}
                completedFields={completed}
                totalFields={total}
                progressVariant="purple"
                progressSize="medium"
              />
            );
          })()}

          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default function CreateMedicalExamDesign2Page() {
  return (
    <LanguageProvider>
      <Inner />
    </LanguageProvider>
  );
}


