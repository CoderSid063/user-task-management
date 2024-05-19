import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import clsx from "clsx";
import BoardView from "./BoardView";
import AddTask from "./AddTask";

const Tasks = () => {
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setOpen(true);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleButtonClick}
          className={clsx(
            "px-3 py-2 outline-none flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5"
          )}
        >
          <span>Create Task</span>
          <IoMdAdd className="text-lg" />
        </button>
      </div>

      <BoardView />

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;
