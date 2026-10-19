import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "react-bootstrap";
import type { User } from "../../models/User";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const inputClass =
  "rounded border border-gray-300 px-2 py-1 bg-modal-input text-black";
const inputInvalidClass =
  "rounded border border-red-500 px-2 py-1 outline-none bg-modal-input text-black";
const errorMessageClass = "min-h-4 text-xs leading-4 text-red-500";

const schema = z.object({
  username: z.string().min(1, "Please insert information!"),
  password: z.string().min(1, "Please insert information!"),
});

type IFormData = z.infer<typeof schema>;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const existingUsers = JSON.parse(localStorage.getItem("users") || "[]") || [];

function LoginForm({ isOpen, onClose }: ModalProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<IFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function handleClose() {
    onClose();
    reset();
  }

  function onSubmit(data: IFormData) {
    const matchedUser = existingUsers.find((user: User) => {
      return data.username === user.username;
    });

    if (!matchedUser) {
      setError("username", {
        type: "manual",
        message: "username does not exist",
      });
    } else {
      if (matchedUser.password === data.password) {
        dispatch(login(matchedUser));

        handleClose();
        navigate("/home");
      } else {
        setError("password", {
          type: "manual",
          message: "incorrect password",
        });
      }
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="absolute right-0 top-0 bg-bg-primary rounded-md"
      style={{ boxShadow: "outset 0 0 5px #00000080" }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-2 items-center pt-2 px-4">
          <button
            className="cursor-pointer hover:opacity-80 text-modal-text text-lg pr-2"
            type="button"
            onClick={() => {
              handleClose();
            }}
          >
            x
          </button>
          <div className="flex flex-col items-start">
            <Form.Label className="text-modal-text" htmlFor="username">
              Username
            </Form.Label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <input
                  className={errors.username ? inputInvalidClass : inputClass}
                  {...field}
                  type="text"
                  autoComplete="username"
                  placeholder="Insert username..."
                />
              )}
            />
            {errors ? (
              <span className={errorMessageClass}>
                {errors.username && <span>{errors.username.message}</span>}
              </span>
            ) : undefined}
          </div>
          <div className="flex flex-col items-start">
            <Form.Label className="text-modal-text" htmlFor="password">
              Password
            </Form.Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  className={errors.password ? inputInvalidClass : inputClass}
                  {...field}
                  type="password"
                  autoComplete="current-password"
                  placeholder="Insert password..."
                />
              )}
            />
            {errors ? (
              <span className={errorMessageClass}>
                {errors.password && <span>{errors.password.message}</span>}
              </span>
            ) : undefined}
          </div>
          <div className="">
            <button
              className="cursor-pointer bg-primary-btn text-white text-md font-bold py-1 px-4 mt-2 rounded-lg hover:opacity-80"
              type="submit"
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
