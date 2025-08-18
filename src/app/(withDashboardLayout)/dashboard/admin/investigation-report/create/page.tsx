'use client';

import React, { useState, useEffect, useRef } from 'react';
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
import { Save, Eye, Printer } from 'lucide-react';
import { InvestigationReport, FormSection as FormSectionType } from '@/types/investigation';
import { computeSectionStatus, getSectionFields } from '@/utils/section-progress';
import { useSaveLocalReportMutation, useGetLocalReportsQuery, useGetLocalReportByIdQuery } from '@/redux/api/reportApis';
import { toFlatForm } from '@/utils/report-shape';

const CreateReportForm: React.FC = () => {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const editId = searchParams?.get('id') || undefined;
  
  // Stable default for SSR/CSR to avoid hydration mismatches; load saved data after mount
  const defaultFormData: Partial<InvestigationReport> = {
    brought_by_list: [],
    station: 'DMC MORGUE',
    case_type: 'none',
  };

  const [formData, setFormData] = useState<Partial<InvestigationReport>>(defaultFormData);
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

  // Save to localStorage
  const [saveLocalReport] = useSaveLocalReportMutation();
  const { data: savedReports = [] } = useGetLocalReportsQuery();
  const { data: reportById } = useGetLocalReportByIdQuery(editId as any, { skip: !editId });

  const saveToLocalStorage = async (data: Partial<InvestigationReport>) => {
    try {
      // Ensure a stable id for upsert
      const payload: Partial<InvestigationReport> = { ...data };
      if (!payload.id) {
        payload.id = formData.id || generateId();
      }

      // Persist via API first to keep disk authoritative
      const resp = await saveLocalReport(payload as any).unwrap().catch(() => null);
      let savedPayload = data;
      if (resp?.data?.id || payload.id) {
        const finalId = resp?.data?.id ?? payload.id;
        savedPayload = { ...payload, id: finalId } as Partial<InvestigationReport>;
        setFormData(prev => ({ ...prev, id: finalId }));
      }

      // Mirror to browser localStorage for quick resume
      localStorage.setItem('investigationReportData', JSON.stringify(savedPayload));
      setLastSaved(new Date());
      console.log('Data saved:', savedPayload);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const generateId = () => `rpt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const normalizeForSnapshot = (data: Partial<InvestigationReport>) => {
    const { createdAt, updatedAt, ...rest } = (data as any) || {};
    return rest;
  };

  // Auto-save function
  const autoSave = async () => {
    if (Object.keys(formData).length > 0) {
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
        const seeded = { ...defaultFormData, id: generateId() } as Partial<InvestigationReport>;
        setFormData(seeded);
        lastSavedSnapshot.current = JSON.stringify(normalizeForSnapshot(seeded));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, [editId, reportById]);

  const handleFieldChange = (field: string, value: any) => {
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
    if (!formData.thana_id) {
      newErrors.thana_id = t('validation.required_field');
    }
    if (!formData.gd_cid_case_no) {
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

    // Opinions validation - required section
    if (!formData.medical_officer_opinion) {
      newErrors.medical_officer_opinion = t('validation.required_field');
    }
    if (!formData.civil_surgeon_remark) {
      newErrors.civil_surgeon_remark = t('validation.required_field');
    }

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

  const handleSave = () => {
    if (validateForm()) {
      try {
        // Update section statuses
        updateSectionStatuses();
        
        // Save to localStorage
        saveToLocalStorage(formData);
        
        console.log('Form data saved:', formData);
      } catch (error) {
        console.error('Save failed:', error);
      }
    }
  };

  const updateSectionStatuses = () => {
    setSections(prev => prev.map(section => {
      const status = computeSectionStatus(section.id as any, formData as any, errors);
      return { ...section, status };
    }));
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
          {/* Auto-save Status */}
          <div className="flex items-center space-x-2 text-sm">
            {isAutoSaving ? (
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span>Auto-saving...</span>
              </div>
            ) : lastSaved ? (
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>Not saved yet</span>
              </div>
            )}
          </div>

          <LanguageToggle />
          
          <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button 
            onClick={() => {
              localStorage.removeItem('investigationReportData');
              setFormData({
                brought_by_list: [],
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
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Header Section */}
        <FormSection
          section={sections.find(s => s.id === 'header')!}
          onToggle={(isOpen) => handleSectionToggle('header', isOpen)}
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
        >
          <OpinionsSection
            formData={formData}
            onFieldChange={handleFieldChange}
            errors={errors}
          />
        </FormSection>
      </div>

      {/* Saved Reports Table */}
      {Array.isArray(savedReports) && savedReports.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Saved Reports</h2>
          <div className="overflow-x-auto border rounded-md">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-3 py-2">ID</th>
                  <th className="text-left px-3 py-2">PM No</th>
                  <th className="text-left px-3 py-2">Person Name</th>
                  <th className="text-left px-3 py-2">Case Type</th>
                  <th className="text-left px-3 py-2">Updated</th>
                  <th className="text-left px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {savedReports.map((r: any) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-3 py-2">{r.id}</td>
                    <td className="px-3 py-2">{r?.header?.pm_no ?? '-'}</td>
                    <td className="px-3 py-2">{r?.general?.person_name ?? '-'}</td>
                    <td className="px-3 py-2">{r?.header?.case_type ?? '-'}</td>
                    <td className="px-3 py-2">{r.updatedAt ?? '-'}</td>
                    <td className="px-3 py-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFormData(r)
                          localStorage.setItem('investigationReportData', JSON.stringify(r))
                        }}
                      >
                        Load
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// Wrap the component with LanguageProvider
const CreateReportPage: React.FC = () => {
  return (
    <LanguageProvider>
      <CreateReportForm />
    </LanguageProvider>
  );
};

export default CreateReportPage;
