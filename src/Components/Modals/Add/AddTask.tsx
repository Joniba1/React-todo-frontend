import React, { useState } from 'react';
import { MdError } from 'react-icons/md';
import '../Modal.scss';
import useAddSubmitForm from './useAddSubmitForm';
import ErrorMsg from '../../ErrorMsg/ErrorMsg';

interface AddTaskProps {
  toggleModal: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ toggleModal }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const { handleSubmit, errorMsg } = useAddSubmitForm(toggleModal);

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    setTitle(inputValue);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    setDescription(inputValue);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setDate(inputValue);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setTime(inputValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <>
      <ErrorMsg errorMsg={errorMsg} side={'right'}/>

      <div className="overlay" onClick={toggleModal}></div>
      <div className="modal">
        <div className='modal-title'>
          <p>Add Task</p>
        </div>
        <div className="modal-content">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit({ title, description, date, time });
            }}
          >
            <div className="textarea-wrapper">
              <textarea
                className="title"
                placeholder="Task name"
                value={title}
                onChange={handleTitleChange}
                onKeyDown={handleKeyDown}
                maxLength={130}
                required
              />
              <textarea
                className="description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Task description"
                maxLength={300}
              />

              <div className="date-picker">
                <input type="date" className='date' value={date} onChange={handleDateChange} />
                <input type="time" className='time' value={time} onChange={handleTimeChange} />
              </div>

              <div className='modal-buttons'>
                <button className="submit-task" type="submit">Add task</button>
                <button className="nevermind" onClick={toggleModal}>Nevermind</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTask;
