'use client';

import React, { useState, useEffect } from 'react';
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

const CreateReportForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<Partial<InvestigationReport>>({
    brought_by_list: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sections, setSections] = useState<FormSectionType[]>([
    {
      id: 'header',
      title: 'Header',
      title_bn: 'হেডার',
      isOpen: true,
      status: 'in_progress',
      required: true,
    },
    {
      id: 'general',
      title: 'General Information',
      title_bn: 'সাধারণ তথ্য',
      isOpen: false,
      status: 'in_progress',
      required: true,
    },
    {
      id: 'external_signs',
      title: 'External Signs',
      title_bn: 'বাহ্যিক লক্ষণ',
      isOpen: false,
      status: 'in_progress',
      required: false,
    },
    {
      id: 'head_spine',
      title: 'Head & Spine',
      title_bn: 'মাথার খুলী/মেরুদণ্ড নাল',
      isOpen: false,
      status: 'in_progress',
      required: false,
    },
    {
      id: 'chest_lungs',
      title: 'Chest & Lungs',
      title_bn: 'বক্ষ ও ফুসফুস',
      isOpen: false,
      status: 'in_progress',
      required: false,
    },
    {
      id: 'abdomen',
      title: 'Abdomen',
      title_bn: 'উদর',
      isOpen: false,
      status: 'in_progress',
      required: false,
    },
    {
      id: 'musculoskeletal',
      title: 'Musculoskeletal',
      title_bn: 'মাংসপেশী/হাড়/জয়ন্ট',
      isOpen: false,
      status: 'in_progress',
      required: false,
    },
    {
      id: 'opinions',
      title: 'Opinions',
      title_bn: 'মতামত',
      isOpen: false,
      status: 'in_progress',
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

    // Header validation
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
    if (!formData.place) {
      newErrors.place = t('validation.required_field');
    }

    // General validation
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

    // Date validation
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
      // Save logic here
      console.log('Form data:', formData);
      // Update section statuses
      updateSectionStatuses();
    }
  };

  const updateSectionStatuses = () => {
    setSections(prev => prev.map(section => {
      let status: 'done' | 'in_progress' | 'error' | 'skipped' = 'in_progress';
      
      if (section.id === 'header') {
        const hasErrors = ['thana_id', 'gd_cid_case_no', 'ref_date', 'pm_no', 'report_date', 'place']
          .some(field => errors[field]);
        status = hasErrors ? 'error' : 'done';
      } else if (section.id === 'general') {
        const hasErrors = ['person_name', 'gender', 'age_years', 'brought_by_list', 'sent_datetime', 'brought_datetime', 'exam_datetime', 'police_info', 'identifier_name']
          .some(field => errors[field]);
        status = hasErrors ? 'error' : 'done';
      }
      
      return { ...section, status };
    }));
  };

  useEffect(() => {
    updateSectionStatuses();
  }, [errors]);

  return (
    <div className="container mx-auto p-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Sections */}
        <div className="lg:col-span-2 space-y-4">
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

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sections.map((section) => (
                  <div key={section.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {t(`investigation.sections.${section.id}`)}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      section.status === 'done' ? 'bg-green-100 text-green-800' :
                      section.status === 'error' ? 'bg-red-100 text-red-800' :
                      section.status === 'skipped' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {t(`status.${section.status}`)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Printer className="w-4 h-4 mr-2" />
                  Print Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
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
