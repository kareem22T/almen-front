import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../_env';

// Define TypeScript types for the API response structure
export type LocationType = {
    title: string;
    sub_title: string;
    thumbnail_path: string;
    url: string;
    title_ar: string;
    sub_title_ar: string;
    categories: CategoryWithEventsType[];
};

export type EventCategoryType = {
    id: number;
    thumbnail_path: string;
    cover_path: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    title_ar: string;
    description_ar: string;
    svg_icon: string;
    pivot: {
        event_id: number;
        category_id: number;
    };
};

export type EventType = {
    id: number;
    title: string;
    sub_title: string;
    cover: string;
    thumbnail: string;
    landscape: string;
    categories: string;
    url: string | null;
    date_from: string;
    date_to: string;
    location_id: string;
    created_at: string;
    updated_at: string;
    portrait: string;
    title_ar: string;
    sub_title_ar: string | null;
    event_categories: EventCategoryType[];
};

export type CategoryWithEventsType = {
    name: string;
    name_ar: string;
    svg_icon: string;
    events: EventType[];
};

interface GetLocationResponse {
    status: boolean;
    message: string;
    errors: string[];
    data: {
        title: string;
        sub_title: string;
        title_ar: string;
        sub_title_ar: string;
        thumbnail_path: string;
        url: string;
        categories: CategoryWithEventsType[];
    };
    notes: {
        search: string;
    };
}

export const getLocation = createAsyncThunk<GetLocationResponse, number>(
    'location/getLocation',
    async (locationId, { rejectWithValue }) => {
        try {
            const response = await axios.post<GetLocationResponse>(`${API_URL}/api/locations/location?id=${locationId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch location details: ${error}`);
        }
    }
);

interface LocationState {
    location: LocationType | null;
    categories: CategoryWithEventsType[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: LocationState = {
    location: null,
    categories: null,
    loading: false,
    error: null,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation: (state, action: PayloadAction<LocationType | null>) => {
            state.location = action.payload;
        },
        setCategories: (state, action: PayloadAction<CategoryWithEventsType[] | null>) => {
            state.categories = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.location = action.payload.data;
                state.categories = action.payload.data.categories;
            })
            .addCase(getLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setLocation, setCategories, setError } = locationSlice.actions;

export default locationSlice.reducer;
