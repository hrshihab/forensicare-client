'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { HeaderSection } from '@/components/investigation/HeaderSection';
import { GeneralSection } from '@/components/investigation/GeneralSection';
import ExternalSignsSection from '@/components/investigation/ExternalSignsSection';
import HeadSpineSection from '@/components/investigation/HeadSpineSection';
import ChestLungsSection from '@/components/investigation/ChestLungsSection';
import AbdomenSection from '@/components/investigation/AbdomenSection';
import MusculoskeletalSection from '@/components/investigation/MusculoskeletalSection';
import { DetailedPathologySection } from '@/components/investigation/DetailedPathologySection';
import { OpinionsSection } from '@/components/investigation/OpinionsSection';
import { Button } from '@/components/ui/button';
import { Save, Eye, Printer, Lock, Unlock, ChevronLeft, ChevronRight } from 'lucide-react';
import { PostmortemReport } from '@/types/postmortem';
import { computeSectionProgress } from '@/utils/section-progress';
import { useSaveLocalReportMutation, useGetLocalReportByIdQuery, useSubmitLocalReportMutation, useUnlockLocalReportMutation } from '@/redux/api/reportApis';
import { toFlatForm } from '@/utils/report-shape';
import useUserInfo from '@/hooks/useUserInfo';
import { useGetUserInfoQuery } from '@/redux/api/getApis';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState as useReactState } from 'react';

// Tab configuration with language support
const tabs = [
  { 
    id: 'header', 
    labelEn: 'Header', 
    labelBn: 'হেডিং',
    component: 'HeaderSection' 
  },
  { 
    id: 'general', 
    labelEn: 'General', 
    labelBn: 'সাধারণ',
    component: 'GeneralSection' 
  },
  { 
    id: 'external_signs', 
    labelEn: 'External Signs', 
    labelBn: 'বাহ্যিক লক্ষণ',
    component: 'ExternalSignsSection' 
  },
  { 
    id: 'head_spine', 
    labelEn: 'Head & Spine', 
    labelBn: 'মাথা ও মেরুদন্ড',
    component: 'HeadSpineSection' 
  },
  { 
    id: 'chest_lungs', 
    labelEn: 'Chest & Lungs', 
    labelBn: 'বক্ষ ও ফুসফুস',
    component: 'ChestLungsSection' 
  },
  { 
    id: 'abdomen', 
    labelEn: 'Abdomen', 
    labelBn: 'পেট',
    component: 'AbdomenSection' 
  },
  { 
    id: 'musculoskeletal', 
    labelEn: 'Musculoskeletal', 
    labelBn: 'মাংসপেশী ও অস্থি',
    component: 'MusculoskeletalSection' 
  },
  { 
    id: 'detailed_pathology', 
    labelEn: 'Detailed Pathology', 
    labelBn: 'বিস্তারিত রোগতত্ত্ব',
    component: 'DetailedPathologySection' 
  },
  { 
    id: 'opinions', 
    labelEn: 'Opinions', 
    labelBn: 'মতামত',
    component: 'OpinionsSection' 
  },
];

const CreateReportPageDesign2 = () => {
  return (
    <LanguageProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <CreateReportFormInner />
      </Suspense>
    </LanguageProvider>
  );
};

const CreateReportFormInner = () => {
  const [formData, setFormData] = useState<Partial<PostmortemReport>>({
    station: 'DMC MORGUE',
    case_type: 'none',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('header');
  const [saveLocalReport] = useSaveLocalReportMutation();
  const [submitLocalReport] = useSubmitLocalReportMutation();
  const [unlockLocalReport] = useUnlockLocalReportMutation();
  const searchParams = useSearchParams();
  const editId = searchParams?.get('id') || undefined;
  const { data: reportById } = useGetLocalReportByIdQuery(editId as any, { skip: !editId });
  const userInfo = useUserInfo();
  const { toast } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const rawUser = typeof window !== 'undefined' ? localStorage.getItem('userInfo') : null;
  let storedUsername = '' as string;
  try {
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      storedUsername = (parsed?.user?.username || parsed?.user?.userName || parsed?.user?.name || '').toString();
    }
  } catch {}
  const isAdminName = (userInfo?.username?.toLowerCase?.() === 'admin') || (storedUsername.toLowerCase?.() === 'admin');
  const { data: currentUserInfo } = useGetUserInfoQuery(Number((userInfo as any)?.userId || 0), { skip: !((userInfo as any)?.userId) });
  const isSuperUser = Boolean(
    (currentUserInfo as any)?.isSuperUser || (currentUserInfo as any)?.IsSuperUser ||
    (userInfo as any)?.isSuperUser || (userInfo as any)?.IsSuperUser ||
    (() => { try { return JSON.parse(rawUser || '{}')?.user?.isSuperUser ?? JSON.parse(rawUser || '{}')?.user?.IsSuperUser; } catch { return false } })()
  );
  // Editing lock depends only on the 'locked' flag, not the status
  const isLocked = Boolean((reportById as any)?.locked || (formData as any)?.locked);
  const canEdit = !isLocked; // admin cannot bypass; must unlock first

  // Horizontal tabs scroller
  const tabsScrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const updateScrollState = () => {
    const el = tabsScrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const needsScroll = scrollWidth - clientWidth > 2;
    const atStart = scrollLeft <= 1;
    const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;
    setCanScrollLeft(needsScroll && !atStart);
    setCanScrollRight(needsScroll && !atEnd);
  };
  const scrollTabs = (delta: number) => {
    const el = tabsScrollRef.current;
    if (el) {
      el.scrollBy({ left: delta, behavior: 'smooth' });
      // re-evaluate after scroll animation
      setTimeout(updateScrollState, 220);
    }
  };

  const generateId = () => `rpt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  const handleFieldChange = (field: string, value: any) => {
    if (!canEdit) return;
    setFormData(prev => {
      const nextState: Partial<PostmortemReport> = {
        ...prev,
        [field]: value,
      };
      if (!nextState.id && !editId) {
        nextState.id = prev.id || generateId();
      }

      // Clear error when field is updated
      if (errors[field]) {
        setErrors(prevErrors => {
          const newErrors = { ...prevErrors } as Record<string, string>;
          delete newErrors[field];
          return newErrors;
        });
      }

      // Auto-save to API for design2 with the up-to-date state
      setTimeout(() => {
        saveLocalReport(nextState as any);
      }, 500);

      return nextState;
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Basic validation - can be expanded later
    if (!formData.pm_no || formData.pm_no.trim() === '') {
      newErrors.pm_no = 'PM number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // updateTabStatus function is removed as per edit hint

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const getStatusIcon = (status: string) => {
    // Remove icons - return null for all statuses
    return null;
  };

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
    if (status === 'error') {
      return 'bg-gradient-to-r from-red-50 via-pink-100 to-rose-50 text-red-800 border-red-200/60 hover:from-red-100 hover:via-pink-200 hover:to-rose-100 hover:border-red-300 shadow-sm hover:shadow-md transition-all duration-300';
    }
    return 'bg-gradient-to-r from-slate-50 via-gray-100 to-zinc-50 text-gray-700 border-gray-200/60 hover:from-gray-100 hover:via-slate-200 hover:to-zinc-100 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300';
  };

  const renderTabContent = () => {
    const commonProps = {
      formData,
      onFieldChange: handleFieldChange,
      errors,
      thanas: [
        { id: '1', district_id: '1', name_bn: 'ধানমন্ডি', name_en: 'Dhanmondi' },
        { id: '2', district_id: '1', name_bn: 'গুলশান', name_en: 'Gulshan' },
        { id: '3', district_id: '1', name_bn: 'বনানী', name_en: 'Banani' },
      ], // Sample thanas data with proper structure
    };

    switch (activeTab) {
      case 'header':
        return <HeaderSection {...commonProps} />;
      case 'general':
        return <GeneralSection {...commonProps} />;
      case 'external_signs':
        return <ExternalSignsSection {...commonProps} />;
      case 'head_spine':
        return <HeadSpineSection {...commonProps} />;
      case 'chest_lungs':
        return <ChestLungsSection {...commonProps} />;
      case 'abdomen':
        return <AbdomenSection {...commonProps} />;
      case 'musculoskeletal':
        return <MusculoskeletalSection {...commonProps} />;
      case 'detailed_pathology':
        return <DetailedPathologySection {...commonProps} />;
      case 'opinions':
        return <OpinionsSection {...commonProps} />;
      default:
        return <HeaderSection {...commonProps} />;
    }
  };

  const handleSave = () => {
    if (!canEdit) return;
    // Save as draft without strict validation here; basic check remains
    saveLocalReport({ ...formData, status: (formData as any)?.status ?? 'draft' } as any);
    toast({
      title: 'Draft saved',
      description: 'Your report has been saved as a draft.',
    });
  };

  const requiredSubmitFields = [
    'thana_id','case_type','gd_cid_case_no','ref_date','pm_no','report_date','station',
    'person_name','gender','age_years','brought_from_village','brought_from_thana','constable_name','relatives_names','sent_datetime','brought_datetime','exam_datetime','police_info','identifier_name'
  ];
  const isSubmitReady = () => requiredSubmitFields.every((k) => {
    const v: any = (formData as any)[k];
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'string') return v.trim() !== '';
    return Boolean(v);
  });

  const handleSubmitFinal = async () => {
    if (!canEdit) return;
    if (!isSubmitReady()) return;
    try {
      const resp = await submitLocalReport({ ...(formData as any), id: (formData as any).id }).unwrap();
      const saved = resp?.data ?? null;
      if (saved) {
        const flat = toFlatForm(saved);
        setFormData(flat);
      }
    } catch (e: any) {
      alert(e?.data?.error || 'Submit failed');
    }
  };

  const openSubmitConfirm = () => setConfirmOpen(true);
  const closeSubmitConfirm = () => setConfirmOpen(false);

  const handleUnlock = async () => {
    if (!isAdminName) return;
    try {
      const id = (formData as any)?.id;
      if (!id) return;
      const resp = await unlockLocalReport({ id }).unwrap();
      const saved = resp?.data ?? null;
      if (saved) {
        const flat = toFlatForm(saved);
        setFormData(flat);
      }
      // Feedback for success
      alert('Editing unlocked for this report.');
    } catch (e: any) {
      alert(e?.data?.error || 'Unlock failed');
    }
  };

  useEffect(() => {
    if (editId && reportById) {
      const flat = toFlatForm(reportById);
      setFormData(flat);
    }
  }, [editId, reportById]);

  // Seed a stable id for new reports (no editId)
  useEffect(() => {
    if (!editId) {
      setFormData(prev => (prev?.id ? prev : { ...prev, id: generateId() }));
    }
  }, [editId]);

  // Now we can use the useLanguage hook since we're inside LanguageProvider
  const { t, language } = useLanguage();

  useEffect(() => {
    updateScrollState();
    const el = tabsScrollRef.current;
    if (!el) return;
    const onScroll = () => updateScrollState();
    el.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => updateScrollState();
    window.addEventListener('resize', onResize);
    // Observe size changes of the scroller (covers sidebar collapse/expand)
    const ro = new ResizeObserver(() => updateScrollState());
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [language]); // Add language dependency to force re-render

  return (
    <div className="min-h-screen p-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {language === 'bn' ? "ময়না তদন্ত রিপোর্ট - ডিজাইন ২" : "Create Post-mortem Report - Design 2"}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <LanguageToggle />
          
          <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          {!canEdit && (
            <div className="flex items-center text-sm text-amber-700 bg-amber-100 px-3 py-1 rounded-md">
              <Lock className="w-4 h-4 mr-2" /> Final submission — locked
            </div>
          )}
          {(isAdminName || isSuperUser) && isLocked && (
            <Button onClick={handleUnlock} variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400">
              <Unlock className="w-4 h-4 mr-2" /> Allow Edit
            </Button>
          )}
          {canEdit && (
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
          )}
          {canEdit && (
            <Button onClick={openSubmitConfirm} disabled={!isSubmitReady()} className="bg-emerald-600 disabled:bg-gray-300 hover:bg-emerald-700 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
              Submit
            </Button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-4">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-50/50 to-blue-50/30 rounded-xl px-4 py-2 border border-slate-100/50">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <button
              onClick={() => scrollTabs(-240)}
              className={`pointer-events-auto inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/60 shadow-lg hover:bg-white hover:shadow-xl hover:border-slate-300 transition-all duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              aria-hidden={!canScrollLeft}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <button
              onClick={() => scrollTabs(240)}
              className={`pointer-events-auto inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/60 shadow-lg hover:bg-white hover:shadow-xl hover:border-slate-300 transition-all duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              aria-hidden={!canScrollRight}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div
            ref={tabsScrollRef}
            className="overflow-hidden no-scrollbar w-full max-w-full"
            onWheel={(e) => { e.preventDefault(); }}
            onTouchMove={(e) => { e.preventDefault(); }}
          >
            <ul className="flex flex-nowrap gap-2 text-sm font-medium pl-10 pr-10 py-1" role="tablist">
              {tabs.map((tab) => {
                const { completed, total } = computeSectionProgress(tab.id as any, formData as any);
                const status = completed === 0 ? 'not_started' : completed === total ? 'done' : 'in_progress';
                return (
                  <li key={`${tab.id}-${language}`} role="presentation" className="whitespace-nowrap max-w-none">
                    <button
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 truncate ${activeTab === tab.id ? getStatusColor(status, true) : getStatusColor(status, false)}`}
                      onClick={() => handleTabClick(tab.id)}
                      type="button"
                      role="tab"
                      aria-controls={tab.id}
                      aria-selected={activeTab === tab.id}
                    >
                      <span className="truncate max-w-[12ch]">{language === 'bn' ? tab.labelBn : tab.labelEn}</span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${activeTab === tab.id ? 'bg-white/20 text-white border border-white/30' : 'bg-white/90 text-gray-700 border border-gray-200/40 shadow-sm'}`}>{completed}/{total}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Submit confirmation modal */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{language === 'bn' ? 'রিপোর্ট জমা দিন?' : 'Submit report?'}</DialogTitle>
            <DialogDescription>
              This will lock the report. You won't be able to edit unless an admin unlocks it.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeSubmitConfirm}>
              {language === 'bn' ? 'বাতিল করুন' : 'Cancel'}
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={async () => { await handleSubmitFinal(); setConfirmOpen(false); }}>
              {language === 'bn' ? 'নিশ্চিত করুন এবং জমা দিন' : 'Confirm & Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateReportPageDesign2;
