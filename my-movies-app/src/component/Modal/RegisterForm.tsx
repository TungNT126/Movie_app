import { createPortal } from "react-dom";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { User } from "../../models/User";
import { Form } from "react-bootstrap";

const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const inputClass = "rounded border-none px-2 py-1 bg-modal-input outline-none";
const inputInvalidClass =
  "rounded border border-red-500 px-2 py-1 outline-none bg-modal-input";
const errorMessageClass = "min-h-4 text-xs leading-4 text-red-500";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

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

type RegisterFormType = z.infer<typeof registerSchema>;

function RegisterForm({ isOpen, onClose }: ModalProps) {
  const {
    control: registerControl,
    handleSubmit: handleSignupSubmit,
    reset: resetSignup,
    formState: { errors: errorsSignup },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  function handleClose() {
    onClose();
    resetSignup();
  }

  function onSignupSubmit(data: RegisterFormType) {
    const newUser = {
      ...data,
      movieReviews: [],
      watchList: [],
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    handleClose();
    alert("Sign up successfully🎉");
  }

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div
        className="rounded-lg bg-modal-bg px-9 pt-5 pb-6 w-[450px]"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSignupSubmit(onSignupSubmit)}>
          <div className="flex flex-row justify-between items-center pb-4">
            <h2 className="text-modal-text text-xl">JOIN MOVIE CENTER</h2>
            <button
              className="cursor-pointer hover:opacity-80 text-modal-text text-[28px]"
              type="button"
              onClick={() => {
                handleClose();
              }}
            >
              x
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Form.Label className="text-white" htmlFor="username">
                Username
              </Form.Label>
              <Controller
                name="username"
                control={registerControl}
                render={({ field }) => (
                  <input
                    {...field}
                    className={
                      errorsSignup.username ? inputInvalidClass : inputClass
                    }
                    type="text"
                    placeholder="Insert username..."
                  />
                )}
              />
              <span className={errorMessageClass}>
                {errorsSignup.username && (
                  <span>{errorsSignup.username.message}</span>
                )}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <Form.Label className="text-white" htmlFor="email">
                Email
              </Form.Label>
              <Controller
                name="email"
                control={registerControl}
                render={({ field }) => (
                  <input
                    {...field}
                    className={
                      errorsSignup.email ? inputInvalidClass : inputClass
                    }
                    type="email"
                    placeholder="Insert email..."
                  />
                )}
              />
              <span className={errorMessageClass}>
                {errorsSignup.email && (
                  <span>{errorsSignup.email.message}</span>
                )}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <Form.Label className="text-white" htmlFor="password">
                Password
              </Form.Label>
              <Controller
                name="password"
                control={registerControl}
                render={({ field }) => (
                  <input
                    {...field}
                    className={
                      errorsSignup.password ? inputInvalidClass : inputClass
                    }
                    type="password"
                    placeholder="Insert password..."
                  />
                )}
              />
              <span className={errorMessageClass}>
                {errorsSignup.password && (
                  <span>{errorsSignup.password.message}</span>
                )}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <Form.Label className="text-white" htmlFor="confirmPassword">
                Confirm Password
              </Form.Label>
              <Controller
                name="confirmPassword"
                control={registerControl}
                render={({ field }) => (
                  <input
                    {...field}
                    className={
                      errorsSignup.confirmPassword
                        ? inputInvalidClass
                        : inputClass
                    }
                    type="password"
                    placeholder="Confirm password..."
                  />
                )}
              />
              <span className={errorMessageClass}>
                {errorsSignup.confirmPassword && (
                  <span>{errorsSignup.confirmPassword.message}</span>
                )}
              </span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              className="cursor-pointer bg-primary-btn text-white text-md font-bold py-1 px-4 my-2 rounded-lg hover:opacity-80"
              type="submit"
              // onClick={signUp}
            >
              Sign up
            </button>{" "}
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}

export default RegisterForm;
