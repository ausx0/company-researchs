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
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  ArchiveIcon,
  ArrowRight,
  ArrowRightFromLine,
  BadgeDollarSign,
  BookText,
  FileSearch,
  MailCheck,
  MessageCircleWarning,
  MessageSquareText,
  Microscope,
  Settings,
  TestTubes,
  Users,
} from "lucide-react";
import CollapsIcon from "@/public/icons/collapseIcon";
import ConsultationIcon from "@/public/icons/consultation";
import ResearchIcon from "@/public/icons/researchIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(true);

  const wrapperClasses = classNames("   p-2 ml-2 ", {
    ["w-[200px]"]: !toggleCollapse,
    ["w-[70px] "]: toggleCollapse,
  });

  const collapseIconClasses = classNames(
    "p-1 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const collapseMenuIcon = classNames("w-full", {
    "flex flex-col gap-6 items-center": toggleCollapse,
  });

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <>
      <div
        className={wrapperClasses}
        style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center  gap-2 ">
              <Image
                src={fullLogoIcon}
                alt=""
                className={`transition duration-800 ease-linear max-w-[50%] `}
              />
            </div>
            <button
              className={`${collapseIconClasses} hover:opacity-60 transition duration-300 ease-soft-spring`}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          </div>
          <div className="flex flex-col items-start mt-2">
            <Accordion type="single" collapsible className={collapseMenuIcon}>
              {/* conultatiton */}
              {toggleCollapse ? (
                <Dropdown>
                  <DropdownTrigger className="cursor-pointer">
                    <MessageSquareText className="w-6 mx-1 opacity-50 " />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new">New file</DropdownItem>
                    <DropdownItem key="copy">Copy link</DropdownItem>
                    <DropdownItem key="edit">Edit file</DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <AccordionItem value={"item-1"}>
                  <AccordionTrigger className="text-[14px]">
                    <div className="flex">
                      <MessageSquareText className="w-6 mx-1 opacity-50 " />
                    </div>
                    {!toggleCollapse && <>Consultation</>}
                  </AccordionTrigger>
                  <AccordionContent className="text-[12px]">
                    dsfsdfsdgsdg
                  </AccordionContent>
                </AccordionItem>
              )}
              {/* Researches */}
              {toggleCollapse ? (
                <Dropdown>
                  <DropdownTrigger className="cursor-pointer">
                    <Microscope className="w-6 opacity-50" />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new">New file</DropdownItem>
                    <DropdownItem key="copy">Copy link</DropdownItem>
                    <DropdownItem key="edit">Edit file</DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <AccordionItem value={"item-2"}>
                  <AccordionTrigger className="text-[14px]">
                    <div>
                      <Microscope className="w-6 opacity-50" />
                    </div>
                    {!toggleCollapse && <>Researches</>}
                  </AccordionTrigger>
                  <AccordionContent className="text-[12px]">
                    dsfsdfsdgsdg
                  </AccordionContent>
                </AccordionItem>
              )}
              {/* conultatiton */}
              {toggleCollapse ? (
                <Dropdown>
                  <DropdownTrigger className="cursor-pointer">
                    <TestTubes className="w-6 opacity-50" />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new">New file</DropdownItem>
                    <DropdownItem key="copy">Copy link</DropdownItem>
                    <DropdownItem key="edit">Edit file</DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <AccordionItem value={"item-3"}>
                  <AccordionTrigger className="text-[14px]">
                    <div className="flex">
                      <TestTubes className="w-6 opacity-50 mr-2" />

                      {!toggleCollapse && (
                        <div className="w-ful">Tests & Devices</div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-[12px] flex items-center ml-2 ">
                    <Link
                      href="/tests"
                      className={
                        pathname == "/tests"
                          ? "opacity-100 text-cyan-400 flex w-full items-center "
                          : "opacity-50 flex items-center w-full  hover:opacity-100"
                      }
                    >
                      <ArrowRight className="w-4 mr-2" />
                      Tests
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              )}
              {/* conultatiton */}
              {toggleCollapse ? (
                <Dropdown>
                  <DropdownTrigger className="cursor-pointer">
                    <Users className="w-6 opacity-50" />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new">New file</DropdownItem>
                    <DropdownItem key="copy">Copy link</DropdownItem>
                    <DropdownItem key="edit">Edit file</DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <AccordionItem value={"item-4"}>
                  <AccordionTrigger className="text-[14px]">
                    <div>
                      <Users className="w-6 opacity-50" />
                    </div>
                    {!toggleCollapse && <>Clients</>}
                  </AccordionTrigger>
                  <AccordionContent className="text-[12px]">
                    dsfsdfsdgsdg
                  </AccordionContent>
                </AccordionItem>
              )}
              {/* conultatiton */}
              {toggleCollapse ? (
                <Dropdown>
                  <DropdownTrigger className="cursor-pointer">
                    <ArchiveIcon className="w-6 opacity-50" />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new">New file</DropdownItem>
                    <DropdownItem key="copy">Copy link</DropdownItem>
                    <DropdownItem key="edit">Edit file</DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <AccordionItem value={"item-5"}>
                  <AccordionTrigger className="text-[14px]">
                    <div>
                      <ArchiveIcon className="w-6 opacity-50" />
                    </div>
                    {!toggleCollapse && <>Inventory</>}
                  </AccordionTrigger>
                  <AccordionContent className="text-[12px]">
                    dsfsdfsdgsdg
                  </AccordionContent>
                </AccordionItem>
              )}
              {/* conultatiton */}
              {toggleCollapse ? (
                <Dropdown>
                  <DropdownTrigger className="cursor-pointer">
                    <BadgeDollarSign className="w-6 opacity-50" />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new">New file</DropdownItem>
                    <DropdownItem key="copy">Copy link</DropdownItem>
                    <DropdownItem key="edit">Edit file</DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <AccordionItem value={"item-6"}>
                  <AccordionTrigger className="text-[14px]">
                    <div>
                      <BadgeDollarSign className="w-6 opacity-50" />
                    </div>
                    {!toggleCollapse && <>Finance</>}
                  </AccordionTrigger>
                  <AccordionContent className="text-[12px]">
                    dsfsdfsdgsdg
                  </AccordionContent>
                </AccordionItem>
              )}
              {/* conultatiton */}
              {toggleCollapse ? (
                <Dropdown>
                  <DropdownTrigger className="cursor-pointer">
                    <MessageCircleWarning className="w-6 opacity-50" />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new">New file</DropdownItem>
                    <DropdownItem key="copy">Copy link</DropdownItem>
                    <DropdownItem key="edit">Edit file</DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <AccordionItem value={"item-7"}>
                  <AccordionTrigger className="text-[14px]">
                    <div>
                      <MessageCircleWarning className="w-6 opacity-50" />
                    </div>
                    {!toggleCollapse && <>Reports</>}
                  </AccordionTrigger>
                  <AccordionContent className="text-[12px]">
                    dsfsdfsdgsdg
                  </AccordionContent>
                </AccordionItem>
              )}
              {/* conultatiton */}
              {toggleCollapse ? (
                <Dropdown>
                  <DropdownTrigger className="cursor-pointer">
                    <MailCheck className="w-6 opacity-50" />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new">New file</DropdownItem>
                    <DropdownItem key="copy">Copy link</DropdownItem>
                    <DropdownItem key="edit">Edit file</DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <AccordionItem value={"item-8"}>
                  <AccordionTrigger className="text-[14px]">
                    <div>
                      <MailCheck className="w-6 opacity-50" />
                    </div>
                    {!toggleCollapse && <>Messaging</>}
                  </AccordionTrigger>
                  <AccordionContent className="text-[12px]">
                    dsfsdfsdgsdg
                  </AccordionContent>
                </AccordionItem>
              )}
              {/* conultatiton */}
              {toggleCollapse ? (
                <Dropdown>
                  <DropdownTrigger className="cursor-pointer">
                    <Settings className="w-6 opacity-50" />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="new">New file</DropdownItem>
                    <DropdownItem key="copy">Copy link</DropdownItem>
                    <DropdownItem key="edit">Edit file</DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <AccordionItem value={"item-9"}>
                  <AccordionTrigger className="text-[14px]">
                    <div>
                      <Settings className="w-6 opacity-50" />
                    </div>
                    {!toggleCollapse && <>Settings</>}
                  </AccordionTrigger>
                  <AccordionContent className="text-[12px]">
                    dsfsdfsdgsdg
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
