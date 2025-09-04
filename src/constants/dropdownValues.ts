// Centralized dropdown values for the application
// This ensures consistent values across all components and proper language handling
import { THANA_OPTIONS } from "./thana";


export interface DropdownOption {
  value: string;
  label_bn: string;
  label_en: string;
}






// Gender options
export const GENDER_OPTIONS: DropdownOption[] = [
  { value: 'male', label_bn: 'পুরুষ', label_en: 'Male' },
  { value: 'female', label_bn: 'মহিলা', label_en: 'Female' },
  { value: 'other', label_bn: 'অন্যান্য', label_en: 'Other' }
];

// Case type options
export const CASE_TYPE_OPTIONS: DropdownOption[] = [
  { value: 'none', label_bn: 'কোনটি নয়', label_en: 'None' },
  { value: 'GD', label_bn: 'জিডি', label_en: 'GD' },
  { value: 'CID', label_bn: 'সিআইডি', label_en: 'CID' },
  { value: 'CASE', label_bn: 'মামলা', label_en: 'Case' },
  { value: 'Others', label_bn: 'অন্যান্য', label_en: 'Others' }
];

// Helper function to get localized label based on current language
export const getLocalizedLabel = (options: DropdownOption[], value: string, language: 'bn' | 'en'): string => {
  const option = options.find(opt => opt.value === value);
  if (!option) return value; // Fallback to value if option not found
  
  return language === 'bn' ? option.label_bn : option.label_en;
};

// Helper function to get all options for a specific dropdown type
export const getDropdownOptions = (type: 'gender' | 'case_type'): DropdownOption[] => {
  switch (type) {
    case 'gender':
      return GENDER_OPTIONS;
    case 'case_type':
      return CASE_TYPE_OPTIONS;
    default:
      return [];
  }
};
