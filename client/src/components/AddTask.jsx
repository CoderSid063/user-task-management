import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import ModalWrapper from "./ModalWrapper";
import { taskActions } from "../store/taskSlice";
import { useDispatch } from "react-redux";

const AddTask = ({ open, setOpen }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const submitHandler = (task) => {
    dispatch(taskActions.addTask(task));
    reset();
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {"ADD TASK"}
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
                label="Submit"
                type="submit"
                className={clsx(
                  "py-2 outline-none bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                )}
              >
                Submit
              </button>

              <button
                type="button"
                className={clsx(
                  "py-2 outline-none bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                )}
                onClick={() => setOpen(false)}
              >
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;
