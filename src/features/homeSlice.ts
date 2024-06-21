import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_URL } from '../_env';
import axios from 'axios';
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
    url: string;
    date_from: string;
    date_to: string;
    location_id: string;
    created_at: string;
    updated_at: string;
    portrait: string;
    title_ar: string;
    sub_title_ar: string | null;
    pivot: {
        category_id: number;
        event_id: number;
    };
    location: LocationType; // Added location property
};

export type MainCatType = {
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
    events: EventType[];
};
export type CategoryType = {
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
};
export type HomeDataType = {
    teaser_url: string;
    google_play_url: string;
    play_store_url: string;
    facebook_url: string;
    instagram_url: string;
    linkedin_url: string;
    main_cat: MainCatType;
    amazing_sponsors: Array<{
        id: number;
        image_path: string;
        name: string;
        link: string;
        isTop: number;
        created_at: string;
        updated_at: string;
        name_ar: string;
    }>;
    today_events: Array<{
        id: number;
        title: string;
        sub_title: string;
        cover: string;
        thumbnail: string;
        landscape: string;
        categories: string;
        url: string;
        date_from: string;
        date_to: string;
        location_id: string;
        created_at: string;
        updated_at: string;
        portrait: string;
        title_ar: string;
        sub_title_ar: string;
        event_categories: CategoryType[];
        location: LocationType;
    }>;
    tomorrow_events: Array<{
        id: number;
        title: string;
        sub_title: string;
        cover: string;
        thumbnail: string;
        landscape: string;
        categories: string;
        url: string;
        date_from: string;
        date_to: string;
        location_id: string;
        created_at: string;
        updated_at: string;
        portrait: string;
        title_ar: string;
        sub_title_ar: string;
        event_categories: CategoryType[];
        location: LocationType;
    }>;
    upcoming_events: Array<{
        id: number;
        title: string;
        sub_title: string;
        cover: string;
        thumbnail: string;
        landscape: string;
        categories: string;
        url: string;
        date_from: string;
        date_to: string;
        location_id: string;
        created_at: string;
        updated_at: string;
        portrait: string;
        title_ar: string;
        sub_title_ar: string;
        event_categories: CategoryType[];
        location: LocationType;
    }>;
    main_restaurants: Array<{
        id: number;
        photo_path: string;
        title: string;
        sub_title: string;
        location_id: number;
        phone: string;
        working_from: string;
        working_to: string;
        created_at: string;
        updated_at: string;
        title_ar: string;
        description: string;
        description_ar: string;
        sub_title_ar: string;
    }>;
    all_sponsors: Array<{
        id: number;
        image_path: string;
        name: string;
        link: string;
        isTop: number;
        created_at: string;
        updated_at: string;
        name_ar: string;
    }>;
    notes: Array<string>;
};

interface GetHomeResponse {
    data: HomeDataType;
    status: boolean;
    message: string;
    errors: string[];
}

export const getHomeData = createAsyncThunk<GetHomeResponse>(
    'home/getHomeData',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<GetHomeResponse>(`${API_URL}/api/get-home`);
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch home data: ${error}`);
        }
    }
);

interface HomeState {
    homeData: HomeDataType | null;
    loading: boolean;
    error: string | null;
}

const initialState: HomeState = {
    homeData: null,
    loading: false,
    error: null,
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setHomeData: (state, action: PayloadAction<HomeDataType | null>) => {
            state.homeData = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHomeData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHomeData.fulfilled, (state, action) => {
                state.loading = false;
                state.homeData = action.payload.data;
            })
            .addCase(getHomeData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setHomeData, setError } = homeSlice.actions;

export default homeSlice.reducer;
