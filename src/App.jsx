import React, { useState } from 'react';
import AddTaskForm from './features/tasks/AddTaskForm';
import TaskList from './features/tasks/TaskList';
import FilterControls from './features/filters/FilterControls';
import ApiWidget from './features/widget/ApiWidget';
import CategoryManager from './features/categories/CategoryManager';
import { GlobalStyles } from './styles/GlobalStyles';
import { Container, Title, Button, Card } from './components/ui/Styled';

function App() {
    const [isCategoryManagerOpen, setCategoryManagerOpen] = useState(false);

    return (
        <>
            <GlobalStyles />
            <Container>
                {isCategoryManagerOpen && <CategoryManager onClose={() => setCategoryManagerOpen(false)} />}

                <Title as="h1" style={{ textAlign: 'center', marginBottom: '1rem' }}>Aplikasi To-Do List</Title>
                <ApiWidget />

                <AddTaskForm />

                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <Title>Daftar Tugas</Title>
                        <Button className="secondary" onClick={() => setCategoryManagerOpen(true)}>Kelola Kategori</Button>
                    </div>
                    <FilterControls />
                    <TaskList />
                </Card>
            </Container>
        </>
    );
}

export default App;