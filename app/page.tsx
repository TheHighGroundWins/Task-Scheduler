import { Urgency } from "./components/Urgencies";
import TasksContainer from "./components/TasksContainer";

export type Task = {
    id: number;
    title: string;
    urgency: Urgency;
    date: string;
  }

export default async function Home() {
  const handlClick = ()=>{
    console.log("clicked")
  }

  const getTasks = async () => {
    const res = await fetch("http://localhost:3001/getTasks", {cache: "no-store"});
    return res.json();
  }

  
  const taskList: Task[] = await getTasks();
  

  return (
    <TasksContainer taskList={taskList}/>
  );
}
