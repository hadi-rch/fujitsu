import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../tasks/tasksSlice';
import { Card, Title, Input, Select, Button } from '../../components/ui/Styled';

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
        <Card>
            <Title>Tambah Tugas Baru</Title>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem' }}>
                <Input
                    type="text"
                    placeholder="Tulis tugas baru di sini..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    {categories.length === 0 && <option disabled>Buat kategori dulu!</option>}
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </Select>
                <Button type="submit">Tambah</Button>
            </form>
        </Card>
    );
};

export default AddTaskForm;