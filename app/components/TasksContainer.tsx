"use client"
import React, { useState } from 'react'
import { Task } from '../page'
import TaskBox from "../components/TaskBox";
import TaskBoxR from "../components/TaskBoxR";
import { Urgency } from './Urgencies';
import { deleteTask } from '../actions/tasks';
import { useRouter } from "next/navigation";
import { updateOrInsert } from '../actions/tasks';
import Image from 'next/image';


const TasksContainer = ({taskList}: {taskList: Task[]}) => {
    const [task, setTask] = useState<Task>({id:1, title: "Title", urgency: Urgency.LOW, date: "00/00/00"})
    const router = useRouter();

    const deleteAndRefresh = async () => {
        await deleteTask(task.title);
        router.refresh();
        setTask({
            id: 0,
            title: "",
            urgency: Urgency.LOW,
            date: ""
        })
    }

    const updateAndClear = async () => {
        if (task.title != "")
            await updateOrInsert(task.title, task.urgency, task.date);
        router.refresh();
        setTask({
            id: 0,
            title: "",
            urgency: Urgency.LOW,
            date: ""
        })
    }

    return (
      <div className="grid grid-flow-col grid-rows-3 gap-4 text-black">
        <div className="flex flex-col row-span-3 row-start-2 gap-3 h-[800px]">
            <h1 className='text-3xl bg-amber-400 rounded-2xl p-2'>By date</h1>
            <div className='flex flex-col overflow-y-auto h-full gap-3'>
                {[...taskList].sort((a,b) => new Date(a.date).getTime() - 
                new Date(b.date).getTime()).map(task => (
            <TaskBoxR
                key={task.id}
              task={task}
              setTask={setTask}
            />
          ))}
          </div>
        </div>
        <div className="flex flex-col row-span-2 row-start-2 h-[800px] gap-4">
            <h1 className='text-3xl bg-amber-400 rounded-2xl p-2'>By modified</h1>
            <div className='flex flex-col overflow-y-auto h-full gap-3'>
                {[...taskList].reverse().map(task => (
            <TaskBoxR
                key={task.id}
              task={task}
              setTask={setTask}
            />
          ))}
          </div>
        </div>
        <div className="flex flex-col row-span-2 row-start-2 gap-3">
            <div className='flex gap-3'>
            <button className="bg-green-400 text-4xl w-fit p-2 border-2 h-fit hover:bg-green-500 active:bg-green-600" onClick={updateAndClear}>
          <Image src="plus.svg" alt='+' width={25} height={25}/>
        </button>
          <button className="bg-red-500 text-4xl w-fit p-2 border-2 h-fit hover:bg-red-600 active:bg-red-700" onClick={() => deleteAndRefresh()}><Image src="minus.svg" width={25} height={25} alt="-"/></button>
            </div>
          
                <TaskBox task={task} setTask={setTask}/>
        </div>
    </div>
    )
}

export default TasksContainer