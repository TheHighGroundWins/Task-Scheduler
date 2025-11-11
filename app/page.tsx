import { Urgency } from "./components/Urgencies";
import TasksContainer from "./components/TasksContainer";

export type Task = {
    id: number;
    title: string;
    urgency: Urgency;
    date: string;
  }

export default async function Home() {

  const getTasks = async () => {
    const res = await fetch("https://task-server-backend.duckdns.org/getTasks", {cache: "no-store"});
    return res.json();
  }

  
  const taskList: Task[] = await getTasks();
  

  return (
    <TasksContainer taskList={taskList}/>
  );
}
