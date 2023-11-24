import React, { useState } from "react";
import style from "./style.module.css";


export const CreateTask = (props) => {
    const {tasks, setTasks, isLogged} = props;
    const [todoTitle, setTodoTitle] = useState('');
    const [todoDescription, setTodoDescription] = useState('');
    const [todoEndDate, setTodoEndDate] = useState('');

    // Создаем новую задачу в виде объекта
    const addTask = (todoTitle, todoDescription, todoEndDate) => {
        const newTask = {
            id: Math.random(),
            title: todoTitle,
            description: todoDescription,
            date_end: new Date(todoEndDate),
            completed: false,
        }

        setTasks([...tasks, newTask]);
        localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isLogged) {
            if (todoTitle?.length) {
                addTask(todoTitle, todoDescription, todoEndDate);
                setTodoTitle('');
                setTodoDescription('');
                setTodoEndDate('');
            }
        } else {
            alert('Для продолжения необходимо авторизоваться');
        }
    }

    console.log(tasks);

    return (
        <div className={style.container}>
            <div className={style.container_content}>
                <h2 className={style.title}>Добавить задачу</h2>

                <form onSubmit={handleSubmit} className={style.form}>

                    <div className={style.wrapper}>
                        <h3 className={style.input_label}>Название задачи</h3>
                        <div className={style.input_container}>
                            <input 
                                type="text"
                                className={style.input}
                                autoComplete="off"
                                value={todoTitle}
                                onChange={(e) => setTodoTitle(e.currentTarget.value)}
                            />
                        </div>
                    </div>

                    <div className={style.wrapper}>
                        <h3 className={style.input_label}>Описание задачи</h3>
                        <div className={style.textarea_container}>
                            <textarea 
                                className={style.textarea}
                                value={todoDescription}
                                onChange={(e) => setTodoDescription(e.currentTarget.value)}
                            />
                        </div>
                    </div>

                    <div className={style.wrapper}>
                        <h3 className={style.input_label}>Окончание выполнения</h3>
                        <div className={style.input_container}>
                            <input 
                                type="date"
                                className={style.input}
                                value={todoEndDate}
                                onChange={(e) => setTodoEndDate(e.currentTarget.value)}
                            />
                        </div>
                    </div>

                    <button type='submit' className={style.button}>Создать задачу</button>
                </form>
            </div>
        </div>
    )
}