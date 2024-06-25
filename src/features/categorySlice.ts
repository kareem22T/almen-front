import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios"
import { API_URL } from '../_env';

// Type Definitions
type EventType = {
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
    sub_title_ar: string;
    pivot: {
        category_id: number;
        event_id: number;
    };
    location: {
        id: number;
        sub_title: string;
        title: string;
        url: string;
        thumbnail_path: string;
        created_at: string;
        updated_at: string;
        title_ar: string;
        sub_title_ar: string;
        cover_path: string;
    };
};

type CategoryType = {
    id: number;
    svg_icon: string;
    thumbnail_path: string;
    cover_path: string;
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    created_at: string;
    updated_at: string;
    events: EventType[];
};

type GetCategoriesResponse = {
    status: boolean;
    message: string;
    errors: string[];
    data: CategoryType[];
    notes: string[];
};

// Async Thunk for Fetching Categories
export const getCategories = createAsyncThunk<GetCategoriesResponse>(
    'categories/getCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<GetCategoriesResponse>(API_URL + '/api/categories/get');
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch categories: ${error}`);
        }
    }
);

// Initial State
interface CategoriesState {
    categories: CategoryType[] | null;
    loading: boolean;
    error: string | null;
}

const initialState: CategoriesState = {
    categories: null,
    loading: false,
    error: null,
};

// Create Slice
const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategories.fulfilled, (state, action: PayloadAction<GetCategoriesResponse>) => {
                state.loading = false;
                state.categories = action.payload.data;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default categoriesSlice.reducer;
