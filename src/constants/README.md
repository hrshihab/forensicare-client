# Centralized Dropdown Values System

This system provides centralized management of dropdown values for the ForensiCare application, ensuring consistency across all components and proper language handling.

## Overview

The system centralizes dropdown values for three main fields:
- **Thana** (Police Station)
- **Gender** 
- **Case Type**

## Key Features

✅ **Centralized Values**: All dropdown options defined in one place  
✅ **Dual Language Support**: Bengali and English labels  
✅ **Consistent Storage**: Values remain the same regardless of language toggle  
✅ **Type Safety**: Full TypeScript support with interfaces  
✅ **Easy Maintenance**: Add/modify options in one location  

## File Structure

```
src/constants/
├── dropdownValues.ts          # Main dropdown data and utilities
└── README.md                  # This documentation

src/hooks/
└── useDropdownValues.ts       # Custom hook for easy access
```

## Usage Examples

### 1. Basic Component Usage

```typescript
import { useDropdownValues } from '@/hooks/useDropdownValues';

const MyComponent = () => {
  const { genderOptions, getLabel } = useDropdownValues();
  
  return (
    <Select>
      <SelectContent>
        {genderOptions.map((gender) => (
          <SelectItem key={gender.value} value={gender.value}>
            {getLabel(genderOptions, gender.value)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
```

### 2. Direct Import Usage

```typescript
import { GENDER_OPTIONS, getLocalizedLabel } from '@/constants/dropdownValues';

const MyComponent = () => {
  const { language } = useLanguage();
  
  return (
    <Select>
      <SelectContent>
        {GENDER_OPTIONS.map((gender) => (
          <SelectItem key={gender.value} value={gender.value}>
            {getLocalizedLabel(GENDER_OPTIONS, gender.value, language)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
```

### 3. Getting Display Value for Form Fields

```typescript
const { getDisplayValue } = useDropdownValues();

// Get localized label for a stored value
const genderLabel = getDisplayValue('gender', formData.gender);
// Returns: "পুরুষ" (Bengali) or "Male" (English)
```

## Data Structure

### DropdownOption Interface

```typescript
interface DropdownOption {
  value: string;        // Stored value (always in English)
  label_bn: string;     // Bengali display label
  label_en: string;     // English display label
}
```

### Example Data

```typescript
export const GENDER_OPTIONS: DropdownOption[] = [
  { value: 'male', label_bn: 'পুরুষ', label_en: 'Male' },
  { value: 'female', label_bn: 'মহিলা', label_en: 'Female' },
  { value: 'other', label_bn: 'অন্যান্য', label_en: 'Other' }
];
```

## Language Toggle Behavior

**Important**: When users toggle language, only the display labels change. The stored values remain constant.

```typescript
// User selects "পুরুষ" (Bengali) or "Male" (English)
// Stored value: "male" (always the same)

// Language toggle from Bengali to English:
// Display changes: "পুরুষ" → "Male"
// Stored value remains: "male"
```

## Adding New Options

### 1. Add to Constants File

```typescript
// In src/constants/dropdownValues.ts
export const NEW_OPTIONS: DropdownOption[] = [
  { value: 'new_value', label_bn: 'নতুন মান', label_en: 'New Value' }
];
```

### 2. Update Helper Functions

```typescript
export const getDropdownOptions = (type: 'thana' | 'gender' | 'case_type' | 'new_type'): DropdownOption[] => {
  switch (type) {
    // ... existing cases
    case 'new_type':
      return NEW_OPTIONS;
    default:
      return [];
  }
};
```

### 3. Update Hook

```typescript
// In src/hooks/useDropdownValues.ts
const { newOptions } = useDropdownValues();
```

## Best Practices

1. **Always use the centralized constants** instead of hardcoding values
2. **Use the custom hook** for cleaner component code
3. **Maintain consistent value naming** (lowercase, descriptive)
4. **Test both languages** when adding new options
5. **Keep Bengali labels accurate** and culturally appropriate

## Migration from Hardcoded Values

### Before (Don't do this)
```typescript
<SelectItem value="male">{language === 'bn' ? 'পুরুষ' : 'Male'}</SelectItem>
<SelectItem value="female">{language === 'bn' ? 'মহিলা' : 'Female'}</SelectItem>
```

### After (Do this)
```typescript
import { useDropdownValues } from '@/hooks/useDropdownValues';

const { genderOptions, getLabel } = useDropdownValues();

{genderOptions.map((gender) => (
  <SelectItem key={gender.value} value={gender.value}>
    {getLabel(genderOptions, gender.value)}
  </SelectItem>
))}
```

## Benefits

- **Maintainability**: Change options in one place
- **Consistency**: Same values across all components
- **Language Support**: Automatic Bengali/English switching
- **Type Safety**: Full TypeScript support
- **Performance**: No inline language checks
- **Scalability**: Easy to add new dropdown types
