import { useNavigate } from "react-router-dom";
import styles from "../styles/register.module.css";
import { useState } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { URL } from "../utils/url";
const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(formData);
      const response = await fetch(`${URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);

      // if response is "ok" then Reset form and navigate to login page

      if (response.ok) {
        alert("registration successful");
        setFormData({
          fullName: "",
          email: "",
          password: "",
        });
        navigate("/log-in");
      } else {
        console.log("error inside response ", "error");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.rightSide}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className="">
            <p className={styles.formTitle}>Register Yourself</p>
          </div>

          <div className="flex flex-col gap-y-5">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="email" className="text-slate-800">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                className={clsx(
                  "bg-transparent px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 rounded-full",
                  styles.textbox
                )}
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="email" className="text-slate-800">
                Email Address
              </label>
              <input
                type="text"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleInputChange}
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
                  value={formData.password}
                  onChange={handleInputChange}
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
  );
};

export default Register;
