"use server"

import { revalidatePath } from "next/cache"
import { Urgency } from "../components/Urgencies"

export async function updateOrInsert(title: string, urgency: Urgency, date: string) {
    const response = await fetch('http://ec2-3-129-18-99.us-east-2.compute.amazonaws.com:3001/updateOrInsert', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({title, urgency, date}),
    })

    
  if (!response.ok) {
    console.error("Server error", response.status);
    return;
  }
}

export async function deleteTask(title: string) {
    const response = await fetch('http://ec2-3-129-18-99.us-east-2.compute.amazonaws.com:3001/deleteTask', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({title}),
    })

    
  if (!response.ok) {
    console.error("Server error", response.status);
    return;
  }

  revalidatePath("/");
}