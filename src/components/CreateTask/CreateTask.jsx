import React, { useState } from "react";
import style from "./style.module.css";
import axios from "axios";


export const CreateTask = (props) => {
    const {getTasks, setTasks, isLogged} = props;
    const [todoTitle, setTodoTitle] = useState('');
    const [todoDescription, setTodoDescription] = useState('');
    const [todoEndDate, setTodoEndDate] = useState('');


    function handleSubmit(e) {
        e.preventDefault();
        if (isLogged) {
            if (todoTitle.length && todoEndDate.length) {
                addTask(todoTitle, todoDescription, todoEndDate);
                setTodoTitle('');
                setTodoDescription('');
                setTodoEndDate('');
            }
        } else {
            alert('Для продолжения необходимо авторизоваться');
        }
    }

    async function onSubmit(newTask) {
        const response = await axios.post('http://localhost:8080/tasks', newTask)
        return response;
    }

    // Создаем новую задачу
    const addTask = (todoTitle, todoDescription, todoEndDate) => {
        const newTask = {
            id: Math.random(),
            title: todoTitle,
            description: todoDescription,
            created_date: new Date(),
            date_end: new Date(todoEndDate),
            completed: false,
        }

        onSubmit(newTask)
        .then(() => {
            getTasks()
            .then((response) => setTasks(response.data))
            .catch((error) => console.log(error))
        })
        .catch((error) => console.log(error))
    }


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
                        <h3 className={style.input_label}>Срок выполнения</h3>
                        <div className={style.input_container}>
                            <input 
                                type='datetime-local'
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