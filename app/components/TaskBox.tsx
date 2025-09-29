"use client"
import React, { Component, useState } from 'react'
import { Urgency } from './Urgencies'

const TaskBox = () => {
    const [selectedUrgency, setUrgency] = useState<Urgency>(Urgency.LOW)

    return (
        <div className='flex flex-col bg-amber-300 gap-2 text-3xl p-5 border-2 rounded-2xl'>
            <input placeholder='Title'/>
            <label>Urgency:
                <select className='bg-black text-white text-2xl'
                value={selectedUrgency}
                onChange={(u)=>setUrgency(u.target.value as Urgency)}>
                  {Object.values(Urgency).map(urgency=>(
                    <option key={urgency} value={urgency} className='bg-black'>
                      {urgency}
                    </option>
                  ))}
                </select>
            </label>
            <label> Date: 
            <input placeholder='10/04/2025' type='date'/>
            </label>
        </div>
    )
}

export default TaskBox