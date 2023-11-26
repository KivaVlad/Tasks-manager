import React, { useState } from "react";
import axios from "axios";
import style from "./style.module.css";


export const EditTask = (props) => {
    const {setEditTask, taskData, getTasks, setTasks} = props;
    const [taskTitle, setTaskTitle] = useState(taskData?.title || '');
    const [taskDescription, setTaskDescription] = useState(taskData?.description || '');
    const [taskDate, setTaskDate] = useState(taskData?.date_end || '');

    function handleSubmit(e) {
        e.preventDefault();
        if (taskTitle.length) {
            editTask(taskTitle, taskDescription, taskDate);
        }
    }

    async function onSubmit(editedTask) {
        const response = await axios.patch(`http://localhost:8080/tasks/${taskData.id}`, editedTask)
        return response;
    }

    // Редактируем задачу
    const editTask = (taskTitle, taskDescription, taskDate) => {
        const editedTask = {
            title: taskTitle,
            description: taskDescription,
            date_end: taskDate,
        }

        onSubmit(editedTask)
        .then(() => {
            getTasks()
            .then((response) => {
                setTasks(response.data)
                setEditTask(false);
            })
            .catch((error) => console.log(error))
        })
        .catch((error) => console.log(error))
    }

    return (
        <div className={style.container}>
            <div className={style.container_content}>
                <h2 className={style.title}>Редактировать задачу</h2>

                <form onSubmit={handleSubmit} className={style.form}>

                    <div className={style.wrapper}>
                        <h3 className={style.input_label}>Название задачи</h3>
                        <div className={style.input_container}>
                            <input 
                                type="text"
                                className={style.input}
                                autoComplete="off"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.currentTarget.value)}
                            />
                        </div>
                    </div>

                    <div className={style.wrapper}>
                        <h3 className={style.input_label}>Описание задачи</h3>
                        <div className={style.textarea_container}>
                            <textarea 
                                className={style.textarea}
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.currentTarget.value)}
                            />
                        </div>
                    </div>

                    <div className={style.wrapper}>
                        <h3 className={style.input_label}>Срок выполнения</h3>
                        <div className={style.input_container}>
                            <input 
                                type="datetime-local"
                                className={style.input}
                                value={taskDate}
                                onChange={(e) => setTaskDate(e.currentTarget.value)}
                            />
                        </div>
                    </div>

                    <div className={style.buttons_container}>
                        <button type='submit' className={style.submit_button}>Сохранить</button>
                        <button type='button' onClick={() => setEditTask(false)} className={style.cancel_button}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    )
}