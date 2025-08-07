import React, { useState } from 'react';
import AddTaskForm from './features/tasks/AddTaskForm';
import TaskList from './features/tasks/TaskList';
import FilterControls from './features/filters/FilterControls';
import ApiWidget from './features/widget/ApiWidget';
import CategoryManager from './features/categories/CategoryManager';

function App() {
    const [isCategoryManagerOpen, setCategoryManagerOpen] = useState(false);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto' }}>
            {isCategoryManagerOpen && <CategoryManager onClose={() => setCategoryManagerOpen(false)} />}

            <h1>Aplikasi To-Do List</h1>
            <ApiWidget />
            <p style={{ marginTop: '20px' }}>Ini adalah prototipe aplikasi to-do list yang berjalan offline.</p>

            <h2>Tambah Tugas Baru</h2>
            <AddTaskForm />

            <hr style={{ margin: '30px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Filter & Cari Tugas</h2>
                <button onClick={() => setCategoryManagerOpen(true)}>Kelola Kategori</button>
            </div>
            <FilterControls />

            <h2 style={{ marginTop: '20px' }}>Daftar Tugas</h2>
            <TaskList />
        </div>
    );
}

export default App;