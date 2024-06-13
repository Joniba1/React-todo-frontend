import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from "react";
import api from "../../api";
import { User } from "../../types";

interface handleLoginProps {
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const HandleLogin: React.FC<handleLoginProps> = ({ setErrorMessage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const user: User = { username, password };
            const response = await api.post('/login', user);

            if (response.status === 200) {
                const { token } = response.data;
                Cookies.set('jwt', token, { expires: 1 });
                window.dispatchEvent(new Event('logged-in'));
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { errorCode } = error.response.data;
                if (errorCode === 'EMPTY_FIELDS') {
                    setErrorMessage('Username or password are empty!');
                } else if (errorCode === 'USER_NOT_FOUND') {
                    setErrorMessage('User doesn`t exist!');
                } else if (errorCode === 'INCORRECT_PASSWORD') {
                    setErrorMessage('Incorrect password!');
                }
            } else {
                setErrorMessage('An error occurred during login');
            }
        }
    }

    return <></>
};

export default HandleLogin;
