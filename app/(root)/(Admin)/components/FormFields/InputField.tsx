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
  icon?: React.ReactNode;
  disabled?: boolean;
  startContent?: any;
  className?: React.ReactNode | any;
  defaultValue?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // ... existing props ...
  min?: number;
  max?: number;
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
  onChange,
  max,
  min,
}) => {
  return (
    <div className="flex w-full flex-col">
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
            }
            min={min}
            max={max}
            type={type}
            {...field}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) onChange(e);
            }}
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
