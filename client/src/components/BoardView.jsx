import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";

const BoardView = () => {
  const task = useSelector((state) => state.task);
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
      {task.map((task, index) => (
        <TaskCard task={task} key={index} />
      ))}
    </div>
  );
};

export default BoardView;
