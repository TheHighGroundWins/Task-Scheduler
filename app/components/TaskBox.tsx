"use client"
import React, { Component, SetStateAction, useEffect, useState } from 'react'
import { Urgency } from './Urgencies'
import { Task } from '../page'



const TaskBox = ({task, setTask}: {task: Task, setTask: React.Dispatch<SetStateAction<Task>>}) => {
    const [selectedUrgency, setUrgency] = useState<Urgency>(Urgency.LOW)


    const editTask = <T extends keyof Task>(field: T, value: Task[T]) => {
      setTask((prevTask: Task): Task => ({
        ...prevTask,
        [field]: value,
      }));
    };

    return (
        <div className='flex flex-col bg-amber-300 gap-2 text-3xl p-5 border-2 rounded-2xl'>
            <input placeholder='Title' value={task.title} onChange={t => {editTask("title", t.target.value)}}/>
            <label>Urgency:
                <select className='bg-black text-white text-2xl'
                value={task.urgency}
                onChange={(u)=> editTask("urgency", u.target.value as Urgency)}>
                  {Object.values(Urgency).map(urgency=>(
                    <option key={urgency} value={urgency} className='bg-black'>
                      {urgency}
                    </option>
                  ))}
                </select>
            </label>
            <label> Date: 
            <input placeholder='10/04/2025' type='date' value={task.date} onChange={ t => editTask("date", t.target.value)}/>
            </label>
            <button className='bg-green-400 border-2 rounded-2xl w-fit p-2 hover:bg-green-500 active:bg-green-600'>Save</button>
        </div>
    )
}

export default TaskBox