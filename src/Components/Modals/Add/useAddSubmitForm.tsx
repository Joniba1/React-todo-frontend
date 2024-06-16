import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import api from '../../../api';

interface AddTaskFormValues {
  title: string;
  description: string;
  date: string;
  time: string;
}

interface AddTaskSubmit {
  handleSubmit: (values: AddTaskFormValues) => Promise<void>;
  errorMsg: string;
}

const useAddSubmitForm = (toggleModal: () => void): AddTaskSubmit => {
  const [errorMsg, seterrorMsg] = useState<string>('');

  const handleSubmit = async (values: AddTaskFormValues) => {
    try {
      const username = Cookies.get('username');
      let formattedDeadline = null;

      if (values.date && values.time) {
        formattedDeadline = `${values.date} ${values.time}`;
      } else if (values.date && !values.time) {
        formattedDeadline = `${values.date} 00:00:00`;
      }

      const response = await api.post('/tasks/add', {
        title: values.title,
        deadline: formattedDeadline,
        description: values.description,
        username: username
      });

      if (response.status === 201) {
        toggleModal();
        window.dispatchEvent(new Event('fetch-todo-tasks'));
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { errorCode } = error.response.data;
        if (errorCode === 'DUPLICATE_TASKS') {
          seterrorMsg('Task title already exists!');
        }
      }
    }
  };

  return { handleSubmit, errorMsg };
};

export default useAddSubmitForm;
