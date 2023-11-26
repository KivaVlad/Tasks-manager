import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./main.module.css";
import { CreateTask } from "../CreateTask/CreateTask";
import { TasksList } from "../TasksList/TasksList";
import { sortingParams } from "../../params/sorting";


export const Main = (props) => {
    const {isLogged} = props;
    const [tasks, setTasks] = useState([]);
    const [sortOrder, setSortOrder] = useState(sortingParams[0].value);

    async function getTasks(sortOrder) {
        const response = await axios.get(`http://localhost:8080/tasks?_sort=created_date&_order=${sortOrder}`)
        return response
    }

    // Получаем задачи и добавляем в переменную состояния
    useEffect(() => {
        getTasks(sortOrder)
        .then((response) => setTasks(response.data))
        .catch((error) => console.log(error))
    }, [sortOrder])


    return (
        <div className="container">
            <main className={style.main}>
                <CreateTask getTasks={getTasks} setTasks={setTasks} isLogged={isLogged} />
                <TasksList isLogged={isLogged} tasks={tasks} getTasks={getTasks} setTasks={setTasks} sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </main>
        </div>
    )
}