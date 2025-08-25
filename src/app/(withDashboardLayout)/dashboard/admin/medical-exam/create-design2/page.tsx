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

const tabs: { id: MedSectionId; labelBn: string; labelEn: string }[] = [
  { id: 'header_facility', labelBn: 'হেডার/প্রতিষ্ঠান', labelEn: 'Header/Facility' },
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
  const tabsScrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({ institution_name: 'ফরেনসিক মেডিসিন বিভাগ', institution_address: 'ঢাকা মেডিকেল কলেজ, ঢাকা' });

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
  const saveDraft = () => { localStorage.setItem('medicalExamFormData_v2', JSON.stringify(formData)); toast({ title: language==='bn'?'খসড়া সংরক্ষিত':'Draft saved', description: language==='bn'?'ডেটা সংরক্ষণ করা হয়েছে':'Your data has been saved.' }); };

  const renderTabContent = () => {
    const common = { formData, onFieldChange } as any;
    switch (activeTab) {
      case 'header_facility': return <HeaderFacilitySection {...common} />;
      case 'consent': return <ConsentSection {...common} />;
      case 'logistics': return <LogisticsSection {...common} />;
      case 'narrative': return <NarrativeSection {...common} />;
      case 'general_exam': return <GeneralExamSection {...common} />;
      case 'injuries': return <InjuriesSection {...common} />;
      case 'sexual_assault': return <SexualAssaultSection {...common} />;
      case 'investigations': return <InvestigationsSection {...common} />;
      case 'treatment': return <TreatmentSection {...common} />;
      case 'examiner': return <ExaminerSection {...common} />;
      default: return <HeaderFacilitySection {...common} />;
    }
  };

  return (
    <div className="min-h-screen p-6 overflow-x-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">{language==='bn'?'মেডিকেল পরীক্ষা ফরম - ডিজাইন ২':'Medical Exam Form - Design 2'}</h1>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Button onClick={saveDraft} className="bg-blue-600 hover:bg-blue-700 text-white"><Save className="w-4 h-4 mr-2" />{language==='bn'?'খসড়া সংরক্ষণ':'Save Draft'}</Button>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <button onClick={()=>scrollTabs(-240)} className={`pointer-events-auto inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border shadow-sm hover:bg-gray-50 transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden={!canScrollLeft}>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <button onClick={()=>scrollTabs(240)} className={`pointer-events-auto inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border shadow-sm hover:bg-gray-50 transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden={!canScrollRight}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div ref={tabsScrollRef} className="overflow-hidden no-scrollbar w-full max-w-full">
            <ul className="flex flex-nowrap gap-2 text-sm font-medium pl-10 pr-10" role="tablist">
              {tabs.map((t) => {
                const { completed, total } = computeMedSectionProgress(t.id, formData);
                const isActive = activeTab === t.id;
                const base = isActive ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-sm' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
                return (
                  <li key={t.id} role="presentation" className="whitespace-nowrap max-w-none">
                    <button className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-colors truncate ${base}`} onClick={()=>setActiveTab(t.id)} type="button" role="tab" aria-controls={t.id} aria-selected={isActive}>
                      <span className="truncate max-w-[14ch]">{language==='bn'?t.labelBn:t.labelEn}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${isActive ? 'bg-white/30 border-white/40' : 'bg-white/80 border-black/10'}`}>{completed}/{total}</span>
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
            const { completed, total } = computeMedSectionProgress(activeTab, formData);
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


