'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { HeaderSection } from '@/components/investigation/HeaderSection';
import { GeneralSection } from '@/components/investigation/GeneralSection';
import ExternalSignsSection from '@/components/investigation/ExternalSignsSection';
import HeadSpineSection from '@/components/investigation/HeadSpineSection';
import ChestLungsSection from '@/components/investigation/ChestLungsSection';
import AbdomenSection from '@/components/investigation/AbdomenSection';
import MusculoskeletalSection from '@/components/investigation/MusculoskeletalSection';
import { Button } from '@/components/ui/button';
import { Save, Eye, Printer } from 'lucide-react';
import { InvestigationReport } from '@/types/investigation';

// Tab configuration
const tabs = [
  { id: 'header', label: 'Header', component: 'HeaderSection' },
  { id: 'general', label: 'General', component: 'GeneralSection' },
  { id: 'external_signs', label: 'External Signs', component: 'ExternalSignsSection' },
  { id: 'head_spine', label: 'Head & Spine', component: 'HeadSpineSection' },
  { id: 'chest_lungs', label: 'Chest & Lungs', component: 'ChestLungsSection' },
  { id: 'abdomen', label: 'Abdomen', component: 'AbdomenSection' },
  { id: 'musculoskeletal', label: 'Musculoskeletal', component: 'MusculoskeletalSection' },
];

const CreateReportPageDesign2 = () => {
  const [formData, setFormData] = useState<Partial<InvestigationReport>>({
    brought_by_list: [],
    station: 'DMC MORGUE',
    case_type: 'none',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('header');

  const { t, language } = useLanguage();

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
    
    // Update tab status based on field changes
    // updateTabStatus(activeTab); // This function is no longer needed
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
      return 'text-blue-600 border-blue-600 bg-blue-50';
    }
    return 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300';
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
      default:
        return <HeaderSection {...commonProps} />;
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      try {
        console.log('Form data saved:', formData);
        // Add success message or redirect logic here
      } catch (error) {
        console.error('Save failed:', error);
      }
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {language === 'bn' ? "ময়না তদন্ত রিপোর্ট - ডিজাইন ২" : "Create Investigation Report - Design 2"}
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
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
            {tabs.map((tab) => (
              <li key={tab.id} className="me-2" role="presentation">
                <button
                  className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${activeTab === tab.id ? getStatusColor('', true) : getStatusColor('', false)}`}
                  onClick={() => handleTabClick(tab.id)}
                  type="button"
                  role="tab"
                  aria-controls={tab.id}
                  aria-selected={activeTab === tab.id}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default CreateReportPageDesign2;
