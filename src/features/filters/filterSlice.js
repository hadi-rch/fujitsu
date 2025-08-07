import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'All', 
    category: 'All',
    searchTerm: '',
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setStatusFilter(state, action) {
            state.status = action.payload;
        },
        setCategoryFilter(state, action) {
            state.category = action.payload;
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
    },
});

export const { setStatusFilter, setCategoryFilter, setSearchTerm } = filterSlice.actions;

export default filterSlice.reducer;