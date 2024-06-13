import { useState, useEffect } from 'react';
import api from '../../../api';
import { Task } from '../../../types';

const useTodoTasks = (searchedTasks: Task[]) => {
    const [todoTasks, setTodoTasks] = useState<Task[]>([]);

    const fetchTodoTasks = async () => {
        try {
            const response = await api.get('/tasks');
            const tasks = response.data;

            if (tasks) {
                setTodoTasks(tasks.filter((task: Task) => !task.completed && task.relevance));
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        setTodoTasks(searchedTasks);
    }, [searchedTasks])

    useEffect(() => {
        fetchTodoTasks();
        const fetchTodoTasksListener = () => fetchTodoTasks();
        window.addEventListener('fetch-todo-tasks', fetchTodoTasksListener);

        return () => {
            window.removeEventListener('fetch-todo-tasks', fetchTodoTasksListener);
        };
    }, []);


    return { todoTasks, fetchTodoTasks };
};

export default useTodoTasks;