import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authActions } from "../store/authSlice";
import clsx from "clsx";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
} from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { URL } from "../utils/url";

const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
];

const Sidebar = () => {
  const { userData } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const sidebarLinks = userData?.isAdmin ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(authActions.setOpenSidebar(false));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      // console.log(response);

      if (response.status === 200) {
        // Clear tokens from Redux store and local storage
        dispatch(authActions.clearTokens());
        alert("Logout Successfully");
        navigate("/log-in");
      } else {
        console.error("Failed to logout:", response.data.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
          path === el.link.split("/")[0] ? "bg-blue-700 text-neutral-100" : ""
        )}
      >
        {el.icon}
        <span className="hover:text-[#2564ed]">{el.label}</span>
      </Link>
    );
  };
  return (
    <div className="w-full  h-full flex flex-col gap-6 p-5">
      <h1 className="flex gap-1 items-center">
        <p className="bg-blue-600 p-2 rounded-full">
          <MdOutlineAddTask className="text-white text-2xl font-black" />
        </p>
        <span className="text-2xl font-bold text-black">Add Task</span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
      <button
        onClick={handleLogout}
        className={`text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base`}
      >
        <IoLogOutOutline className="mr-2" aria-hidden="true" />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
