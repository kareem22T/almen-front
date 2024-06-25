import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios"
import { API_URL } from '../_env';

export type LocationType = {
    id: number;
    sub_title: string;
    title: string;
    url: string;
    thumbnail_path: string;
    created_at: string;
    updated_at: string;
    title_ar: string;
    sub_title_ar: string | null;
};

export type EventType = {
    id: number;
    title: string;
    sub_title: string;
    cover: string;
    thumbnail: string;
    landscape: string;
    categories: string;
    photo_path: string;
    url: string | null;
    date_from: string;
    date_to: string;
    location_id: string;
    created_at: string;
    updated_at: string;
    link: string;
    portrait: string;
    title_ar: string;
    sub_title_ar: string;
    type: string;
    location: LocationType;
    related_events: EventType[]
};

type ServiceType = {
    id: number;
    photo_path: string;
    title: string;
    sub_title: string;
    location_id: number;
    phone: string;
    website: string;
    working_from: string;
    working_to: string;
    created_at: string;
    updated_at: string;
    title_ar: string;
    description: string;
    description_ar: string;
    sub_title_ar: string;
    location: LocationType;
    relatedEvants: EventType[]
};

type GetServiceRespons = {
    status: boolean;
    message: string;
    errors: string[];
    data: ServiceType[];
    notes: string[];
};

// Async Thunk for Fetching Services
export const getServices = createAsyncThunk<GetServiceRespons>(
    'services/getServices',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<GetServiceRespons>(API_URL + '/api/restaurants/get');
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch services: ${error}`);
        }
    }
);
export const getServiceById = createAsyncThunk<ServiceType, number, { rejectValue: string }>(
    'services/getServiceById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get<{status: boolean, message: string, errors: string[], data: ServiceType}>(`${API_URL}/api/restaurants/service?id=${id}`);
            if (response.data.status) {
                return response.data.data;
            } else {
                return rejectWithValue('Failed to fetch event by ID');
            }
        } catch (error) {
            return rejectWithValue(`Failed to fetch event by ID: ${error}`);
        }
    }
);


// Initial State
interface ServicesState {
    services: ServiceType[] | null;
    serviceById: ServiceType | null
    loading: boolean;
    error: string | null;
}

const initialState: ServicesState = {
    services: null,
    serviceById: null,
    loading: false,
    error: null,
};

// Create Slice
const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getServices.fulfilled, (state, action: PayloadAction<GetServiceRespons>) => {
                state.loading = false;
                state.services = action.payload.data;
            })
            .addCase(getServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getServiceById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getServiceById.fulfilled, (state, action) => {
                state.loading = false;
                state.serviceById = action.payload;
            })
            .addCase(getServiceById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

    },
});

export default servicesSlice.reducer;
