import React from "react";

interface BadgeProps {
  text: string;
  color: string; // Tailwind CSS color class
}

const Badge: React.FC<BadgeProps> = ({ text, color }) => {
  return (
    <div
      className={`inline-block px-2 py-1 rounded-md font-semibold text-white ${color}`}
    >
      {text}
    </div>
  );
};

export default Badge;
