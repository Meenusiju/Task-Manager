import React, { createContext, useState, useEffect } from 'react'
import {v4 as uuid} from 'uuid';

export const TaskListContext = createContext();

const TaskListContextProvider = props => {
    
    //get items (initialstate) from browser's local storage
    const initialState = JSON.parse(localStorage.getItem('tasks')) || []

    /*const [tasks, setTasks] = useState([
        {title:'read', id:1},
        {title:'write', id:2},
        {title:'edit', id:3}
    ]);*/
    const [tasks, setTasks] = useState(initialState)
    
    //save items in local storage with useeffect hook
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
      }, [tasks])
    
    //add Task
    const addTask = (title) => {
        setTasks([...tasks,{title,id:uuid()}])
    }

    //Remove Task
    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !==id))
    }

    //Clear Task
    const clearTask = () => {
        setTasks([])
    }

    //Find Task
    const [editItem, setEditItem] = useState(null);
    const findTask = (id) => {
        const item = tasks.find(task => task.id === id)
        setEditItem(item)
    }

    //Edit Task
    const editTask = (title,id) => {
        const editedTask = tasks.map(task => (task.id === id ? {title,id} : task));
         //console.log(editedtask)
        setTasks(editedTask);
        setEditItem(null)
    }
    return(
        <TaskListContext.Provider value ={{ tasks, addTask, removeTask, clearTask, findTask, editTask, editItem}}>
            {props.children}
        </TaskListContext.Provider>
    )
}

export default TaskListContextProvider;