"use client";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import logoIcon from "@/public/OreoLogo.svg";
import fullLogoIcon from "@/public/OreoLogoFull.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { ArrowRightFromLine } from "lucide-react";
import CollapsIcon from "@/public/icons/collapseIcon";

const sideBarItems = [
  {
    title: "Consultaion",
  },
  {
    title: "Consultaion",
  },
  {
    title: "Consultaion",
  },
  {
    title: "Consultaion",
  },
  {
    title: "Consultaion",
  },
  {
    title: "Consultaion",
  },
  {
    title: "Consultaion",
  },
  {
    title: "Consultaion",
  },
  {
    title: "Consultaion",
  },
];

const SideBar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(true);

  const wrapperClasses = classNames("h-screen  border p-4", {
    ["w-80"]: !toggleCollapse,
    ["w-40"]: toggleCollapse,
  });

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <>
      <div
        className={wrapperClasses}
        style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center pl-1 gap-4">
              {toggleCollapse ? (
                <Image src={logoIcon} width={50} height={20} alt="" />
              ) : (
                <Image src={fullLogoIcon} width={200} height={100} alt="" />
              )}
            </div>
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          </div>
          <div className="flex flex-col items-start mt-24">
            {sideBarItems.map((item, index) => (
              <>
                <Accordion type="single" collapsible>
                  <AccordionItem key={index} value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
