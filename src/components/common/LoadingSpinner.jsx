import React from 'react';

const LoadingSpinner = () => {
    const style = {
        border: '4px solid rgba(0, 0, 0, 0.1)',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        borderLeftColor: '#09f',
        animation: 'spin 1s ease infinite',
    };

    const keyframes = `
    @keyframes spin {
        0% {
        transform: rotate(0deg);
        }
        100% {
        transform: rotate(360deg);
        }
    }
    `;

    return (
        <>
            <style>{keyframes}</style>
            <div style={style}></div>
        </>
    );
};

export default LoadingSpinner;