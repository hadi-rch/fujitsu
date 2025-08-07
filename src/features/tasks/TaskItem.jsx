import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { toggleTask, deleteTask, editTask } from './tasksSlice';
import { Button, Input, Select } from '../../components/ui/Styled';

const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.items);

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ text: task.text, categoryId: task.categoryId });

    const category = categories.find(cat => cat.id === task.categoryId);

    const handleDelete = () => {
        if (window.confirm(`Anda yakin ingin menghapus tugas: "${task.text}"?`)) {
            // Jika user menekan "OK", baru jalankan dispatch
            dispatch(deleteTask({ id: task.id }));
        }
    };


    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const handleSave = () => {
        if (editData.text.trim()) {
            dispatch(editTask({
                id: task.id,
                newText: editData.text,
                newCategoryId: editData.categoryId
            }));
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        // Reset state edit ke data asli dan keluar dari mode edit
        setEditData({ text: task.text, categoryId: task.categoryId });
        setIsEditing(false);
    };

    // Tampilan saat mode normal
    const viewMode = (
        <>
            <span
                {...listeners}
                style={{ cursor: 'grab', touchAction: 'none', userSelect: 'none', marginRight: '10px' }}
            >
                ⠿
            </span>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleTask({ id: task.id }))}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', flexGrow: 1 }}>
                {task.text}
            </span>
            <span style={{ marginLeft: 'auto', background: '#eee', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', color: '#555' }}>
                {category ? category.name : 'Tanpa Kategori'}
            </span>
            <div style={{ marginLeft: '1rem', display: 'flex', gap: '0.5rem' }}>
                <Button className="secondary" onClick={() => setIsEditing(true)}>Edit</Button>
                <Button danger onClick={handleDelete}>Hapus</Button>
            </div>
        </>
    );

    // Tampilan saat mode edit
    const editMode = (
        <>
            <span style={{ cursor: 'default', marginRight: '10px', color: '#ccc' }}>⠿</span>

            <Input
                type="text"
                value={editData.text}
                onChange={(e) => setEditData({ ...editData, text: e.target.value })}
                style={{ flexGrow: 1 }}
                autoFocus
            />
            <Select
                value={editData.categoryId || ''} // Fallback ke string kosong jika null
                onChange={(e) => setEditData({ ...editData, categoryId: e.target.value })}
            >
                <option value="">Tanpa Kategori</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </Select>
            <div style={{ marginLeft: '1rem', display: 'flex', gap: '0.5rem' }}>
                <Button onClick={handleSave}>Simpan</Button>
                <Button className="secondary" onClick={handleCancel}>Batal</Button>
            </div>
        </>
    );

    return (
        <li ref={setNodeRef} style={style} {...attributes}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%', backgroundColor: isDragging ? '#f0f0f0' : 'white' }}>
                {isEditing ? editMode : viewMode}
            </div>
        </li>
    );
};

export default TaskItem;