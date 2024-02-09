import { Input } from "@/components/ui/input";
import React from "react";
import { Controller, FieldError } from "react-hook-form";

interface Props {
  control: any;
  errors: any; // Adjust the type to handle possible undefined
  name: string;
  label: string;
  type: any;
}

const TextField: React.FC<Props> = ({ control, errors, name, label, type }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input type={type} {...field} placeholder={name} />
        )}
      />
      {errors && errors[name] && <span>{errors[name].message}</span>}{" "}
      {/* Conditionally render error message */}
    </>
  );
};

export default TextField;
