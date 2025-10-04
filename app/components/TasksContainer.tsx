"use client"
import React, { Component, useState } from 'react'
import { Task } from '../page'
import TaskBox from "../components/TaskBox";
import TaskBoxR from "../components/TaskBoxR";
import { Urgency } from './Urgencies';


const TasksContainer = ({taskList}: {taskList: Task[]}) => {
    const [task, setTask] = useState<Task>({id:1, title: "Title", urgency: Urgency.LOW, date: "00/00/00"})

    return (
      <div className="grid grid-flow-col grid-rows-3 gap-4 text-black">
        <div className="row-span-3 row-start-2">
        </div>
        <div className="flex flex-col row-span-2 row-start-2 gap-3 overflow-y-scroll">
          {taskList.map(task => (
            <TaskBoxR
                key={task.id}
              task={task}
              setTask={setTask}
            />
          ))}
        </div>
        <div className="flex flex-col row-span-2 row-start-2 gap-3">
            <div className='flex gap-3'>
            <button className="bg-green-400 text-4xl w-fit p-2 border-2 h-fit hover:bg-green-500 active:bg-green-600">
          <img src="plus.svg"/>
        </button>
          <button className="bg-red-500 text-4xl w-fit p-2 border-2 h-fit hover:bg-red-600 active:bg-red-700"><img src="minus.svg"></img></button>
            </div>
          
                <TaskBox task={task} setTask={setTask}/>
        </div>
    </div>
    )
}

export default TasksContainer