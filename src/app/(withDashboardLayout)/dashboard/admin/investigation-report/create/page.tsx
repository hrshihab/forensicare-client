'use client';

import React, { useState, useEffect } from 'react';
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
import OpinionsSection from '@/components/investigation/OpinionsSection';
import { Button } from '@/components/ui/button';
import { Save, Eye, Printer } from 'lucide-react';
import { InvestigationReport, FormSection as FormSectionType } from '@/types/investigation';

const CreateReportForm: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<Partial<InvestigationReport>>({
    brought_by_list: [],
    station: 'DMC MORGUE', // Set default station value
    case_type: 'none', // Set default case type to none
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
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
        
        console.log('Form data saved:', formData);
      } catch (error) {
        console.error('Save failed:', error);
      }
    }
  };

  const updateSectionStatuses = () => {
    setSections(prev => prev.map(section => {
      let status: 'not_started' | 'in_progress' | 'done' | 'error' | 'skipped' = 'not_started';
      
      if (section.id === 'header') {
        const requiredFields = ['thana_id', 'gd_cid_case_no', 'ref_date', 'pm_no', 'report_date', 'station', 'case_type'];
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
      } else if (section.id === 'opinions') {
        const requiredFields = ['medical_officer_opinion', 'civil_surgeon_remark'];
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
    
    if (field === 'case_type') {
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
          <LanguageToggle />
          
          <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm">
            <Printer className="w-4 h-4 mr-2" />
            Print
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
