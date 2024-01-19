import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskRound } from "lucide-react";
import React from "react";

import SubTestForm from "./components/SubTestForm";

const AddSubTest = () => {
  return (
    <>
      <div>
        <Card>
          <CardHeader className="flex    ">
            <CardTitle className=" flex">
              <FlaskRound className="mx-2" /> Sub Tests
            </CardTitle>
          </CardHeader>
          <CardContent className=" flex flex-1">
            <SubTestForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AddSubTest;
