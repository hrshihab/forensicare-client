import { baseApi } from "./api/baseApi";
import { localApi } from './api/localApi';

export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    [localApi.reducerPath]: localApi.reducer,
}
