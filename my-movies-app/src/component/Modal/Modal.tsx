import { createPortal } from "react-dom";
import React, { useState } from "react";

import type { User } from "../../models/User";

const inputClass = "rounded border border-gray-300 px-2 py-1";
const inputInvalidClass =
  "rounded border border-red-500 px-2 py-1 outline-none";
const errorMessageClass = "text-xs leading-4 text-red-500";
// import { AuthContext } from "../../contexts/AuthContext";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isSignIn: boolean;
};

function Modal({ isOpen, onClose, isSignIn }: ModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();

  // const authContext = useContext(AuthContext);

  // Validation
  function validateField(name: string, value: string): string {
    if (!value.trim()) return "Please insert information!";

    switch (name) {
      case "password":
        return value.length < 6 ? "Password must be more than 6 digits!" : "";
      case "confirmPassword":
        return value !== formData.password ? "Password is not correct" : "";
      case "email":
        return EmailRegex.test(value) ? "" : "Email is not valid";
      default:
        return "";
    }
  }

  // Handle onChange
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  // Handle Blur
  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    const errorMsg = validateField(name, value);

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  }

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const newErrors = { ...errors };
    let isValid = true;

    // Define which fields to validate
    const fieldsToValidate = isSignIn
      ? ["username", "password"]
      : ["username", "email", "password", "confirmPassword"];

    fieldsToValidate.forEach((key) => {
      const typedKey = key as keyof typeof formData;
      const value = formData[typedKey];

      const errorMsg = validateField(key, value);

      newErrors[typedKey] = errorMsg;

      if (errorMsg !== "") {
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      const existingUsers: User[] = JSON.parse(
        localStorage.getItem("users") || "[]",
      );
      if (isSignIn) {
        const matchedUsername = existingUsers.find((user) => {
          return (
            user.username === formData.username &&
            user.password === formData.password
          );
        });

        if (matchedUsername) {
          dispatch(login(matchedUsername));

          onClose();
          refreshForm();
        } else {
          console.log("Wrong");
          setErrors((prev) => ({
            ...prev,
            username: "Incorrect username or password",
            password: "Incorrect username or password",
          }));
          setFormData((prev) => ({ ...prev, password: "" }));
        }
      } else {
        const isUsernameTaken = existingUsers.some(
          (user) => user.username === formData.username,
        );

        const isEmailTaken = existingUsers.some(
          (user) => user.email === formData.email,
        );

        if (isUsernameTaken) {
          setErrors((prev) => ({ ...prev, username: "Username has existed" }));
          return;
        }

        if (isEmailTaken) {
          setErrors((prev) => ({ ...prev, email: "Email has existed" }));
          return;
        }

        const newUser: User = {
          id: crypto.randomUUID(),
          username: formData.username,
          email: formData.email,
          password: formData.password,
          movieReviews: [],
        };

        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        alert("Sign up successful");
        // authContext?.login(newUser);

        onClose();
        refreshForm();
      }
    }
  }

  // Refresh Form
  function refreshForm() {
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setErrors({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-lg bg-white p-5">
        {isSignIn ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-red-600">Sign-in Form</h2>
            <div className="flex flex-col gap-2">
              <label className="text-black" htmlFor="username">
                Username
              </label>
              <input
                className={errors.username ? inputInvalidClass : inputClass}
                name="username"
                type="text"
                placeholder="Insert username..."
                value={formData.username}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.username && (
                <span className={errorMessageClass}>{errors.username}</span>
              )}

              <label className="text-black" htmlFor="password">
                Password
              </label>
              <input
                className={errors.password ? inputInvalidClass : inputClass}
                name="password"
                type="password"
                placeholder="Insert password..."
                value={formData.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.password && (
                <span className={errorMessageClass}>{errors.password}</span>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <button className="cursor-pointer" type="submit">
                Submit
              </button>
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => {
                  onClose();
                  refreshForm();
                }}
              >
                Close
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>Sign-up Form</h2>
            <div className="flex flex-col gap-2">
              <label className="text-black" htmlFor="username">
                Username
              </label>
              <input
                className={errors.username ? inputInvalidClass : inputClass}
                name="username"
                type="text"
                placeholder="Insert username..."
                value={formData.username}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.username && (
                <span className={errorMessageClass}>{errors.username}</span>
              )}
              <label className="text-black" htmlFor="email">
                Email
              </label>
              <input
                className={errors.email ? inputInvalidClass : inputClass}
                name="email"
                type="email"
                placeholder="Insert email..."
                value={formData.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.email && (
                <span className={errorMessageClass}>{errors.email}</span>
              )}
              <label className="text-black" htmlFor="password">
                Password
              </label>
              <input
                className={errors.password ? inputInvalidClass : inputClass}
                name="password"
                type="password"
                placeholder="Insert password..."
                value={formData.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.password && (
                <span className={errorMessageClass}>{errors.password}</span>
              )}
              <label className="text-black" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className={
                  errors.confirmPassword ? inputInvalidClass : inputClass
                }
                name="confirmPassword"
                type="password"
                placeholder="Insert confirm password..."
                value={formData.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className={errorMessageClass}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <button className="cursor-pointer" type="submit">
                Submit
              </button>
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => {
                  onClose();
                  refreshForm();
                }}
              >
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
