import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
interface SettingState {
    lang: string
}

const initialState: SettingState = {
    lang: "en",
};



const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.lang = action.payload;
        },
    },
});

export const { setLanguage } = settingSlice.actions;

export default settingSlice.reducer;
