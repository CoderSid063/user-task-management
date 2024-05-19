import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import ModalWrapper from "./ModalWrapper";
import { useDispatch } from "react-redux";
import { taskActions } from "../store/taskSlice";

const UpdateTaskModal = ({ task, isOpen, setIsOpen }) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: task.title,
      date: task.date,
    },
  });
  const dispatch = useDispatch();

  const submitHandler = (data) => {
    const updatedTask = {
      ...task,
      ...data,
    };
    dispatch(taskActions.updateTask(updatedTask));
    reset();
    setIsOpen(false);
  };

  return (
    <ModalWrapper open={isOpen} setOpen={setIsOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          UPDATE TASK
        </Dialog.Title>
        <div className="mt-2 flex flex-col gap-6">
          <label htmlFor="title" className="text-slate-800">
            Task Title
          </label>
          <input
            placeholder="Task Title"
            type="text"
            name="title"
            {...register("title", { required: true })}
            className={clsx(
              "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 w-full rounded"
            )}
          />
          <div className="flex gap-4">
            <div className="w-full">
              <label htmlFor="date" className="text-slate-800">
                Date
              </label>
              <input
                placeholder="Date"
                type="date"
                name="date"
                {...register("date", { required: true })}
                className={clsx(
                  "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 w-full rounded"
                )}
              />
            </div>
          </div>

          <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
            <button
              type="submit"
              className={clsx(
                "py-2 outline-none bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
              )}
            >
              Update
            </button>

            <button
              type="button"
              className={clsx(
                "py-2 outline-none bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
              )}
              onClick={() => setIsOpen(false)}
            >
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default UpdateTaskModal;
