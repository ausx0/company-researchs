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
  HomeIcon,
  MailCheck,
  MessageCircleWarning,
  MessageSquareText,
  Microscope,
  SendToBack,
  Settings,
  TestTubes,
  Users,
} from "lucide-react";
import CollapsIcon from "@/public/icons/collapseIcon";
import ConsultationIcon from "@/public/icons/consultation";
import ResearchIcon from "@/public/icons/researchIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    icon: <HomeIcon className="w-6 opacity-50 mr-2" />,
    title: "Home",
    subItems: [{ text: "Dashboard", link: "/home" }],
  },

  {
    icon: <SendToBack className="w-6 opacity-50 mr-2" />,
    title: "Orders",
    subItems: [
      { text: "Add Order", link: "/orders/add" },
      { text: "All Orders", link: "/orders" },
    ],
  },
  // {
  //   icon: <MessageSquareText className="w-6 opacity-50 mr-2" />,
  //   title: "Consultation",
  //   subItems: [
  //     { text: "Add Consultation", link: "/consultation/add" },
  //     { text: "All Consultations", link: "/consultation" },
  //   ],
  // },
  // {
  //   icon: <Microscope className="w-6 opacity-50 mr-2" />,
  //   title: "Researches",
  //   subItems: [
  //     { text: "Add Research", link: "/researches/add" },
  //     { text: "All Researches", link: "/researches" },
  //   ],
  // },
  {
    icon: <TestTubes className="w-6 opacity-50 mr-2" />,
    title: "Samples & Tests",
    subItems: [
      { text: "Tests", link: "/test-devices/tests" },
      { text: "Samples", link: "/test-devices/samples" },
      { text: "Sub Tests", link: "/test-devices/subTests" },

      // { text: "Devices", link: "/test-devices/devices" },

      // Add more subItems as needed
    ],
  },
  {
    icon: <Users className="w-6 opacity-50 mr-2" />,
    title: "Customers",
    subItems: [
      { text: "Patients", link: "/customers/patients" },
      { text: "Clients", link: "/customers/clients" },
      // { text: "Suppliers", link: "/clients/suppliers" },
    ],
  },
  {
    icon: <ArchiveIcon className="w-6 opacity-50 mr-2" />,
    title: "Inventory",
    subItems: [
      // Add subItems for Inventory
      { text: "Items", link: "/inventory/items" },
    ],
  },
  {
    icon: <BadgeDollarSign className="w-6 opacity-50 mr-2" />,
    title: "Finance",
    subItems: [
      // Add subItems for Finance
      { text: "Purchases", link: "/finance/purchases" },
      { text: "Add Purchase", link: "/finance/purchases/add" },
      { text: "Expenses", link: "/finance/expenses" },
      { text: "Inbound", link: "/finance/inbound" },
      { text: "Outbound", link: "/finance/outbound" },
      { text: "Prices", link: "/finance/prices" },
      { text: "Categories", link: "/finance/categories" },
    ],
  },
  {
    icon: <MessageCircleWarning className="w-6 opacity-50 mr-2" />,
    title: "Reports",
    subItems: [
      // Add subItems for Reports
      { text: "Daily Report", link: "/reports/daily-reports" },
      { text: "Generate Reports", link: "/finance/generate-reports" },
    ],
  },
  {
    icon: <MailCheck className="w-6 opacity-50 mr-2" />,
    title: "Messaging",
    subItems: [
      // Add subItems for Messaging
      { text: "All Messages", link: "/messaging/all-messages" },
      { text: "New Message", link: "/messaging/new-message" },
    ],
  },
  {
    icon: <Settings className="w-6 opacity-50 mr-2" />,
    title: "Settings",
    subItems: [
      // Add subItems for Settings
      { text: "User Log", link: "/settings/user-log" },
      { text: "Users", link: "/settings/users" },
    ],
  },
];

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
              {sidebarItems.map((item, index) => (
                <React.Fragment key={index}>
                  {toggleCollapse ? (
                    // Render dropdown menu for collapsed view
                    <Dropdown>
                      {/* Dropdown trigger */}
                      <DropdownTrigger className="cursor-pointer">
                        {item.icon}
                      </DropdownTrigger>
                      {/* Dropdown menu content */}
                      <DropdownMenu aria-label="Static Actions">
                        {item.subItems.map((subItem, subIndex) => (
                          <DropdownItem key={subIndex} className="flex">
                            <Link href={subItem.link}>
                              <div className="flex">
                                <ArrowRight className="mr-2" /> {subItem.text}
                              </div>
                            </Link>
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    // Render accordion item for expanded view
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-[14px]">
                        <div className="flex">
                          {item.icon}
                          {!toggleCollapse && <>{item.title}</>}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-[12px] flex flex-col gap-2">
                        {item.subItems.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.link}
                            className={
                              pathname == subItem.link
                                ? "opacity-100 text-cyan-400 flex w-full items-center "
                                : "opacity-50 flex items-center w-full  hover:opacity-100"
                            }
                          >
                            <ArrowRight className="w-4 mr-2" />
                            {subItem.text}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </React.Fragment>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
