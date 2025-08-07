import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, editCategory, deleteCategory } from './categoriesSlice';
import { Button, Input, Title } from '../../components/ui/Styled';

const CategoryManager = ({ onClose }) => {
    const categories = useSelector(state => state.categories.items);
    const dispatch = useDispatch();

    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (newCategoryName.trim()) {
            if (categories.some(cat => cat.name.toLowerCase() === newCategoryName.trim().toLowerCase())) {
                alert('Nama kategori sudah ada.');
                return;
            }
            dispatch(addCategory(newCategoryName));
            setNewCategoryName('');
        }
    };

    const handleUpdateCategory = () => {
        if (editingCategory && editingCategory.name.trim()) {
            dispatch(editCategory({ id: editingCategory.id, newName: editingCategory.name }));
            setEditingCategory(null);
        }
    };

    const handleDeleteCategory = (id) => {
        if (window.confirm('Anda yakin ingin menghapus kategori ini? Semua tugas terkait akan kehilangan kategorinya.')) {
            dispatch(deleteCategory({ id }));
        }
    };

    const renderEditForm = () => (
        <div style={{ marginTop: '1.5rem' }}>
            <Title as="h4">Edit Kategori</Title>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    autoFocus
                />
                <Button onClick={handleUpdateCategory}>Update</Button>
                <Button className="secondary" onClick={() => setEditingCategory(null)}>Batal</Button>
            </div>
        </div>
    );

    const renderAddForm = () => (
        <form onSubmit={handleAddCategory} style={{ marginTop: '1.5rem' }}>
            <Title as="h4">Tambah Kategori Baru</Title>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Input
                    type="text"
                    placeholder="Nama kategori baru"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <Button type="submit">Tambah</Button>
            </div>
        </form>
    );

    return (
        <div style={{ position: 'fixed', zIndex: 100, top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ background: 'var(--color-card-bg)', padding: '1.5rem 2rem', borderRadius: '8px', width: '100%', maxWidth: '500px', boxShadow: 'var(--shadow-md)' }}>
                <Title as="h2" style={{ marginBottom: '1.5rem' }}>Kelola Kategori</Title>
                <div style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '1rem' }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {categories.map(cat => (
                            <li key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid var(--color-border)' }}>
                                <span>{cat.name}</span>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Button className="secondary" onClick={() => setEditingCategory({ id: cat.id, name: cat.name })}>Edit</Button>
                                    <Button danger onClick={() => handleDeleteCategory(cat.id)}>Hapus</Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {editingCategory ? renderEditForm() : renderAddForm()}

                <Button className="secondary" onClick={onClose} style={{ marginTop: '2rem', width: '100%' }}>Tutup</Button>
            </div>
        </div>
    );
};

export default CategoryManager;