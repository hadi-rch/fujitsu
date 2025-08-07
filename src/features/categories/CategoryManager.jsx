import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, editCategory, deleteCategory } from './categoriesSlice';

const CategoryManager = ({ onClose }) => {
    const categories = useSelector(state => state.categories.items);
    const dispatch = useDispatch();

    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    
    const handleAddCategory = (e) => {
        e.preventDefault();
        if (newCategoryName.trim()) {
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
        <div>
            <h4 style={{ marginTop: '30px' }}>Edit Kategori</h4>
            <input
                type="text"
                value={editingCategory.name}
                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                autoFocus
            />
            <button onClick={handleUpdateCategory} style={{ marginLeft: '8px' }}>Update</button>
            <button onClick={() => setEditingCategory(null)} style={{ marginLeft: '8px', background: '#eee' }}>Batal</button>
        </div>
    );

    const renderAddForm = () => (
        <form onSubmit={handleAddCategory} style={{ marginTop: '30px' }}>
            <h4>Tambah Kategori Baru</h4>
            <input
                type="text"
                placeholder="Nama kategori baru"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <button type="submit" style={{ marginLeft: '8px' }}>Tambah</button>
        </form>
    );

    return (
        // Background Overlay
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Modal Content */}
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
                <h2>Kelola Kategori</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {categories.map(cat => (
                        <li key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderBottom: '1px solid #eee' }}>
                            <span>{cat.name}</span>
                            <div>
                                <button onClick={() => setEditingCategory({ id: cat.id, name: cat.name })} style={{ marginRight: '5px' }}>Edit</button>
                                <button onClick={() => handleDeleteCategory(cat.id)}>Hapus</button>
                            </div>
                        </li>
                    ))}
                </ul>

                {editingCategory ? renderEditForm() : renderAddForm()}

                <button onClick={onClose} style={{ marginTop: '30px', width: '100%', background: '#ccc' }}>Tutup</button>
            </div>
        </div>
    );
};

export default CategoryManager;