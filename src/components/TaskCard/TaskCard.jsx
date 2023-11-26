import React from "react";
import axios from "axios";

import style from './style.module.css';
import checkboxIcon from '../../assets/icons/checkbox.png';
import unCheckIcon from '../../assets/icons/unchecked.png';
import editIcon from "../../assets/icons/edit-icon.svg";
import removeIcon from "../../assets/icons/remove-icon.svg";


export const TaskCard = (props) => {
    const {task, getTasks, setTasks, setTaskData, setEditTask} = props;
    const completed = task.completed;
    const endDate = task?.date_end ? new Date(task.date_end) : new Date();
    
    // Переводим дату в читабельный формат
    function formattedDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear() % 100;
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedYear = year < 10 ? `0${year}` : year;
        const formatted = `${formattedDay}.${formattedMonth}.20${formattedYear} ${hours}:${minutes}`;

        return formatted
    }

    // Пометка задачи как выполнена
    function setTaskCompleted(id) {
        async function taskCompleted() {
            const response = await axios.patch(`http://localhost:8080/tasks/${id}`, {completed: true})
            return response
        }

        taskCompleted()
        .then(() => {
            getTasks()
            .then((response) => setTasks(response.data))
            .catch((error) => console.log(error))
        })
        .catch((error) => console.log(error))
    }

    // Снять метку о выполнении
    function setTaskUncompleted(id) {
        async function taskUncompleted() {
            const response = await axios.patch(`http://localhost:8080/tasks/${id}`, {completed: false})
            return response
        }

        taskUncompleted()
        .then(() => {
            getTasks()
            .then((response) => setTasks(response.data))
            .catch((error) => console.log(error))
        })
        .catch((error) => console.log(error))
    }

    // Удаление задачи
    function removeTask(id) {
        async function remove() {
            const response = await axios.delete(`http://localhost:8080/tasks/${id}`)
            return response
        }

        remove()
        .then(() => {
            getTasks()
            .then((response) => setTasks(response.data))
            .catch((error) => console.log(error))
        })
        .catch((error) => console.log(error))
    }

    // Редактирование задачи
    function editTask(task) {
        setTaskData(task);
        setEditTask(true);
    }

    return (
        <div className={completed === false ? style.container : style.completed_container}>
            <div className={style.content}>
                <div className={style.left_section}>
                    <div className={style.checkbox}>
                        {completed === false 
                            ?   <img onClick={() => setTaskCompleted(task.id)} src={unCheckIcon} alt="" />
                            :   <img onClick={() => setTaskUncompleted(task.id)} src={checkboxIcon} alt="" />
                        }
                    </div>

                    <div className={style.card_text}>
                        <h3 className={style.task_title}>{task?.title}</h3>
                        <p className={style.task_description}>{task?.description}</p>
                    </div>
                </div>

                <div className={style.right_section}>
                    <div className={style.date_container}>
                        <h3 className={style.date_title}>Срок выполнения:</h3>
                        <span className={style.date}>{formattedDate(endDate)}</span>
                    </div>
                    <div className={style.icons_container}>
                        <img onClick={() => editTask(task)} src={editIcon} alt="" />
                        <img onClick={() => removeTask(task.id)} src={removeIcon} alt="" />
                    </div>
                </div>

            </div>
        </div>
    )
}