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
    const res = await fetch("http://ec2-3-129-18-99.us-east-2.compute.amazonaws.com:3001/getTasks", {cache: "no-store"});
    return res.json();
  }

  
  const taskList: Task[] = await getTasks();
  

  return (
    <TasksContainer taskList={taskList}/>
  );
}
