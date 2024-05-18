import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "../styles/login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoginFormData({
        email: "",
        phoneNumber: "",
        password: "",
      });
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };

  const user = "";

  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {/* left side */}
        <div className={styles.leftSide}>
          <div className={styles.leftContent}>
            <span className={styles.taskManage}>
              Manage all your task in one place!
            </span>
            <p className={styles.taskTitle}>
              <span>Your daily</span>
              <span>Task Manager</span>
            </p>
          </div>
        </div>

        {/* right side */}
        <div className={styles.rightSide}>
          <form onSubmit={handleLoginSubmit} className={styles.formContainer}>
            <div className="">
              <p className={styles.formTitle}>Welcome back!</p>
            </div>

            <div className="flex flex-col gap-y-5">
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="email" className="text-slate-800">
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="email@example.com"
                  value={loginFormData.email}
                  onChange={handleLoginInputChange}
                  className={clsx(
                    "bg-transparent px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 rounded-full",
                    styles.textbox
                  )}
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="password" className="text-slate-800">
                  Password
                </label>
                <div className="flex ">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginFormData.password}
                    onChange={handleLoginInputChange}
                    placeholder="your password"
                    required
                    className={clsx(
                      "bg-transparent px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 rounded-full",
                      styles.textbox
                    )}
                  />
                  <p
                    className={styles.iconWrapper}
                    onClick={handleTogglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </p>
                </div>
              </div>

              <span className={styles.forgotPassword}>Forget Password?</span>

              <button
                type="submit"
                className={clsx(
                  styles.submitButton,
                  "w-full h-10 bg-blue-600 text-white rounded-full"
                )}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
