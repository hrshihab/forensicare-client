import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface HeaderFacilityData {
  // Report Information
  memo_no: string;
  date: string;
  institution_name: string;
  institution_address: string;
  
  // Case Information
  source_thana: string;
  case_type: string;
  case_no: string;
  case_issue_date: string;
  
  // Victim Identity
  victim_name: string;
  victim_age: string;
  victim_gender: string;
  victim_religion: string;
  victim_occupation: string;
  guardian_type: string;
  guardian_name: string;
  victim_address: string;
  
  // Identifier/Bringer
  identifier_name: string;
  identifier_address: string;
  
  // Consent
  witnesses: string[];
  _witness_input: string;
}

const initialState: HeaderFacilityData = {
  memo_no: '',
  date: '',
  institution_name: 'ফরেনসিক মেডিসিন বিভাগ',
  institution_address: 'ঢাকা মেডিকেল কলেজ, ঢাকা',
  source_thana: '',
  case_type: '',
  case_no: '',
  case_issue_date: '',
  victim_name: '',
  victim_age: '',
  victim_gender: '',
  victim_religion: '',
  victim_occupation: '',
  guardian_type: '',
  guardian_name: '',
  victim_address: '',
  identifier_name: '',
  identifier_address: '',
  witnesses: [],
  _witness_input: '',
};

// Load from localStorage on slice initialization
const loadFromStorageOnInit = (): HeaderFacilityData => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('headerFacilityData');
    if (stored) {
      try {
        return { ...initialState, ...JSON.parse(stored) };
      } catch (error) {
        console.error('Error parsing stored header facility data:', error);
      }
    }
  }
  return initialState;
};

const headerFacilitySlice = createSlice({
  name: 'headerFacility',
  initialState: loadFromStorageOnInit(),
  reducers: {
    updateField: (state, action: PayloadAction<{ field: keyof HeaderFacilityData; value: any }>) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('headerFacilityData', JSON.stringify(state));
      }
    },
    
    updateMultipleFields: (state, action: PayloadAction<Partial<HeaderFacilityData>>) => {
      Object.assign(state, action.payload);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('headerFacilityData', JSON.stringify(state));
      }
    },
    
    resetData: (state) => {
      Object.assign(state, initialState);
      
      // Clear from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('headerFacilityData');
      }
    },
    
    loadFromStorage: (state) => {
      const stored = loadFromStorageOnInit();
      Object.assign(state, stored);
    },
  },
});

export const { updateField, updateMultipleFields, resetData, loadFromStorage } = headerFacilitySlice.actions;
export default headerFacilitySlice.reducer;
