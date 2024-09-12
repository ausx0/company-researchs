import { Label } from "@/components/ui/label";
import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

interface ISelectField {
  control: any;
  name: string;
  label?: string;
  errors: any;
  options: { value: string | number; label: string }[]; // Add this prop for the options
  isLoading?: boolean; // Add this prop for the loading state
  isMulti?: boolean;
  key?: any;
  onChange?: (value: any) => void; // Add this prop for the change handler
  isDisabled?: boolean;
}

const SelectField: React.FC<ISelectField> = ({
  control,
  name,
  label,
  errors,
  options, // Add this prop for the options
  isLoading, // Add this prop for the loading state
  isMulti,
  onChange, // Add this prop for the change handler
  isDisabled,
  key,
}) => {
  return (
    <>
      <div className="w-full">
        <Label>{label}</Label>
        <Controller
          key={name} // Add key prop here
          name={name}
          control={control}
          defaultValue={isMulti ? [] : ""}
          render={({ field }) => (
            <Select
              isDisabled={isDisabled}
              isMulti={isMulti}
              options={isLoading ? [] : options} // pass an empty array as options when data is being loaded
              value={
                isMulti
                  ? options?.filter((option) =>
                      field.value ? field.value.includes(option.value) : false
                    )
                  : options?.find((option) => option.value === field.value)
              }
              onChange={
                isMulti
                  ? (selectedOptions) => {
                      const options = Array.isArray(selectedOptions)
                        ? selectedOptions
                        : [selectedOptions];
                      field.onChange(
                        options.map((option: any) => option.value)
                      );
                      onChange &&
                        onChange(options.map((option: any) => option.value)); // Call the change handler
                    }
                  : (option) => {
                      field.onChange(option ? (option as any).value : "");
                      onChange && onChange(option ? (option as any).value : ""); // Call the change handler
                    }
              }
              isLoading={isLoading} // pass the isLoading prop to the Select component\
              // className="z-50"
              // menuPosition="absolute"

              menuPlacement="bottom"
              styles={{
                menu: (base) => ({ ...base, zIndex: 9999 }),
                menuList: (base) => ({
                  ...base,
                  zIndex: 9999,
                  backgroundColor: "white",
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
      </div>
    </>
  );
};

export default SelectField;
