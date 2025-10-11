"use client"
import React, { useState } from 'react'
import {Task} from '../page'

const TaskBoxR = ({task, setTask}:  {task: Task, setTask: (task: Task) => void}) => {

  const[clicked, setClicked] = useState(false);
  const delegateClick = () => {
    setClicked(!clicked)
    setTimeout(() => setClicked(false), 300)
    setTask(task)
  }

    return (
        <div className={`flex flex-col transition-colors duration-300 ease-in-out ${clicked ? "bg-amber-400" : "bg-amber-300"} gap-2 text-3xl p-5 border-2 rounded-2xl`} onClick={delegateClick}>
            <h1>{task.title}</h1>
            <h2>Urgency: {task.urgency}</h2>
            <h2>Date: {task.date}</h2>
        </div>
    )
}

export default TaskBoxR