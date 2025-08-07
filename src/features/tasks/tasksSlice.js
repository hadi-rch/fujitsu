import { createSlice, nanoid } from '@reduxjs/toolkit';
import { deleteCategory, editCategory } from '../categories/categoriesSlice';

const initialState = {
    items: [
        { id: '1', text: 'Mengerjakan Laporan Bulanan', completed: false, category: 'Kantor' },
        { id: '2', text: 'Beli susu dan roti', completed: true, category: 'Pribadi' },
        { id: '3', text: 'Jadwalkan meeting dengan tim', completed: false, category: 'Kantor' },
    ],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // Action untuk menambah tugas baru
        addTask: {
            reducer(state, action) {
                state.items.push(action.payload);
            },
            prepare({text, categoryId}) { // prepare callback untuk memformat payload
                return {
                    payload: {
                        id: nanoid(),
                        text: text,
                        completed: false,
                        categoryId: categoryId
                    },
                };
            },
        },
        // Action untuk menandai tugas (selesai/belum)
        toggleTask(state, action) {
            const task = state.items.find(task => task.id === action.payload.id);
            if (task) {
                task.completed = !task.completed;
            }
        },
        // Action untuk menghapus tugas
        deleteTask(state, action) {
            state.items = state.items.filter(task => task.id !== action.payload.id);
        },
        // Action untuk mengedit teks tugas
        editTask(state, action) {
            const { id, newText, newCategoryId } = action.payload;
            const task = state.items.find(task => task.id === id);
            if (newText !== undefined) {
                task.text = newText;
            }
            if (newCategoryId !== undefined) {
                task.categoryId = newCategoryId;
            }
        },
        // Action untuk mengurutkan ulang tugas
        reorderTasks(state, action) {
            const { oldIndex, newIndex } = action.payload;
            // Pindahkan item dari oldIndex ke newIndex dalam array
            const [movedItem] = state.items.splice(oldIndex, 1);
            state.items.splice(newIndex, 0, movedItem);
        },

        extraReducers: (builder) => {
            builder
                .addCase(editCategory, (state, action) => {
                    // Ini tidak perlu melakukan apa-apa pada tugas, karena kita akan mengambil nama kategori berdasarkan ID-nya nanti.
                })
                .addCase(deleteCategory, (state, action) => {
                    const deletedCategoryId = action.payload.id;
                    state.items.forEach(task => {
                        if (task.categoryId === deletedCategoryId) {
                            task.categoryId = null; 
                        }
                    });
                });
        }

    },
});

export const { addTask, toggleTask, deleteTask, editTask, reorderTasks } = tasksSlice.actions;

export default tasksSlice.reducer;