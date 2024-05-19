import { useState } from "react";
import { useDispatch } from "react-redux";
import { formatDate } from "../utils";
import { MdOutlineEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { taskActions } from "../store/taskSlice";
import UpdateTaskModal from "./UpdateTaskModal";

const TaskCard = ({ task }) => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(taskActions.removeTask(id));
  };

  const handleUpdate = () => {
    setIsUpdateOpen(true);
  };

  return (
    <>
      <div className="w-full h-fit bg-white shadow-md p-4 rounded">
        <>
          <div className="flex items-center gap-2">
            <h4 className="line-clamp-1 text-black">{task?.title}</h4>
            <div className="px-3 py-1 space-y-2 ">
              <MdOutlineEdit
                className="mr-2 h-5 w-5 cursor-pointer "
                onClick={() => handleUpdate()}
              />
            </div>
          </div>
          <span className="text-sm text-gray-600">
            {formatDate(new Date(task?.date))}
          </span>
        </>
        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex justify-end">
          <FaTrash
            className="text-red-600 cursor-pointer"
            onClick={() => handleRemove(task._id)}
          />
        </div>
      </div>

      {isUpdateOpen && (
        <UpdateTaskModal
          task={task}
          isOpen={isUpdateOpen}
          setIsOpen={setIsUpdateOpen}
        />
      )}
    </>
  );
};

export default TaskCard;
