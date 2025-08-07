import styled from 'styled-components';

export const Container = styled.div`
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
`;

export const Card = styled.div`
    background-color: var(--color-card-bg);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: var(--shadow-md);
    margin-bottom: 2rem;
`;

export const Title = styled.h2`
    margin-bottom: 1rem;
    font-weight: 700;
    color: var(--color-text);
`;

export const Button = styled.button`
    background-color: ${props => props.danger ? 'var(--color-danger)' : 'var(--color-primary)'};
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: ${props => props.danger ? 'var(--color-danger-light)' : 'var(--color-primary-light)'};
    }

    &.secondary {
        background-color: #e2e8f0;
        color: var(--color-text);
        &:hover {
            background-color: #cbd5e0;
            }
    }
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.6rem;
    border: 1px solid var(--color-border);
    border-radius: 5px;
    font-size: 1rem;
    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.5);
    }
`;

export const Select = styled.select`
    padding: 0.6rem;
    border: 1px solid var(--color-border);
    border-radius: 5px;
    font-size: 1rem;
    background-color: white;
    &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.5);
    }
`;