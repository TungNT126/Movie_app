import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useSearchTerm } from "../../services/api/movie";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  formValue: z.string(),
});

type FormInput = z.infer<typeof schema>;

type LogMovieProps = {
  isOpen: boolean;
  onClose: () => void;
};

function LogMovie({ isOpen, onClose }: LogMovieProps) {
  const { control, handleSubmit } = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      formValue: "",
    },
  });
  function onSubmit() {
    return true;
  }

  if (!isOpen) return;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div
        className="rounded-lg bg-modal-bg px-9 pt-5 pb-6 w-190"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-between items-center text-white px-5 py-4 text-2xl">
            <span>Add to your films...</span>
            <span
              className="cursor-pointer opacity-70 hover:opacity-100"
              onClick={onClose}
            >
              X
            </span>
          </div>
          <div className="flex justify-center p-5">
            <Controller
              name="formValue"
              control={control}
              render={({ field }) => (
                <input
                  className="h-10 w-112.5 bg-modal-input p-2.5 rounded-md outline-none focus:bg-white"
                  type="text"
                  placeholder="Search for film..."
                  {...field}
                />
              )}
            />
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}

export default LogMovie;
