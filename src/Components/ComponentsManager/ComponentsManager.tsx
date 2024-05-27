import { useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import TodoTasks from '../Tasks/TodoTasks/TodoTasks';
// import { Task } from '../../../../types';
import { Task } from '../../types';
import Sidebar from '../Sidebar/Sidebar';
import CompletedTasks from '../Tasks/ResolvedTasks/CompletedTasks';
import IrrelevantTasks from '../Tasks/ResolvedTasks/IrrelevantTasks';
import TasksGraph from '../TasksGraph/TasksGraph';
import './ComponentsManager.scss';
import EditTask from '../Modals/EditTask';

export interface TasksProps {
    searchedTasks: Task[];
    setSelectedTaskTitle: React.Dispatch<React.SetStateAction<string>>;
    setSelectedTaskDeadline: React.Dispatch<React.SetStateAction<string>>;
    setSelectedTaskDescription: React.Dispatch<React.SetStateAction<string>>;
    toggleModal: () => void;
}

const ComponentsManager = () => {
    const [searchedTasks, setSearchedTasks] = useState<Task[]>([]);
    const [selectedTaskTitle, setSelectedTaskTitle] = useState<string>('');
    const [selectedTaskDeadline, setSelectedTaskDeadline] = useState<string>('');
    const [selectedTaskDescription, setSelectedTaskDescription] = useState<string>('');
    const [modal, setModal] = useState<boolean>(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <>
            {modal && (
                <EditTask
                    toggleModal={toggleModal}
                    modal={modal}
                    selectedTask={{ title: selectedTaskTitle, deadline: selectedTaskDeadline, description: selectedTaskDescription }}
                />
            )}

            <div className='component-container'>
                <Sidebar />

                <div className='tasks_utilities-container'>
                    <div className='graph_search-container'>
                        <TasksGraph />
                        <Searchbar setSearchedTasks={setSearchedTasks} />
                    </div>

                    <div className='tasks-components-container'>
                        <TodoTasks
                            searchedTasks={searchedTasks}
                            setSelectedTaskTitle={setSelectedTaskTitle}
                            setSelectedTaskDeadline={setSelectedTaskDeadline}
                            setSelectedTaskDescription={setSelectedTaskDescription}
                            toggleModal={toggleModal}
                        />
                        <CompletedTasks
                            searchedTasks={searchedTasks}
                            setSelectedTaskTitle={setSelectedTaskTitle}
                            setSelectedTaskDeadline={setSelectedTaskDeadline}
                            setSelectedTaskDescription={setSelectedTaskDescription}
                            toggleModal={toggleModal}
                        />
                        <IrrelevantTasks
                            searchedTasks={searchedTasks}
                            setSelectedTaskTitle={setSelectedTaskTitle}
                            setSelectedTaskDeadline={setSelectedTaskDeadline}
                            setSelectedTaskDescription={setSelectedTaskDescription}
                            toggleModal={toggleModal}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ComponentsManager;
