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
};

export type AdType = {
    id: number;
    photo_path: string;
    title: string;
    link: string;
    description: string;
    thumbnail: string;
    created_at: string;
    updated_at: string;
    title_ar: string;
    description_ar: string;
    type: string;
    location: LocationType;
};

export type TopEventType = {
    id: number;
    item_id: number;
    type: number;
    sort: number;
    item: EventType | AdType;
};

interface GetTopEventsResponse {
    status: boolean;
    message: string;
    errors: string[];
    data: TopEventType[];
    notes: {
        type: {
            [key: number]: string;
        };
    };
}

export const getTopEvents = createAsyncThunk<GetTopEventsResponse>(
    'events/getTopEvents',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<GetTopEventsResponse>(`${API_URL}/api/events/top`);
            return response.data;
        } catch (error) {
            return rejectWithValue(`Failed to fetch top events: ${error}`);
        }
    }
);

export const getEventById = createAsyncThunk<EventType, number, { rejectValue: string }>(
    'events/getEventById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.post<{status: boolean, message: string, errors: string[], data: EventType}>(`${API_URL}/api/events/event?id=${id}`);
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

interface EventsState {
    topEvents: TopEventType[] | null;
    eventById: EventType | null;
    loading: boolean;
    error: string | null;
}

const initialState: EventsState = {
    topEvents: null,
    eventById: null,
    loading: false,
    error: null,
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setTopEvents: (state, action: PayloadAction<TopEventType[] | null>) => {
            state.topEvents = action.payload;
        },
        setEventById: (state, action: PayloadAction<EventType | null>) => {
            state.eventById = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTopEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTopEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.topEvents = action.payload.data;
            })
            .addCase(getTopEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getEventById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEventById.fulfilled, (state, action) => {
                state.loading = false;
                state.eventById = action.payload;
            })
            .addCase(getEventById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setTopEvents, setEventById, setError } = eventsSlice.actions;

export default eventsSlice.reducer;
