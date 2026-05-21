import { createPortal } from "react-dom";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { User } from "../../models/User";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const inputClass = "rounded border border-gray-300 px-2 py-1";
const inputInvalidClass =
  "rounded border border-red-500 px-2 py-1 outline-none";
const errorMessageClass = "min-h-4 text-xs leading-4 text-red-500";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded-lg bg-white p-5">
        {isSignIn ? (
          <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
            <h2 className="font-bold text-2xl mb-8">Sign-in Form</h2>
            <div className="flex flex-col gap-2">
              <label className="text-black" htmlFor="username">
                Username
              </label>
              <input
                className={
                  errorsLogin.username ? inputInvalidClass : inputClass
                }
                {...registerLogin("username")}
                name="username"
                type="text"
                placeholder="Insert username..."
              />
              {errorsLogin ? (
                <span className={errorMessageClass}>
                  {errorsLogin.username && (
                    <span>{errorsLogin.username.message}</span>
                  )}
                </span>
              ) : (
                <span>Test wrong</span>
              )}

              <label className="text-black" htmlFor="password">
                Password
              </label>
              <input
                className={
                  errorsLogin.password ? inputInvalidClass : inputClass
                }
                {...registerLogin("password")}
                name="password"
                type="password"
                placeholder="Insert password..."
              />
              <span className={errorMessageClass}>
                {errorsLogin.password && (
                  <span>{errorsLogin.password.message}</span>
                )}
              </span>
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
            <div className="flex flex-col gap-2">
              <label className="text-black" htmlFor="username">
                Username
              </label>
              <input
                className={
                  errorsSignup.username ? inputInvalidClass : inputClass
                }
                {...registerSignup("username")}
                name="username"
                type="text"
                placeholder="Insert username..."
              />
              <span className={errorMessageClass}>
                {errorsSignup.username && (
                  <span>{errorsSignup.username.message}</span>
                )}
              </span>
              <label className="text-black" htmlFor="email">
                Email
              </label>
              <input
                className={errorsSignup.email ? inputInvalidClass : inputClass}
                {...registerSignup("email")}
                name="email"
                type="email"
                placeholder="Insert email..."
              />
              <span className={errorMessageClass}>
                {errorsSignup.email && (
                  <span>{errorsSignup.email.message}</span>
                )}
              </span>
              <label className="text-black" htmlFor="password">
                Password
              </label>
              <input
                className={
                  errorsSignup.password ? inputInvalidClass : inputClass
                }
                {...registerSignup("password")}
                name="password"
                type="password"
                placeholder="Insert password..."
              />
              <span className={errorMessageClass}>
                {errorsSignup.password && (
                  <span>{errorsSignup.password.message}</span>
                )}
              </span>
              <label className="text-black" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className={
                  errorsSignup.confirmPassword ? inputInvalidClass : inputClass
                }
                {...registerSignup("confirmPassword")}
                name="confirmPassword"
                type="password"
                placeholder="Insert confirm password..."
              />
              <span className={errorMessageClass}>
                {errorsSignup.confirmPassword && (
                  <span>{errorsSignup.confirmPassword.message}</span>
                )}
              </span>
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
