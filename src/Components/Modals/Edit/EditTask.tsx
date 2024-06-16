import { MdError } from "react-icons/md";
import useSubmitForm from "./useEditSubmitForm";
import { useState } from "react";
import '../Modal.scss';
import ErrorMsg from "../../ErrorMsg/ErrorMsg";

interface EditTaskFormProps {
    toggleModal: () => void;
    modal: boolean;
    selectedTask: {
        title: string;
        deadline: string;
        description: string;
    };
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ toggleModal, selectedTask }) => {
    const [newTitle, setNewTitle] = useState<string>(selectedTask.title);
    const [newDescription, setNewDescription] = useState<string>(selectedTask.description);

    const [date, setDate] = useState<string>(() => {
        if (selectedTask.deadline) {
            const localDate = new Date(selectedTask.deadline);
            localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
            return localDate.toISOString().split('T')[0];
        } else {
            return '';
        }
    });

    const [time, setTime] = useState<string>(() => {
        if (selectedTask.deadline) {
            const localDate = new Date(selectedTask.deadline);
            localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
            return localDate.toISOString().split('T')[1].slice(0, 5);
        } else {
            return '00:00:00';
        }
    });


    const { errorMsg, handleSubmit } = useSubmitForm(
        selectedTask.title,
        newTitle,
        newDescription,
        date,
        time,
        toggleModal
    );

    const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewTitle(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewDescription(event.target.value);
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
    };


    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    return (
        <>
            <ErrorMsg errorMsg={errorMsg} side={'right'} />

            <div className="overlay" onClick={toggleModal}></div>
            <div className="modal edit-modal">
                <div className='modal-title'>
                    <p>Edit Task</p>
                </div>
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="textarea-wrapper">
                            <textarea
                                className="title"
                                placeholder="Task name"
                                value={newTitle}
                                onChange={handleTitleChange}
                                onKeyDown={handleKeyDown}
                                maxLength={130}
                                required
                            />
                            <textarea
                                value={newDescription}
                                onChange={handleDescriptionChange}
                                className="description"
                                placeholder="Task description"
                                maxLength={300}
                            />
                            <div className="date-picker">
                                <input type="date" className='date' value={date} onChange={handleDateChange} />
                                <input type="time" className='time' value={time} onChange={handleTimeChange} />
                            </div>
                            <div className='modal-buttons'>
                                <button type="submit" className="submit-task">Save</button>
                                <button type="button" className="nevermind" onClick={toggleModal}>Nevermind</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditTaskForm;