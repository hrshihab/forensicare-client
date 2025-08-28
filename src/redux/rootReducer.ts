import { baseApi } from "./api/baseApi";
import { localApi } from './api/localApi';
import headerFacilityReducer from './slices/headerFacilitySlice';

export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    [localApi.reducerPath]: localApi.reducer,
    headerFacility: headerFacilityReducer,
}
