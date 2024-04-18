"use client";
import classNames from "classnames";
import React, { useState } from "react";
import fullLogoIcon from "@/public/OreoLogoFull.svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  ArchiveIcon,
  BadgeDollarSign,
  HomeIcon,
  MailCheck,
  MessageCircleWarning,
  SendToBack,
  Settings,
  TestTubes,
  Users,
} from "lucide-react";
import CollapsIcon from "@/public/icons/collapseIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";

type Role = "Admin" | "lab-tech" | "reception";
type SubItem = {
  text: string;
  link: string;
  roles: Role[];
};

type SidebarItem = {
  icon: JSX.Element;
  title: string;
  subItems: SubItem[];
  roles: Role[];
};

const sidebarItems: SidebarItem[] = [
  {
    icon: <HomeIcon className="w-6 opacity-50 mr-2" />,
    title: "Home",
    subItems: [
      {
        text: "Dashboard",
        link: "/home",
        roles: ["Admin", "reception", "lab-tech"],
      },
    ],
    roles: ["Admin", "lab-tech", "reception"], // Only admin and reception can see this
  },

  {
    icon: <SendToBack className="w-6 opacity-50 mr-2" />,
    title: "Orders",
    roles: ["Admin", "lab-tech", "reception"], // Only admin and reception can see this
    subItems: [
      {
        text: "Add Order",
        link: "/orders/add",
        roles: ["Admin", "lab-tech", "reception"],
      },
      { text: "All Orders", link: "/orders", roles: ["Admin", "lab-tech"] },
      { text: "Check Order", link: "/check-order", roles: ["reception"] },
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
    roles: ["Admin", "lab-tech"], // Only admin and reception can see this

    subItems: [
      { text: "Tests", link: "/test-devices/tests", roles: ["Admin"] },
      { text: "Samples", link: "/test-devices/samples", roles: ["Admin"] },
      { text: "Sub Tests", link: "/test-devices/subTests", roles: ["Admin"] },

      // { text: "Devices", link: "/test-devices/devices" },

      // Add more subItems as needed
    ],
  },
  {
    icon: <Users className="w-6 opacity-50 mr-2" />,
    title: "Customers",
    roles: ["Admin", "lab-tech"], // Only admin and reception can see this

    subItems: [
      {
        text: "Patients",
        link: "/customers/patients",
        roles: ["Admin", "lab-tech"],
      },
      {
        text: "Clients",
        link: "/customers/clients",
        roles: ["Admin", "lab-tech"],
      },
      // { text: "Suppliers", link: "/clients/suppliers" },
    ],
  },
  {
    icon: <ArchiveIcon className="w-6 opacity-50 mr-2" />,
    title: "Inventory",
    roles: ["Admin", "lab-tech"], // Only admin and reception can see this
    subItems: [
      // Add subItems for Inventory
      { text: "Items", link: "/inventory/items" },
    ],
  },
  {
    icon: <BadgeDollarSign className="w-6 opacity-50 mr-2" />,
    title: "Finance",
    roles: ["Admin", "lab-tech", "reception"], // Only admin and reception can see this

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
    roles: ["Admin", "lab-tech"], // Only admin and reception can see this

    subItems: [
      // Add subItems for Reports
      { text: "Daily Report", link: "/reports/daily-reports" },
      { text: "Generate Reports", link: "/finance/generate-reports" },
    ],
  },
  {
    icon: <MailCheck className="w-6 opacity-50 mr-2" />,
    title: "Messaging",
    roles: ["Admin", "lab-tech"], // Only admin and reception can see this

    subItems: [
      // Add subItems for Messaging
      { text: "All Messages", link: "/messaging/all-messages" },
      { text: "New Message", link: "/messaging/new-message" },
    ],
  },
  {
    icon: <Settings className="w-6 opacity-50 mr-2" />,
    title: "Settings",
    roles: ["Admin", "lab-tech", "reception"], // Only admin and reception can see this

    subItems: [
      // Add subItems for Settings
      { text: "User Log", link: "/settings/user-log" },
      { text: "Users", link: "/settings/users" },
    ],
  },
].map((item) => ({ ...item, roles: (item.roles || []) as Role[] })); // Ensure roles is always defined and cast to Role[]

const SideBar = () => {
  const { user } = useAuth(); // Get the current user's role

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

  const filteredItems = sidebarItems
    .filter((item) => item.roles && item.roles.includes(user.role as Role))
    .map((item) => ({
      ...item,
      subItems: item.subItems.filter(
        (subItem) => subItem.roles && subItem.roles.includes(user.role as Role)
      ),
    }));
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
              {filteredItems.map((item, index) => (
                <React.Fragment key={index}>
                  {toggleCollapse ? (
                    // Render dropdown menu for collapsed view
                    <Dropdown>
                      {/* Dropdown trigger */}
                      <DropdownTrigger className="cursor-pointer">
                        <div
                          className={
                            item.subItems.some(
                              (subItem) => pathname === subItem.link
                            )
                              ? "text-cyan-400" // Highlight color
                              : ""
                          }
                        >
                          {item.icon}
                        </div>
                      </DropdownTrigger>
                      {/* Dropdown menu content */}
                      <DropdownMenu aria-label="Static Actions">
                        {item.subItems.map((subItem, subIndex) => (
                          <DropdownItem key={subIndex} className="flex">
                            <Link
                              href={subItem.link}
                              className={
                                pathname == subItem.link
                                  ? "opacity-100 text-cyan-400 flex w-full items-center "
                                  : "opacity-50 flex items-center w-full  hover:opacity-100"
                              }
                            >
                              <div className="flex">{subItem.text}</div>
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
                          <span
                            className={
                              item.subItems.some(
                                (subItem) => pathname === subItem.link
                              )
                                ? "text-cyan-400" // Highlight color
                                : ""
                            }
                          >
                            {item.icon}
                          </span>
                          {!toggleCollapse && (
                            <>
                              {" "}
                              <span
                                className={
                                  item.subItems.some(
                                    (subItem) => pathname === subItem.link
                                  )
                                    ? "text-cyan-400" // Highlight color
                                    : ""
                                }
                              >
                                {item.title}
                              </span>
                            </>
                          )}
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
