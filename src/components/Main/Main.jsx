import React, { useState } from "react";
import style from "./main.module.css";
import { CreateTask } from "../CreateTask/CreateTask";


export const Main = (props) => {
    const {isLogged} = props;
    const [tasks, setTasks] = useState(localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []);

    return (
        <div className="container">
            <main className={style.main}>
                <CreateTask tasks={tasks} setTasks={setTasks} isLogged={isLogged} />
            </main>
        </div>
    )
}