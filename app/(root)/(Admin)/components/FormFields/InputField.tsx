import { Label } from "@/components/ui/label";
import { Input } from "@nextui-org/react";
import React from "react";
import { Controller } from "react-hook-form";

interface IInputField {
  placeholder?: string;
  control: any;
  name: string;
  label?: string;
  errors: any;
  type: string;
  icon?: React.ReactNode; // Add this prop
  disabled?: boolean;
  startContent?: any;
  className?: React.ReactNode | any;
  defaultValue?: any;
}

const InputField: React.FC<IInputField> = ({
  name,
  control,
  errors,
  label,
  type,
  icon,
  placeholder,
  disabled,
  startContent,
  className,
  defaultValue,
}) => {
  return (
    <div className="flex w-full flex-col">
      {/* <Label htmlFor="name">{label}</Label> */}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input
            placeholder={placeholder}
            variant="underlined"
            disabled={disabled}
            startContent={startContent}
            className={className}
            label={
              <div className="flex gap-1 py-3 text-lg font-semibold items-center">
                {icon}
                {label}
              </div>
            } // Include the icon in the label here
            type={type}
            {...field}
            // startContent={icon} // Use the icon prop here
          />
        )}
      />
      {errors[name] && (
        <p className="text-danger text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};

export default InputField;
