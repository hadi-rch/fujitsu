import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { reorderTasks } from './tasksSlice';
import TaskItem from './TaskItem';

const TaskList = () => {
    const tasks = useSelector(state => state.tasks.items);
    const filters = useSelector(state => state.filters);
    const dispatch = useDispatch();

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const statusMatch = (filters.status === 'All') ||
                (filters.status === 'Completed' && task.completed) ||
                (filters.status === 'Active' && !task.completed);

            const categoryMatch = (filters.category === 'All') || (task.categoryId === filters.category);

            const searchTermMatch = task.text ? task.text.toLowerCase().includes(filters.searchTerm.toLowerCase()) : true;

            return statusMatch && categoryMatch && searchTermMatch;
        });
    }, [tasks, filters]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    function handleDragEnd(event) {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = tasks.findIndex(t => t.id === active.id);
            const newIndex = tasks.findIndex(t => t.id === over.id);
            dispatch(reorderTasks({ oldIndex, newIndex }));
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={filteredTasks.map(t => t.id)}
                strategy={verticalListSortingStrategy}
            >
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map(task => (
                            <TaskItem key={task.id} task={task} />
                        ))
                    ) : (
                        <p>Tidak ada tugas yang sesuai dengan filter Anda.</p>
                    )}
                </ul>
            </SortableContext>
        </DndContext>
    );
};

export default TaskList;