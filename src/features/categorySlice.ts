import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios"
import { API_URL } from '../_env';

// Type Definitions
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

// Slice
const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<CategoryType[] | null>) => {
            state.categories = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.data;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

// Exports
export const { setCategories, setError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
