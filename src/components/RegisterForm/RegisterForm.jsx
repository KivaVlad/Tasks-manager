import React, { useState } from "react";
import style from './style.module.css';
import closeIcon from '../../assets/icons/close-icon.svg';
import axios from "axios";


export const RegisterForm = (props) => {
    const {setOpenRegistryForm, setIsLogged} = props;
    const [username, setUsername] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    let newUser = {
        email: email,
        password: password,
        firstname: username,
        lastname: surname,
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (username.length && surname.length && email.length && password.length) {
            setError(false);
            onSubmit();
        } else {
            setError(true);
        }
    }

    function onSubmit() {
        axios.post('http://localhost:8080/register', newUser)
        .then((response) => {
            console.log(response.data);
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUsername('');
            setSurname('');
            setEmail('');
            setPassword('');
            setOpenRegistryForm(false);
            setError(false);
            setIsLogged(true);
        })
        .catch((error) => {
            console.log(error);
            setError(true);
        })
    }


    return (
        <div className={style.form_container}>
            <div className={style.form_header}>
                <h2 className={style.title}>Регистрация</h2>
                <div className={style.close_container}>
                    <img onClick={() => setOpenRegistryForm(false)} src={closeIcon} alt="" />
                </div>
            </div>
            <form onSubmit={handleSubmit} className={style.form}>

                <div>
                    <h5 className={style.input_text}>Имя</h5>
                    <div className={!error ? style.input_container : style.input_error_container}>
                        <input 
                            type='text' 
                            className={style.input} 
                            autoComplete="off"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <h5 className={style.input_text}>Фамилия</h5>
                    <div className={!error ? style.input_container : style.input_error_container}>
                        <input 
                            type='text' 
                            className={style.input} 
                            autoComplete="off"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <h5 className={style.input_text}>Email</h5>
                    <div className={!error ? style.input_container : style.input_error_container}>
                        <input 
                            type='text' 
                            className={style.input} 
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <h5 className={style.input_text}>Пароль</h5>
                    <div className={!error ? style.input_container : style.input_error_container}>
                        <input 
                            type='password' 
                            className={style.input} 
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className={style.error_container}>
                        {error && <span>Ошибка</span>}
                    </div>
                </div>

                <button type='submit' className={style.button}>Зарегистрироваться</button>

            </form>
        </div>
    )
}