import { useLanguage } from '@/contexts/LanguageContext';
import { 
  THANA_OPTIONS, 
  GENDER_OPTIONS, 
  CASE_TYPE_OPTIONS, 
  getLocalizedLabel,
  type DropdownOption 
} from '@/constants/dropdownValues';

export const useDropdownValues = () => {
  const { language } = useLanguage();

  // Helper function to get localized label for any dropdown value
  const getLabel = (options: DropdownOption[], value: string): string => {
    return getLocalizedLabel(options, value, language);
  };

  // Helper function to get display value for form fields
  const getDisplayValue = (type: 'thana' | 'gender' | 'case_type', value: string): string => {
    const options = getDropdownOptions(type);
    return getLabel(options, value);
  };

  // Get all options for a specific dropdown type
  const getDropdownOptions = (type: 'thana' | 'gender' | 'case_type'): DropdownOption[] => {
    switch (type) {
      case 'thana':
        return THANA_OPTIONS;
      case 'gender':
        return GENDER_OPTIONS;
      case 'case_type':
        return CASE_TYPE_OPTIONS;
      default:
        return [];
    }
  };

  return {
    // Raw options arrays
    thanaOptions: THANA_OPTIONS,
    genderOptions: GENDER_OPTIONS,
    caseTypeOptions: CASE_TYPE_OPTIONS,
    
    // Helper functions
    getLabel,
    getDisplayValue,
    getDropdownOptions,
    
    // Current language
    language
  };
};
