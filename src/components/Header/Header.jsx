import React, { useEffect, useState } from "react";
import style from './header.module.css';
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import userIcon from '../../assets/icons/user-icon.png';

export const Header = (props) => {
    const {isLogged, setIsLogged} = props;
    const [openLoginForm, setOpenLoginForm] = useState(false);
    const [openRegistryForm, setOpenRegistryForm] = useState(false);
    const [userData, setUserData] = useState({});

    // Проверяем данные о пользователе
    useEffect(() => {
        const data = localStorage.getItem('user');
        if (data) {
            setUserData(JSON.parse(data));
        }
    }, [])

    // Выход
    function logOut() {
        localStorage.removeItem('token');
        setIsLogged(false);
    }

    return (
        <>
            <header className={style.header}>
                <div className="container">
                    <div className={style.header_content}>

                        <div className={style.header_logo}>
                            <h2>Планировщик задач</h2>
                        </div>

                        {!isLogged ?
                            <div className={style.header_buttons}>
                                <button type='button' onClick={() => setOpenLoginForm(true)} className={style.log_button}>Вход</button>
                                <button type='button' onClick={() => setOpenRegistryForm(true)} className={style.reg_button}>Регистрация</button>
                            </div>
                            :
                            <div className={style.users_info_container}>
                                <div className={style.user_name_wrapper}>
                                    <h2 className={style.user_name}>{userData?.firstname}</h2>
                                    <button type="button" onClick={logOut} className={style.logout_button}>Выйти</button>
                                </div>
                                <div className={style.icon_wrapper}>
                                    <img src={userIcon} alt="" />
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </header>

            <div className={openLoginForm ? style.visible : style.hidden}>
                <LoginForm setOpenLoginForm={setOpenLoginForm} setIsLogged={setIsLogged} />
            </div>

            <div className={openRegistryForm ? style.visible : style.hidden}>
                <RegisterForm setOpenRegistryForm={setOpenRegistryForm} setIsLogged={setIsLogged} />
            </div>
        </>
    )
} 