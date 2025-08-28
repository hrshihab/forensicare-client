import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateField, updateMultipleFields as updateMultipleFieldsAction, resetData, loadFromStorage as loadFromStorageAction } from '@/redux/slices/headerFacilitySlice';
import { HeaderFacilityData } from '@/redux/slices/headerFacilitySlice';

export const useHeaderFacility = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.headerFacility);

  const updateFieldValue = (field: keyof HeaderFacilityData, value: any) => {
    dispatch(updateField({ field, value }));
  };

  const updateMultipleFields = (fields: Partial<HeaderFacilityData>) => {
    dispatch(updateMultipleFieldsAction(fields));
  };

  const resetHeaderFacility = () => {
    dispatch(resetData());
  };

  const loadFromStorage = () => {
    dispatch(loadFromStorageAction());
  };

  return {
    data,
    updateFieldValue,
    updateMultipleFields,
    resetHeaderFacility,
    loadFromStorage,
  };
};
