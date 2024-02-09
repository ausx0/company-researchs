import { Label } from "@/components/ui/label";
import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

interface ISelectField {
  control: any;
  name: string;
  label: string;
  errors: any;
  options: { value: string; label: string }[]; // Add this prop for the options
  isLoading: boolean; // Add this prop for the loading state
}

const SelectField: React.FC<ISelectField> = ({
  control,
  name,
  label,
  errors,
  options, // Add this prop for the options
  isLoading, // Add this prop for the loading state
}) => {
  return (
    <>
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            options={isLoading ? [] : options} // pass an empty array as options when data is being loaded
            value={options?.find((option) => option.value === field.value)} // set the selected option
            onChange={(option) => field.onChange((option as any).value)} // update the field value when an option is selected
            isLoading={isLoading} // pass the isLoading prop to the Select component
          />
        )}
      />
      {errors[name] && <p>{errors[name].message}</p>}
    </>
  );
};

export default SelectField;
