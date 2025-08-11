'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { FormSection } from '@/components/investigation/FormSection';
import { HeaderSection } from '@/components/investigation/HeaderSection';
import { GeneralSection } from '@/components/investigation/GeneralSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Eye, Printer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { InvestigationReport, FormSection as FormSectionType } from '@/types/investigation';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';

const CreateReportForm: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<InvestigationReport>>({
    brought_by_list: [],
    station: 'dmc_morgue', // Set default station value
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
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
      id: 'opinions',
      title: 'Opinions',
      title_bn: 'মতামত',
      isOpen: false,
      status: 'not_started',
      required: true,
    },
  ]);

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
    triggerAutoSave();
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

  // Auto-save functionality
  const triggerAutoSave = useCallback(() => {
    // Clear any existing timeout
    if ((window as any).autoSaveTimeout) {
      clearTimeout((window as any).autoSaveTimeout);
    }
    
    // Set new timeout for 5 seconds
    (window as any).autoSaveTimeout = setTimeout(() => {
      autoSaveData();
    }, 5000);
  }, []);

  const autoSaveData = useCallback(() => {
    if (Object.keys(formData).length === 0) return;
    
    setIsAutoSaving(true);
    
    try {
      // Save to localStorage
      const dataToSave = {
        ...formData,
        lastModified: new Date().toISOString(),
        autoSaved: true
      };
      
      localStorage.setItem('investigation_report_draft', JSON.stringify(dataToSave));
      setLastSaved(new Date());
      
      // Show toast notification
      toast({
        title: "Auto-saved",
        description: "Your progress has been automatically saved",
        duration: 3000,
      });
      
    } catch (error) {
      console.error('Auto-save failed:', error);
      toast({
        title: "Auto-save failed",
        description: "Failed to save your progress automatically",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsAutoSaving(false);
    }
  }, [formData, toast]);

  const loadSavedData = useCallback(() => {
    try {
      const savedData = localStorage.getItem('investigation_report_draft');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Remove auto-save metadata
        const { lastModified, autoSaved, ...cleanData } = parsedData;
        setFormData(cleanData);
        setLastSaved(new Date(lastModified));
        
        toast({
          title: "Data restored",
          description: "Your previous work has been restored",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Failed to load saved data:', error);
    }
  }, [toast]);

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

    // General validation - only validate if section has been opened or has data
    const generalSection = sections.find(s => s.id === 'general');
    if (generalSection?.isOpen || hasGeneralSectionData()) {
      if (!formData.person_name) {
        newErrors.person_name = t('validation.required_field');
      }
      if (!formData.gender) {
        newErrors.gender = t('validation.required_field');
      }
      if (!formData.age_years) {
        newErrors.age_years = t('validation.required_field');
      }
      if (!formData.brought_by_list || formData.brought_by_list.length === 0) {
        newErrors.brought_by_list = t('validation.required_field');
      }
      if (!formData.sent_datetime) {
        newErrors.sent_datetime = t('validation.required_field');
      }
      if (!formData.brought_datetime) {
        newErrors.brought_datetime = t('validation.required_field');
      }
      if (!formData.exam_datetime) {
        newErrors.exam_datetime = t('validation.required_field');
      }
      if (!formData.police_info) {
        newErrors.police_info = t('validation.required_field');
      }
      if (!formData.identifier_name) {
        newErrors.identifier_name = t('validation.required_field');
      }
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
        // Save to localStorage
        const dataToSave = {
          ...formData,
          lastModified: new Date().toISOString(),
          saved: true
        };
        
        localStorage.setItem('investigation_report_draft', JSON.stringify(dataToSave));
        setLastSaved(new Date());
        
        // Show success toast
        toast({
          title: "Saved successfully",
          description: "Your investigation report has been saved",
          duration: 3000,
        });
        
        // Update section statuses
        updateSectionStatuses();
        
        console.log('Form data saved:', formData);
      } catch (error) {
        console.error('Save failed:', error);
        toast({
          title: "Save failed",
          description: "Failed to save your investigation report",
          variant: "destructive",
          duration: 3000,
        });
      }
    } else {
      // Show validation error toast
      toast({
        title: "Validation failed",
        description: "Please fix the errors before saving",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const updateSectionStatuses = () => {
    setSections(prev => prev.map(section => {
      let status: 'not_started' | 'in_progress' | 'done' | 'error' | 'skipped' = 'not_started';
      
      if (section.id === 'header') {
        const requiredFields = ['thana_id', 'gd_cid_case_no', 'ref_date', 'pm_no', 'report_date', 'station'];
        const hasErrors = requiredFields.some(field => errors[field]);
        const filledFields = requiredFields.filter(field => {
          const value = (formData as any)[field];
          return isFieldMeaningfullyFilled(field, value);
        });
        
        if (hasErrors) {
          status = 'error';
        } else if (filledFields.length === 0) {
          status = 'not_started';
        } else if (filledFields.length === requiredFields.length) {
          status = 'done';
        } else {
          status = 'in_progress';
        }
      } else if (section.id === 'general') {
        const requiredFields = ['person_name', 'gender', 'age_years', 'brought_by_list', 'sent_datetime', 'brought_datetime', 'exam_datetime', 'police_info', 'identifier_name'];
        const hasErrors = requiredFields.some(field => errors[field]);
        const filledFields = requiredFields.filter(field => {
          const value = (formData as any)[field];
          return isFieldMeaningfullyFilled(field, value);
        });
        
        if (hasErrors) {
          status = 'error';
        } else if (filledFields.length === 0) {
          status = 'not_started';
        } else if (filledFields.length === requiredFields.length) {
          status = 'done';
        } else {
          status = 'in_progress';
        }
      } else {
        // For other sections, only update if they've been opened or have data
                if (section.isOpen || hasSectionData(section.id)) {
          const sectionFields = getSectionFields(section.id);
          if (sectionFields.length > 0) {
            const filledFields = sectionFields.filter(field => {
              const value = (formData as any)[field];
              return isFieldMeaningfullyFilled(field, value);
            });
            if (filledFields.length === 0) {
              status = 'not_started';
            } else if (filledFields.length === sectionFields.length) {
              status = 'done';
            } else {
              status = 'in_progress';
            }
          } else {
            status = 'not_started';
          }
        } else {
          // Keep existing status for untouched sections
          status = section.status;
        }
      }
      
      return { ...section, status };
    }));
  };

  // Helper function to check if general section has any data
  const hasGeneralSectionData = (): boolean => {
    const generalFields = ['person_name', 'gender', 'age_years', 'brought_by_list', 'sent_datetime', 'brought_datetime', 'exam_datetime', 'police_info', 'identifier_name'];
    return generalFields.some(field => {
      const value = (formData as any)[field];
      if (field === 'brought_by_list') {
        return value && Array.isArray(value) && value.length > 0;
      }
      return value && value.toString().trim() !== '';
    });
  };

  // Helper function to check if a section has any data
  const hasSectionData = (sectionId: string): boolean => {
    const sectionFields = getSectionFields(sectionId);
    return sectionFields.some(field => {
      const value = (formData as any)[field];
      return value && value.toString().trim() !== '';
    });
  };

  // Helper function to check if a field is meaningfully filled
  const isFieldMeaningfullyFilled = (field: string, value: any): boolean => {
    if (!value) return false;
    
    if (field === 'brought_by_list') {
      return Array.isArray(value) && value.length > 0;
    }
    
    if (field === 'station') {
      // Station is filled if it has any value (including default)
      return value.toString().trim() !== '';
    }
    
    // For other fields, check if they have meaningful content
    const trimmedValue = value.toString().trim();
    return trimmedValue !== '' && trimmedValue !== 'undefined' && trimmedValue !== 'null';
  };

  // Helper function to get fields for each section
  const getSectionFields = (sectionId: string): string[] => {
    switch (sectionId) {
      case 'external_signs':
        return ['physique_state', 'wounds_desc', 'injuries_desc', 'neck_marks'];
      case 'head_spine':
        return ['scalp_skull_vertebrae', 'meninges', 'brain_spinal'];
      case 'chest_lungs':
        return ['ribs_cartilage', 'pleura', 'larynx_trachea_bronchi', 'right_lung', 'left_lung', 'pericardium', 'heart', 'blood_vessels'];
      case 'abdomen':
        return ['abdominal_general', 'peritoneum', 'mouth_trachea_esophagus', 'stomach_and_contents', 'small_intestine_and_contents', 'large_intestine_and_contents', 'liver', 'spleen', 'kidneys', 'urinary_bladder', 'genital_organs'];
      case 'musculoskeletal':
        return ['ms_wounds', 'ms_disease_variations', 'fractures', 'dislocations', 'detailed_pathology'];
      case 'opinions':
        return ['medical_officer_opinion', 'civil_surgeon_remark'];
      default:
        return [];
    }
  };

  useEffect(() => {
    updateSectionStatuses();
  }, [errors, formData]);

  // Load saved data on component mount
  useEffect(() => {
    loadSavedData();
  }, [loadSavedData]);

  // Cleanup auto-save timeout on unmount
  useEffect(() => {
    return () => {
      if ((window as any).autoSaveTimeout) {
        clearTimeout((window as any).autoSaveTimeout);
      }
    };
  }, []);

  return (
    <div className="container mx-auto p-6 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          {/* <Link href="/dashboard/admin/investigation-report">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link> */}
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
          <LanguageToggle />
          
          {/* Auto-save indicator */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            {isAutoSaving && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Auto-saving...</span>
              </div>
            )}
            {lastSaved && !isAutoSaving && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
          
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            {t('common.preview')}
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            {t('common.print')}
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            {t('common.save')}
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

        {/* Placeholder sections for future implementation */}
        {sections.slice(2).map((section) => (
          <FormSection
            key={section.id}
            section={section}
            onToggle={(isOpen) => handleSectionToggle(section.id, isOpen)}
          >
            <div className="text-center py-8 text-gray-500">
              <p>{section.title} section will be implemented in the next phase</p>
            </div>
          </FormSection>
                 ))}
       </div>
       
       {/* Toast notifications */}
       <Toaster />
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
