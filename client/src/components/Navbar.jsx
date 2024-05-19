import { MdOutlineSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0">
      <div className="flex gap-4">
        <button
          onClick={() => dispatch(authActions.setOpenSidebar(true))}
          className="text-2xl text-gray-500 block md:hidden"
        >
          ☰
        </button>

        <div className="w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]">
          <MdOutlineSearch className="text-gray-500 text-xl" />

          <input
            type="text"
            placeholder="Search...."
            className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800"
          />
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <button className="text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base">
          <FaUser className="mr-2" aria-hidden="true" />
          Profile
        </button>
      </div>
    </div>
  );
};

export default Navbar;
