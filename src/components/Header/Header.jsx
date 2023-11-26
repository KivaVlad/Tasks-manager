import React, { useEffect, useState } from "react";
import style from './header.module.css';
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import userIcon from '../../assets/icons/user-icon.png';
import burgerMenu from "../../assets/icons/burger-menu.png";
import closeIcon from "../../assets/icons/close-icon.svg";


export const Header = (props) => {
    const {isLogged, setIsLogged} = props;
    const [openLoginForm, setOpenLoginForm] = useState(false);
    const [openRegistryForm, setOpenRegistryForm] = useState(false);
    const [userData, setUserData] = useState({});
    let [acttiveBurger, setActiveBurger] = useState(false);

    // Проверяем данные о пользователе
    useEffect(() => {
        const data = localStorage.getItem('user');
        if (data) {
            setUserData(JSON.parse(data));
        }
    }, [])


    function logOut() {
        localStorage.removeItem('token');
        setIsLogged(false);
    }


    function handleLoginClick() {
        setOpenLoginForm(true);
        setActiveBurger(false);
    }


    function handleRegisterClick() {
        setOpenRegistryForm(true)
        setActiveBurger(false);
    }


    useEffect(() => {
        if (openLoginForm || openRegistryForm) {
            document.body.style.overflow = 'hidden';              
        } else {
            document.body.style.overflow = 'unset';    
        }
    }, [openLoginForm, openRegistryForm]);


    return (
        <>
            <header className={style.header}>
                <div className="container">
                    <div className={style.header_content}>

                        <div className={style.header_logo}>
                            <h2>Планировщик задач</h2>
                        </div>

                        <div className={acttiveBurger ? style.header_nav_active : style.header_nav}>
                            
                            <div className={style.mobile_close_icon} onClick={() => setActiveBurger(false)}>
                                <img src={closeIcon} alt="" />
                            </div>

                            {!isLogged ?
                                <div className={style.header_buttons}>
                                    <button type='button' onClick={handleLoginClick} className={style.log_button}>Вход</button>
                                    <button type='button' onClick={handleRegisterClick} className={style.reg_button}>Регистрация</button>
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

                        <div className={style.burger_menu} onClick={() => setActiveBurger(acttiveBurger = !acttiveBurger)}>
                            <img src={burgerMenu} alt="" />
                        </div>

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