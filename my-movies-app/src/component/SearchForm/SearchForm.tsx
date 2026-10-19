import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import searchIcon from "../../assets/icon/icons8-search.svg";
import { useState } from "react";

const schema = z.object({
  formValue: z.string(),
});

type IFormData = z.infer<typeof schema>;

function SearchForm() {
  const [isFocus, setIsFocus] = useState(false);

  const { control, handleSubmit, register } = useForm<IFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      formValue: "",
    },
  });

  function onSubmit() {
    return "search...";
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="formValue"
            control={control}
            render={({ field }) => (
              <div
                className={`flex flex-row items-center  rounded-lg w-50 ${isFocus ? "bg-white" : "bg-white/40"}`}
                onFocus={() => setIsFocus(true)}
                onBlur={() => {
                  if (!field.value) {
                    setIsFocus(false);
                  }
                }}
              >
                <img
                  className="w-4 h-4 hover:cursor-pointer mx-1"
                  src={searchIcon}
                  alt="search"
                  onClick={handleSubmit(onSubmit)}
                />
                <input
                  className="w-100 outline-none border-none "
                  type="text"
                  {...register("formValue")}
                />
              </div>
            )}
          />
        </div>
      </form>
    </>
  );
}

export default SearchForm;
