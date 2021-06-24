import React, { useContext, useState, useEffect } from 'react'
import { TaskListContext } from '../context/TaskListContext'

const TaskForm = () => {
    
    //get actions from context
    const { addTask, clearTask, editTask, editItem } = useContext(TaskListContext)
 
    const [title,setTitle] = useState("");
    
    const handleChange = e => {
        setTitle(e.target.value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (!editItem) {
            addTask(title)
            setTitle('')
          } else {
            editTask(title, editItem.id)
          }
    }
    useEffect(() => {
        if (editItem) {
          setTitle(editItem.title)
         // console.log(editItem)
        } else {
          setTitle('')
        }
      }, [editItem])
   
      return (
        <form onSubmit={handleSubmit} className="form">
            <input 
            onChange={handleChange}
            type="text"
            className="task-input"
            placeholder="Add item"
            value={title}
            required/>
            <div className="buttons">
                <button type="submit" className="btn add-task-btn">
                {editItem ? 'Edit Task' : 'Add Task'}
                </button> 
                <button onClick={clearTask} className="btn clear-btn">
                    Clear Task
                </button> 
            </div>       
            </form>
    )
}

export default TaskForm
