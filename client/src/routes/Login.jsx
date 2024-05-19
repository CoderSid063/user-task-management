import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "../styles/login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { URL } from "../utils/url";
import { userActions } from "../store/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [loginFormData, setLoginFormData] = useState({
    email: "",
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
    // console.log(loginFormData);
    try {
      const response = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
        credentials: "include", // without this we can't store token in cookie storage only in "localhost"
      });
      // console.log(response);

      if (response.status === 200) {
        alert("Login successfull");
        const responseData = await response.json();
        const { data } = responseData;
        const { user } = data;

        //sending tokens to redux store :-
        dispatch(authActions.setTokens());

        // //sending userdata to redux store:-
        dispatch(userActions.setUserData(user));

        // Reset form after submission
        setLoginFormData({
          email: "",
          phoneNumber: "",
          password: "",
        });

        navigate("/dashboard");
      } else {
        console.log("Error logging in:", response.statusText);
      }
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };

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
