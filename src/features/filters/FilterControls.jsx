import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setStatusFilter, setCategoryFilter, setSearchTerm } from './filterSlice';
import { Input, Select } from '../../components/ui/Styled';

const FilterControls = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.items);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
            <Input
                type="text"
                placeholder="Cari berdasarkan nama tugas..."
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />

            <Select onChange={(e) => dispatch(setStatusFilter(e.target.value))}>
                <option value="All">Semua Status</option>
                <option value="Completed">Selesai</option>
                <option value="Active">Aktif</option>
            </Select>

            <Select onChange={(e) => dispatch(setCategoryFilter(e.target.value))}>
                <option value="All">Semua Kategori</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </Select>
        </div>
    );
};

export default FilterControls;