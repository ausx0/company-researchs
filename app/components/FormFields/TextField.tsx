import { Input } from "@/components/ui/input";
import React from "react";
import { Controller, FieldError } from "react-hook-form";

interface Props {
  control: any;
  errors: any; // Adjust the type to handle possible undefined
  name: string;
  label: string;
  type: any;
  disabled?: boolean;
}

const TextField: React.FC<Props> = ({
  control,
  errors,
  name,
  label,
  type,
  disabled = false,
}) => {
  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor={name}>{label}</label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              className="w-full"
              type={type}
              {...field}
              placeholder={name}
              disabled={disabled}
            />
          )}
        />
        {errors && errors[name] && (
          <span className="text-danger">{errors[name].message}</span>
        )}{" "}
        {/* Conditionally render error message */}
      </div>
    </>
  );
};

export default TextField;
