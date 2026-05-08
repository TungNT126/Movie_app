import { createPortal } from "react-dom";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import "./Modal.css";
import type { User } from "../../models/User";
// import { AuthContext } from "../../contexts/AuthContext";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isSignIn: boolean;
};

function RegisterForm({ isOpen, onClose, isSignIn }: ModalProps) {
  const dispatch = useDispatch();

  type RegisterFormType = z.infer<typeof registerSchema>;
  type LoginFormType = z.infer<typeof loginSchema>;

  const existingUsers = JSON.parse(localStorage.getItem("users") || "[]") || [];

  const registerSchema = z
    .object({
      username: z
        .string()
        .min(1, "Please insert information!")
        .refine(
          (val) => {
            const isDuplicate = existingUsers.find((user: User) => {
              return user.username === val;
            });
            return !isDuplicate;
          },
          { message: "Username has existed!" },
        ),
      email: z
        .string()
        .min(1, "Please insert information")
        .regex(EmailRegex, "Email invalid!")
        .refine(
          (val) => {
            const isDuplicate = existingUsers.find((user: User) => {
              return user.email === val;
            });

            return !isDuplicate;
          },
          { message: "Email has existed!" },
        ),
      password: z
        .string()
        .min(1, "Please insert information!")
        .min(6, "Password too short!"),
      confirmPassword: z.string().min(1, "Please insert information!"),
    })
    .refine((data) => data.confirmPassword === data.password, {
      message: "Confirm password incompatible!",
      path: ["confirmPassword"],
    });

  const loginSchema = z.object({
    username: z.string().min(1, "Please insert information!"),
    password: z
      .string()
      .min(1, "Please insert information!")
      .min(6, "Password too short"),
  });

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    reset: resetSignup,
    formState: { errors: errorsSignup },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    reset: resetLogin,
    formState: { errors: errorsLogin },
    setError: setErrorLogin,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  function onLoginSubmit(data: LoginFormType) {
    const matchedUser = existingUsers.find((user: User) => {
      return data.username === user.username;
    });

    if (!matchedUser) {
      setErrorLogin("username", {
        type: "manual",
        message: "Username does not exist",
      });
    } else {
      if (matchedUser.password === data.password) {
        dispatch(login(matchedUser));

        resetLogin();
        onClose();
      } else {
        setErrorLogin("password", {
          type: "manual",
          message: "Wrong password",
        });
      }
    }
  }

  function onSignupSubmit(data: RegisterFormType) {
    const newUser = {
      ...data,
      movieReviews: [],
      watchList: [],
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    resetSignup();
    onClose();
    alert("Sign up successfully🎉");
  }

  if (!isOpen) return null;

  return createPortal(
    <div className="modal">
      <div className="form-control">
        {isSignIn ? (
          <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
            <h2>Sign-in Form</h2>
            <div className="form-login">
              <label htmlFor="username">Username</label>
              <input
                className={`form-input ${errorsLogin.username && "invalid"}`}
                {...registerLogin("username")}
                name="username"
                type="text"
                placeholder="Insert username..."
              />
              <span className="form-message">
                {errorsLogin.username && (
                  <span>{errorsLogin.username.message}</span>
                )}
              </span>
              <label htmlFor="password">Password</label>
              <input
                className={`form-input ${errorsLogin.password && "invalid"}`}
                {...registerLogin("password")}
                name="password"
                type="password"
                placeholder="Insert password..."
              />
              <span className="form-message">
                {errorsLogin.password && (
                  <span>{errorsLogin.password.message}</span>
                )}
              </span>{" "}
            </div>
            <div className="form-button">
              <button type="submit">Submit</button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  resetLogin();
                }}
              >
                Close
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit(onSignupSubmit)}>
            <h2>Sign-up Form</h2>
            <div className="form-login">
              <label htmlFor="username">Username</label>
              <input
                className={`form-input ${errorsSignup.username && "invalid"}`}
                {...registerSignup("username")}
                name="username"
                type="text"
                placeholder="Insert username..."
              />
              <span className="form-message">
                {errorsSignup.username && (
                  <span>{errorsSignup.username.message}</span>
                )}
              </span>{" "}
              <label htmlFor="email">Email</label>
              <input
                className={`form-input ${errorsSignup.email && "invalid"}`}
                {...registerSignup("email")}
                name="email"
                type="email"
                placeholder="Insert email..."
              />
              <span className="form-message">
                {errorsSignup.email && (
                  <span>{errorsSignup.email.message}</span>
                )}
              </span>{" "}
              <label htmlFor="password">Password</label>
              <input
                className={`form-input ${errorsSignup.password && "invalid"}`}
                {...registerSignup("password")}
                name="password"
                type="password"
                placeholder="Insert password..."
              />
              <span className="form-message">
                {errorsSignup.password && (
                  <span>{errorsSignup.password.message}</span>
                )}
              </span>{" "}
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className={`form-input ${errorsSignup.confirmPassword && "invalid"}`}
                {...registerSignup("confirmPassword")}
                name="confirmPassword"
                type="password"
                placeholder="Insert confirm password..."
              />
              <span className="form-message">
                {errorsSignup.confirmPassword && (
                  <span>{errorsSignup.confirmPassword.message}</span>
                )}
              </span>
            </div>
            <div className="form-button">
              <button type="submit">Submit</button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  resetSignup();
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

export default RegisterForm;
