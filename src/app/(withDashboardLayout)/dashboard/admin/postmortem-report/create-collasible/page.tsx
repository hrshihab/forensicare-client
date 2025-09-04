'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { FormSection } from '@/components/investigation/FormSection';
import { HeaderSection } from '@/components/investigation/HeaderSection';
import { GeneralSection } from '@/components/investigation/GeneralSection';
import ExternalSignsSection from '@/components/investigation/ExternalSignsSection';
import HeadSpineSection from '@/components/investigation/HeadSpineSection';
import ChestLungsSection from '@/components/investigation/ChestLungsSection';
import AbdomenSection from '@/components/investigation/AbdomenSection';
import MusculoskeletalSection from '@/components/investigation/MusculoskeletalSection';
import { OpinionsSection } from '@/components/investigation/OpinionsSection';
import { DetailedPathologySection } from '@/components/investigation/DetailedPathologySection';
import { Button } from '@/components/ui/button';
import { Save, Eye, Printer, Lock, Unlock } from 'lucide-react';
import { PostmortemReport, FormSection as FormSectionType } from '@/types/postmortem';
import { computeSectionStatus, getSectionFields } from '@/utils/section-progress';
import { showSectionCompletionToast, getSectionProgress, getOverallCompletion } from '@/utils/section-completion-toasts';
// Local report functionality removed - keeping only report template functionality
import { toFlatForm } from '@/utils/report-shape';
import useUserInfo from '@/hooks/useUserInfo';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useGetUserInfoQuery } from '@/redux/api/getApis';

const CreateReportForm: React.FC = () => {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const editId = searchParams?.get('id') || undefined;
  
  // Stable default for SSR/CSR to avoid hydration mismatches; load saved data after mount
  const defaultFormData: Partial<PostmortemReport> = {
    station: 'DMC MORGUE',
    case_type: 'none',
  };

  const [formData, setFormData] = useState<Partial<PostmortemReport>>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const lastSavedSnapshot = useRef<string>('');
  const [sections, setSections] = useState<FormSectionType[]>([
    {
      id: 'header',
      title: 'Header',
      title_bn: 'হেডার',
      isOpen: true,
      status: 'not_started',
      required: true,
    },
    {
      id: 'general',
      title: 'General Information',
      title_bn: 'সাধারণ তথ্য',
      isOpen: false,
      status: 'not_started',
      required: true,
    },
    {
      id: 'external_signs',
      title: 'External Signs',
      title_bn: 'বাহ্যিক লক্ষণ',
      isOpen: false,
      status: 'not_started',
      required: false,
    },
    {
      id: 'head_spine',
      title: 'Head & Spine',
      title_bn: 'মাথার খুলী/মেরুদণ্ড নল',
      isOpen: false,
      status: 'not_started',
      required: false,
    },
    {
      id: 'chest_lungs',
      title: 'Chest & Lungs',
      title_bn: 'বক্ষ ও ফুসফুস',
      isOpen: false,
      status: 'not_started',
      required: false,
    },
    {
      id: 'abdomen',
      title: 'Abdomen',
      title_bn: 'উদর',
      isOpen: false,
      status: 'not_started',
      required: false,
    },
    {
      id: 'musculoskeletal',
      title: 'Musculoskeletal',
      title_bn: 'মাংসপেশী/হাড়/জয়ন্ট',
      isOpen: false,
      status: 'not_started',
      required: false,
    },
    {
      id: 'detailed_pathology',
      title: 'Detailed Pathology',
      title_bn: 'বিস্তারিত রোগতত্ত্ব',
      isOpen: false,
      status: 'not_started',
      required: false,
    },
    {
      id: 'opinions',
      title: 'Opinions',
      title_bn: 'মতামত',
      isOpen: false,
      status: 'not_started',
      required: true,
    },
  ]);

  // Track previous section progress to detect completion
  const [previousSectionProgress, setPreviousSectionProgress] = useState<Record<string, { completed: number; total: number }>>({});
  const [hasShownCompletionToast, setHasShownCompletionToast] = useState(false);

  // Save to localStorage
  // Local report functionality removed - keeping only report template functionality
  const savedReports: any[] = [];
  const reportById: any = null;
  const userInfo = useUserInfo();
  const { toast } = useToast();
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
  const [confirmOpen, setConfirmOpen] = useState(false);

  const saveToLocalStorage = async (data: Partial<PostmortemReport>) => {
    try {
      if (!canEdit) return; // prevent saving when locked for non-admins
      // Ensure a stable id for upsert
      const payload: Partial<PostmortemReport> = { ...data };
      if (!payload.id) {
        payload.id = formData.id || generateId();
      }

      // Local report saving removed - keeping only report template functionality
      const savedPayload = payload;

      // Mirror to browser localStorage for quick resume
      localStorage.setItem('investigationReportData', JSON.stringify(savedPayload));
      setLastSaved(new Date());
      console.log('Data saved:', savedPayload);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const generateId = () => `rpt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const normalizeForSnapshot = (data: Partial<PostmortemReport>) => {
    const { createdAt, updatedAt, ...rest } = (data as any) || {};
    return rest;
  };

  // Auto-save function
  const autoSave = async () => {
    if (Object.keys(formData).length > 0) {
      if (!canEdit) return;
      const currentSnapshot = JSON.stringify(normalizeForSnapshot(formData));
      if (currentSnapshot === lastSavedSnapshot.current) {
        return; // No changes since last save
      }
      setIsAutoSaving(true);
      await saveToLocalStorage(formData);
      lastSavedSnapshot.current = JSON.stringify(normalizeForSnapshot(formData));
      setTimeout(() => setIsAutoSaving(false), 1000);
    }
  };

  // Load saved data on client after mount to keep SSR markup consistent
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('investigationReportData');
      if (editId && reportById) {
        // Load selected report from API and flatten into form
        const flat = toFlatForm(reportById);
        setFormData(flat);
        lastSavedSnapshot.current = JSON.stringify(normalizeForSnapshot(flat));
      } else if (savedData) {
        const parsed = JSON.parse(savedData);
        // Ensure an id exists for stable upserts
        if (!parsed.id) parsed.id = generateId();
        setFormData(parsed);
        lastSavedSnapshot.current = JSON.stringify(normalizeForSnapshot(parsed));
      } else {
        // New form, assign an id immediately for stable saves
        const seeded = { ...defaultFormData, id: generateId() } as Partial<PostmortemReport>;
        setFormData(seeded);
        lastSavedSnapshot.current = JSON.stringify(normalizeForSnapshot(seeded));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, [editId, reportById]);

  const handleFieldChange = (field: string, value: any) => {
    if (!canEdit) return;
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    // Update section statuses after field change
    setTimeout(() => updateSectionStatuses(), 100);
    
    // Trigger auto-save after field change
    setTimeout(autoSave, 1000);
  };

  const handleSectionToggle = (sectionId: string, isOpen: boolean) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, isOpen }
          : section
      )
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Header validation - always validate as it's required and open by default
    if (!formData.thana) {
      newErrors.thana_id = t('validation.required_field');
    }
    if (!formData.gd_ud_case_no) {
      newErrors.gd_cid_case_no = t('validation.required_field');
    }
    if (!formData.ref_date) {
      newErrors.ref_date = t('validation.required_field');
    }
    if (!formData.pm_no) {
      newErrors.pm_no = t('validation.required_field');
    }
    if (!formData.report_date) {
      newErrors.report_date = t('validation.required_field');
    }
    if (!formData.station || formData.station.trim() === '') {
      newErrors.station = t('validation.required_field');
    }
    if (!formData.case_type) {
      newErrors.case_type = t('validation.required_field');
    }

    // General validation - only validate if section has been opened or has data
    const generalSection = sections.find(s => s.id === 'general');
    if (generalSection?.isOpen || hasGeneralSectionData()) {
      if (!formData.person_name) newErrors.person_name = t('validation.required_field');
      if (!formData.gender) newErrors.gender = t('validation.required_field');
      if (!formData.age_years) newErrors.age_years = t('validation.required_field');
      if (!formData.brought_from_village) newErrors.brought_from_village = t('validation.required_field');
      if (!formData.brought_from_thana) newErrors.brought_from_thana = t('validation.required_field');
      if (!formData.constable_name) newErrors.constable_name = t('validation.required_field');
      if (!formData.relatives_names || (Array.isArray(formData.relatives_names) && formData.relatives_names.length === 0)) {
        newErrors.relatives_names = t('validation.required_field');
      }
      if (!formData.sent_datetime) newErrors.sent_datetime = t('validation.required_field');
      if (!formData.brought_datetime) newErrors.brought_datetime = t('validation.required_field');
      if (!formData.exam_datetime) newErrors.exam_datetime = t('validation.required_field');
      if (!formData.police_info) newErrors.police_info = t('validation.required_field');
      if (!formData.identifier_name) newErrors.identifier_name = t('validation.required_field');
    }

    // For draft save we skip strict opinions validation

    // Date validation - only if both dates exist
    if (formData.sent_datetime && formData.brought_datetime) {
      if (new Date(formData.sent_datetime) >= new Date(formData.brought_datetime)) {
        newErrors.brought_datetime = t('validation.brought_date_after_sent');
      }
    }
    if (formData.brought_datetime && formData.exam_datetime) {
      if (new Date(formData.brought_datetime) >= new Date(formData.exam_datetime)) {
        newErrors.exam_datetime = t('validation.exam_date_after_brought');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForSubmit = (): boolean => {
    const required: string[] = [
      'thana_id','case_type','gd_cid_case_no','ref_date','pm_no','report_date','station',
      'person_name','gender','age_years','brought_from_village','brought_from_thana','constable_name','relatives_names','sent_datetime','brought_datetime','exam_datetime','police_info','identifier_name'
    ];
    const missing: string[] = required.filter((k) => {
      const v: any = (formData as any)[k];
      return !v || (Array.isArray(v) && v.length === 0) || (typeof v === 'string' && v.trim() === '');
    });
    const newErrors: Record<string, string> = { ...errors };
    missing.forEach((k) => { newErrors[k] = t('validation.required_field'); });
    setErrors(newErrors);
    return missing.length === 0;
  };

  const handleSave = () => {
    try {
      // Update section statuses
      updateSectionStatuses();
      // Save draft without strict validation
      saveToLocalStorage({ ...formData, status: (formData as any)?.status ?? 'draft' });
      console.log('Draft saved:', formData);
      toast({ title: 'Draft saved', description: 'Your report has been saved as a draft.' });
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleSubmitFinal = async () => {
    if (!canEdit) return;
    const ok = validateForSubmit();
    if (!ok) return;
    try {
      // Local report submission removed - keeping only report template functionality
      // Optionally a toast can be added post-submit; modal already confirms intent
    } catch (e: any) {
      alert(e?.data?.error || 'Submit failed');
    }
  };

  const handleUnlock = async () => {
    try {
      const id = (formData as any)?.id;
      if (!id) return;
      // Local report unlock removed - keeping only report template functionality
      alert('Editing unlocked for this report.');
    } catch (e: any) {
      alert('Unlock failed');
    }
  };

  const isSubmitReady = (): boolean => {
    const required: string[] = [
      'thana_id','case_type','gd_cid_case_no','ref_date','pm_no','report_date','station',
      'person_name','gender','age_years','brought_from_village','brought_from_thana','constable_name','relatives_names','sent_datetime','brought_datetime','exam_datetime','police_info','identifier_name'
    ];
    return required.every((k) => {
      const v: any = (formData as any)[k];
      if (Array.isArray(v)) return v.length > 0;
      if (typeof v === 'string') return v.trim() !== '';
      return Boolean(v);
    });
  };

  const updateSectionStatuses = () => {
    setSections(prev => prev.map(section => {
      const status = computeSectionStatus(section.id as any, formData as any, errors);
      return { ...section, status };
    }));

    // Check for section completion and show toasts
    sections.forEach(section => {
      const sectionId = section.id as any;
      const currentProgress = getSectionProgress(sectionId, formData);
      const previousProgress = previousSectionProgress[sectionId];
      
      console.log(`Checking section ${sectionId}:`, {
        currentProgress,
        previousProgress,
        hasPrevious: !!previousProgress
      });
      
      // Only show toast if we have previous progress AND the section was just completed
      if (previousProgress && previousProgress.completed < previousProgress.total && currentProgress.completed === currentProgress.total) {
        showSectionCompletionToast(sectionId, formData, previousProgress);
      }
    });

    // Update previous progress for next comparison
    const newProgress: Record<string, { completed: number; total: number }> = {};
    sections.forEach(section => {
      const sectionId = section.id as any;
      newProgress[sectionId] = getSectionProgress(sectionId, formData);
    });
    setPreviousSectionProgress(newProgress);

    // Check for overall completion
    const overallCompletion = getOverallCompletion(formData);
    if (overallCompletion === 100 && !hasShownCompletionToast) {
      toast({
        title: '🎉🎊 Congratulations! 🎊🎉',
        description: 'All sections are complete! Your investigation report is ready for submission.',
        duration: 6000,
        className: "bg-gradient-to-r from-green-50 to-blue-50 border-green-300 text-green-800",
      });
      setHasShownCompletionToast(true);
    } else if (overallCompletion < 100) {
      setHasShownCompletionToast(false);
    }
  };

  // Helper function to check if general section has any data
  const hasGeneralSectionData = (): boolean => {
    const generalFields = [
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
      'police_info',
      'identifier_name',
    ];
    return generalFields.some(field => {
      const value = (formData as any)[field];
      if (field === 'relatives_names') {
        return Array.isArray(value) && value.length > 0;
      }
      return value && value.toString().trim() !== '';
    });
  };

  // Helper function to get fields is provided via utils/getSectionFields

  useEffect(() => {
    updateSectionStatuses();
  }, [errors, formData]);

  // Initialize progress tracking on mount
  useEffect(() => {
    const initialProgress: Record<string, { completed: number; total: number }> = {};
    sections.forEach(section => {
      const sectionId = section.id as any;
      initialProgress[sectionId] = getSectionProgress(sectionId, formData);
    });
    setPreviousSectionProgress(initialProgress);
    console.log('Initialized progress tracking:', initialProgress);
  }, [sections]); // Run when sections change

  // Auto-save every 10 seconds
  useEffect(() => {
    const interval = setInterval(autoSave, 10000);
    return () => clearInterval(interval);
  }, [formData]);

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
                     <div>
             <h1 className="text-3xl font-bold text-gray-900">
               {t('investigation.create_title')}
             </h1>
             <p className="text-gray-600 mt-2">
               Create a new forensic investigation report
             </p>
           </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* Auto-save indicator removed per requirement */}

          <LanguageToggle />
          
          {/* Preview/Print buttons removed per requirement */}
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
          <Button 
            onClick={() => {
              localStorage.removeItem('investigationReportData');
              setFormData({
                station: 'DMC MORGUE',
                case_type: 'none',
              });
              setLastSaved(null);
            }} 
            variant="outline" 
            size="sm" 
            className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-200"
          >
            Clear Data
          </Button>

           {canEdit && (
             <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
               <Save className="w-4 h-4 mr-2" />
               Save Draft
             </Button>
           )}
          {canEdit && (
            <Button onClick={() => setConfirmOpen(true)} disabled={!isSubmitReady()} className="bg-emerald-600 disabled:bg-gray-300 hover:bg-emerald-700 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
              Submit
            </Button>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
                 {/* Header Section */}
         <FormSection
           section={sections.find(s => s.id === 'header')!}
           onToggle={(isOpen) => handleSectionToggle('header', isOpen)}
           progress={getSectionProgress('header', formData)}
         >
           <HeaderSection
             formData={formData}
             onFieldChange={handleFieldChange}
             errors={errors}
           />
         </FormSection>

                 {/* General Section */}
         <FormSection
           section={sections.find(s => s.id === 'general')!}
           onToggle={(isOpen) => handleSectionToggle('general', isOpen)}
           progress={getSectionProgress('general', formData)}
         >
           <GeneralSection
             formData={formData}
             onFieldChange={handleFieldChange}
             errors={errors}
           />
         </FormSection>

                 {/* External Signs Section */}
         <FormSection
           section={sections.find(s => s.id === 'external_signs')!}
           onToggle={(isOpen) => handleSectionToggle('external_signs', isOpen)}
           progress={getSectionProgress('external_signs', formData)}
         >
           <ExternalSignsSection
             formData={formData}
             onFieldChange={handleFieldChange}
             errors={errors}
           />
         </FormSection>

                 {/* Head & Spine Section */}
         <FormSection
           section={sections.find(s => s.id === 'head_spine')!}
           onToggle={(isOpen) => handleSectionToggle('head_spine', isOpen)}
           progress={getSectionProgress('head_spine', formData)}
         >
           <HeadSpineSection
             formData={formData}
             onFieldChange={handleFieldChange}
             errors={errors}
           />
         </FormSection>

                 {/* Chest & Lungs Section */}
         <FormSection
           section={sections.find(s => s.id === 'chest_lungs')!}
           onToggle={(isOpen) => handleSectionToggle('chest_lungs', isOpen)}
           progress={getSectionProgress('chest_lungs', formData)}
         >
           <ChestLungsSection
             formData={formData}
             onFieldChange={handleFieldChange}
             errors={errors}
           />
         </FormSection>

                 {/* Abdomen Section */}
         <FormSection
           section={sections.find(s => s.id === 'abdomen')!}
           onToggle={(isOpen) => handleSectionToggle('abdomen', isOpen)}
           progress={getSectionProgress('abdomen', formData)}
         >
           <AbdomenSection
             formData={formData}
             onFieldChange={handleFieldChange}
             errors={errors}
           />
         </FormSection>

                 {/* Musculoskeletal Section */}
         <FormSection
           section={sections.find(s => s.id === 'musculoskeletal')!}
           onToggle={(isOpen) => handleSectionToggle('musculoskeletal', isOpen)}
           progress={getSectionProgress('musculoskeletal', formData)}
         >
           <MusculoskeletalSection
             formData={formData}
             onFieldChange={handleFieldChange}
             errors={errors}
           />
         </FormSection>

                 {/* Detailed Pathology Section */}
         <FormSection
           section={sections.find(s => s.id === 'detailed_pathology')!}
           onToggle={(isOpen) => handleSectionToggle('detailed_pathology', isOpen)}
           progress={getSectionProgress('detailed_pathology', formData)}
         >
           <DetailedPathologySection
             formData={formData}
             onFieldChange={handleFieldChange}
             errors={errors}
           />
         </FormSection>

                 {/* Opinions Section */}
         <FormSection
           section={sections.find(s => s.id === 'opinions')!}
           onToggle={(isOpen) => handleSectionToggle('opinions', isOpen)}
           progress={getSectionProgress('opinions', formData)}
         >
           <OpinionsSection
             formData={formData}
             onFieldChange={handleFieldChange}
             errors={errors}
           />
         </FormSection>
      </div>

      {/* Saved reports and history moved to the All Reports page */}

      {/* Submit confirmation modal */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit report?</DialogTitle>
            <DialogDescription>
              This will lock the report. You won’t be able to edit unless an admin unlocks it.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={async () => { await handleSubmitFinal(); setConfirmOpen(false); }}>Confirm & Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Wrap the component with LanguageProvider and Suspense
const CreateReportPage: React.FC = () => {
  return (
    <LanguageProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <CreateReportForm />
      </Suspense>
    </LanguageProvider>
  );
};

export default CreateReportPage;
