import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatusFilter, setCategoryFilter, setSearchTerm } from './filterSlice';

const FilterControls = () => {
    const dispatch = useDispatch();
    // Ambil data kategori dari categoriesSlice
    const categories = useSelector(state => state.categories.items);

    return (
        <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
            <input
                type="text"
                placeholder="Cari tugas..."
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />

            <div>
                <label>Status: </label>
                <select onChange={(e) => dispatch(setStatusFilter(e.target.value))}>
                    <option value="All">Semua</option>
                    <option value="Completed">Selesai</option>
                    <option value="Active">Aktif</option>
                </select>
            </div>

            <div>
                <label>Kategori: </label>
                <select onChange={(e) => dispatch(setCategoryFilter(e.target.value))}>
                    <option value="All">Semua Kategori</option>
                    {/* Gunakan ID untuk value dan name untuk teks */}
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FilterControls;