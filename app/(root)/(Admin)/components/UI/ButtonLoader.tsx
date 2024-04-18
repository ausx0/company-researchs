import { ButtonProps } from "@/app/models/Button";
import { Button } from "@/components/ui/button";
import { Spinner } from "@nextui-org/react";
import React from "react";

interface ButtonLoaderProps extends ButtonProps {
  color?: string; // Add the color prop here
}

const ButtonLoader: React.FC<ButtonLoaderProps> = ({
  disabled = false,
  type,
  children,
  color, // Destructure the color prop
}) => {
  return (
    <Button
      disabled={disabled}
      type={type}
      className="w-[10rem] p-4 px-5"
      color={color} // Pass the color prop down to the Button component
    >
      {disabled ? (
        <Spinner />
      ) : (
        children // No need for extra curly braces here
      )}
    </Button>
  );
};

export default ButtonLoader;
