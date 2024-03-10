import { Spinner } from "@nextui-org/react";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full flex p-10 items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
