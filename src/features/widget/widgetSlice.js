import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    loading: false,
    error: null,
};

const widgetSlice = createSlice({
    name: 'widget',
    initialState,
    reducers: {
        // Action ini akan memicu saga untuk memulai fetch data
        fetchData(state) {
            state.loading = true;
            state.error = null;
        },
        // Action jika fetch berhasil
        fetchDataSuccess(state, action) {
            state.loading = false;
            state.data = action.payload;
        },
        // Action jika fetch gagal
        fetchDataFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchData, fetchDataSuccess, fetchDataFailure } = widgetSlice.actions;
export default widgetSlice.reducer;