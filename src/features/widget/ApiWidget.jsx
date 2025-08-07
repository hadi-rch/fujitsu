import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from './widgetSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ApiWidget = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.widget);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const renderContent = () => {
        if (loading) return <LoadingSpinner />;
        if (error) return <p style={{ color: 'red' }}>Error mengambil data cuaca: {error}</p>;

        // Tampilkan data cuaca dari wttr.in
        if (data && data.current_condition) {
            const current = data.current_condition[0];
            const location = data.nearest_area[0];

            return (
                <div>
                    <p><strong>Cuaca Saat Ini di {location.areaName[0].value}, {location.country[0].value}</strong></p>
                    <p style={{ fontSize: '24px', margin: '5px 0', fontWeight: 'bold' }}>
                        {current.temp_C}°C
                    </p>
                    <p>Terasa seperti: {current.FeelsLikeC}°C</p>
                    <p>Kondisi: {current.weatherDesc[0].value}</p>
                </div>
            );
        }
        return <p>Gagal memuat data cuaca.</p>;
    };

    return (
        <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            {renderContent()}
        </div>
    );
};

export default ApiWidget;