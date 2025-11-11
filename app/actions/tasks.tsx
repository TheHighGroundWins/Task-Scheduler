"use server"

import { revalidatePath } from "next/cache"
import { Urgency } from "../components/Urgencies"

export async function updateOrInsert(title: string, urgency: Urgency, date: string) {
    const response = await fetch('https://task-server-backend.duckdns.org/updateOrInsert', {
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
    const response = await fetch('https://task-server-backend.duckdns.org/deleteTask', {
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