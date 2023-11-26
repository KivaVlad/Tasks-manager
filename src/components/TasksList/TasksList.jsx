import React, { useEffect, useState } from "react";
import { TaskCard } from "../TaskCard/TaskCard";
import { EditTask } from "../EditTask/EditTask";
import { sortingParams } from "../../params/sorting";
import style from './style.module.css';
import lockImg from '../../assets/icons/Characters.jpg';


export const TasksList = (props) => {
    const {isLogged, tasks, getTasks, setTasks, sortOrder, setSortOrder} = props;
    const [editTask, setEditTask] = useState(false);
    const [taskData, setTaskData] = useState({});

    useEffect(() => {
        if (editTask) {
            document.body.style.overflow = 'hidden';              
        } else {
            document.body.style.overflow = 'unset';    
        }
    }, [editTask]);

    return (
        <>
            <div className={style.container}>
                <div className={style.task_list_header}>
                    <h2 className={style.title}>Мои задачи</h2>
                    {(isLogged && tasks?.length) && 
                        <select 
                            className={style.select}
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            {sortingParams.map((param, index) => (
                                <option className={style.option} key={index} value={param.value}>{param.name}</option>
                            ))}
                        </select>
                    }
                </div>

                {isLogged ?  
                    <>
                        {tasks?.length ?
                            <div className={style.cards_wrapper}>
                                <div className={style.cards}>
                                    {tasks.map((task) => {
                                        return (
                                            <TaskCard 
                                                key={task.id} 
                                                task={task} 
                                                getTasks={getTasks}
                                                setTasks={setTasks} 
                                                setTaskData={setTaskData}
                                                setEditTask={setEditTask}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        :
                            <div className={style.text_container}>
                                <h2 className={style.title}>Создайте первую задачу</h2>
                            </div>
                        }
                    </>
                :
                    <div className={style.text_container}>
                        <h2 className={style.title}>Чтобы увидеть список задач необходимо авторизоваться</h2>
                        <div className={style.image_container}>
                            <img src={lockImg} alt="" />
                        </div>
                    </div>
                }
            </div>


            {editTask && 
                <div className={style.visible}>
                    <EditTask 
                        setEditTask={setEditTask} 
                        taskData={taskData} 
                        getTasks={getTasks} 
                        setTasks={setTasks}
                    />
                </div>
            }
        </>
    )
}