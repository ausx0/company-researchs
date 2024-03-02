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
  isLoading?: boolean; // Add this prop for the loading state
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
      <div className="mb-2">
        <Label>{label}</Label>
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            options={isLoading ? [] : options} // pass an empty array as options when data is being loaded
            value={options?.find((option) => option.value === field.value)} // set the selected option
            onChange={(option) => field.onChange((option as any).value)} // update the field value when an option is selected
            isLoading={isLoading} // pass the isLoading prop to the Select component\
            // className="z-50"
            menuPosition="fixed"
            menuPlacement="auto"
            styles={{
              menu: (base) => ({ ...base, zIndex: 9999 }),
              menuList: (base) => ({
                ...base,
                // Hide scrollbar for Chrome, Safari and Opera
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                // Hide scrollbar for IE, Edge and Firefox
                msOverflowStyle: "none" /* IE and Edge */,
                scrollbarWidth: "none" /* Firefox */,
              }),
            }}
          />
        )}
      />
      {errors[name] && <p className="text-danger">{errors[name].message}</p>}
    </>
  );
};

export default SelectField;
