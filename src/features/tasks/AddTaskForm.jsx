import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../tasks/tasksSlice';

const AddTaskForm = () => {
    const [text, setText] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const dispatch = useDispatch();

    const categories = useSelector(state => state.categories.items);

    useState(() => {
        if (categories.length > 0) {
            setCategoryId(categories[0].id);
        }
    }, [categories]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && categoryId) {
            dispatch(addTask({ text, categoryId }));
            setText('');
        } else if (!categoryId) {
            alert('Silakan tambah kategori terlebih dahulu!');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
            <input
                type="text"
                placeholder="Apa yang ingin Anda kerjakan?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ flexGrow: 1, padding: '8px' }}
            />
            <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                style={{ padding: '8px' }}
            >
                <option value="" disabled>-- Pilih Kategori --</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>
            <button type="submit" style={{ padding: '8px' }}>
                Tambah Tugas
            </button>
        </form>
    );
};

export default AddTaskForm;