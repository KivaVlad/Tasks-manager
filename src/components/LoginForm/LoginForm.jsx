import React, { useState } from "react";
import axios from "axios";
import style from './style.module.css';
import closeIcon from '../../assets/icons/close-icon.svg';


export const LoginForm = (props) => {
    const {setOpenLoginForm, setIsLogged} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const data = {
        email: email,
        password: password
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (email.length && password.length) {
            setError(false);
            onSubmit();
        } else {
            setError(true);
        }
    }

    function onSubmit() {
        axios.post('http://localhost:8080/login', data)
        .then((response) => {
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setEmail('');
            setPassword('');
            setOpenLoginForm(false);
            setError(false);
            setIsLogged(true);
        })
        .catch((error) => {
            console.log(error)
            setError(true);
        })
    }


    return (
        <div className={style.form_container}>
            <div className={style.form_header}>
                <h2 className={style.title}>Вход</h2>
                <div className={style.close_container}>
                    <img onClick={() => setOpenLoginForm(false)} src={closeIcon} alt="" />
                </div>
            </div>
            <form onSubmit={handleSubmit} className={style.form}>

                <div>
                    <h5 className={style.input_text}>Email (test@mail.com)</h5>
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
                    <h5 className={style.input_text}>Пароль (test12345)</h5>
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
                        {error && <span>Неверный логин или пароль</span>}
                    </div>
                </div>

                <button type='submit' className={style.button}>Войти</button>

            </form>
        </div>
    )
}