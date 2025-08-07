import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    items: [
        { id: 'cat-1', name: 'Pribadi' },
        { id: 'cat-2', name: 'Kantor' },
        { id: 'cat-3', name: 'Belanja' },
    ],
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: {
            reducer(state, action) {
                state.items.push(action.payload);
            },
            prepare(name) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                    },
                };
            },
        },
        editCategory(state, action) {
            const { id, newName } = action.payload;
            const category = state.items.find(cat => cat.id === id);
            if (category) {
                category.name = newName;
            }
        },
        deleteCategory(state, action) {
            const { id } = action.payload;
            state.items = state.items.filter(cat => cat.id !== id);
        },
    },
});

export const { addCategory, editCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;