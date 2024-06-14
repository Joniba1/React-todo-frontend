import { deleteTask } from "../../deleteTask";
import { setRelevance, setCompleted } from "../../setState";
import { Task } from '../../types'

//React icons
import { FaRegTrashAlt } from "react-icons/fa";
import { GrCompliance } from "react-icons/gr";
import { TbNotesOff } from "react-icons/tb";


interface TaskProps {
    task: Task;
    setSelectedTaskTitle: React.Dispatch<React.SetStateAction<string>>;
    setSelectedTaskDeadline: React.Dispatch<React.SetStateAction<string>>;
    setSelectedTaskDescription: React.Dispatch<React.SetStateAction<string>>;
    toggleModal: () => void;
}

const TaskItem: React.FC<TaskProps> = ({
    task,
    setSelectedTaskTitle,
    setSelectedTaskDeadline,
    setSelectedTaskDescription,
    toggleModal
}) => {


    const didDeadlinePass = (deadline: string) => {
        const currentDate = new Date();
        const deadlineDate = new Date(deadline);
        return deadlineDate < currentDate;
    };

    const overdue = task.deadline ? didDeadlinePass(task.deadline) : false;

    const handleEdit = (title: string, description: string, deadline: string) => {
        toggleModal();
        setSelectedTaskTitle(title);
        setSelectedTaskDescription(description);
        setSelectedTaskDeadline(deadline);
    };

    const handleDelete = async (title: string, deadline: string) => {
        await deleteTask(title);
        if (!task.relevance) {
            window.dispatchEvent(new Event('fetch-irrelevant-tasks'))
        } else if (task.completed) {
            window.dispatchEvent(new Event('fetch-completed-tasks'))
        } else {
            window.dispatchEvent(new Event('fetch-todo-tasks'))
        }
    };

    const handleSetRelevance = async (title: string, deadline: string) => {
        await setRelevance(title);
        window.dispatchEvent(new Event('fetch-irrelevant-tasks'));

        if (task.completed) {
            window.dispatchEvent(new Event('fetch-completed-tasks'));
        } else {
            window.dispatchEvent(new Event('fetch-todo-tasks'))
        }
    };

    const handleSetCompleted = async (title: string, deadline: string) => {
        await setCompleted(title);
        window.dispatchEvent(new Event('fetch-todo-tasks'))
        window.dispatchEvent(new Event('fetch-completed-tasks'));
    };

    return (
        <>
            <p className="task-title" onClick={() => handleEdit(task.title, task.description, task.deadline)}>{task.title}</p>
            <p className="task-description">{task.description}</p>
            <div className='task-utilities'>
                {task.deadline && (
                    <div className='due_text-container'>
                        <p className={`due-text ${overdue ? 'overdue' : ''}`}>Due: {new Date(task.deadline).toLocaleDateString()}</p>
                    </div>
                )}
                <div className='buttons'>
                    <p className="setRelevanceButton" data-tooltip-id="tooltipTodo" data-tooltip-content="Irrelevant" onClick={() => handleSetRelevance(task.title, task.deadline)}><TbNotesOff /></p>
                    <p className="setCompletedButton" data-tooltip-id="tooltipTodo" data-tooltip-content="Complete!" onClick={() => handleSetCompleted(task.title, task.deadline)}><GrCompliance /></p>
                    <p className="deleteButton" data-tooltip-id="tooltipTodo" data-tooltip-content="Delete" onClick={() => handleDelete(task.title, task.deadline)}><FaRegTrashAlt /></p>
                </div>
            </div>
        </>
    )
}

export default TaskItem;