import Image from "next/image";
import TaskBox from "./components/TaskBox";

export default function Home() {
  return (
    <div className="grid grid-flow-col  grid-rows-3 gap-4 text-black">
        <div className="row-span-3">
          <TaskBox/>
        </div>
        <div className="row-span-2 row-start-2">
          <TaskBox/>
          <TaskBox/>
          <TaskBox/>
        </div>
        <div className="row-span-2 row-start-3">
                <TaskBox/>
        </div>
    </div>
  );
}
