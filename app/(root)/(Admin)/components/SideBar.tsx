"use client";
import classNames from "classnames";
import React, { useState } from "react";
import fullLogoIcon from "@/public/OreoLogoFullPNG.png";
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
  DollarSign,
  FileText,
  HomeIcon,
  MailCheck,
  MessageCircleWarning,
  SendToBack,
  Settings,
  ShoppingCart,
  TestTubes,
  Users,
} from "lucide-react";
import CollapsIcon from "@/public/icons/collapseIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";

type Role = "Admin" | "lab-tech" | "reception";

interface SubItem {
  text: string;
  link: string;
  roles: Role[];
}

interface SidebarItem {
  icon: JSX.Element;
  title: string;
  subItems: SubItem[];
  roles: Role[];
}

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

  {
    icon: <FileText className="w-6 opacity-50 mr-2" />,
    title: "Results",
    roles: ["Admin", "lab-tech", "reception"], // Only admin and reception can see this
    subItems: [
      {
        text: "Submit Result",
        link: "/result",
        roles: ["Admin", "lab-tech", "reception"],
      },
    ],
  },
  {
    icon: <TestTubes className="w-6 opacity-50 mr-2" />,
    title: "Samples & Tests",
    roles: ["Admin", "lab-tech"], // Only admin and lab-tech can see this
    subItems: [
      { text: "Samples", link: "/test-devices/samples", roles: ["Admin"] },
      { text: "Tests", link: "/test-devices/tests", roles: ["Admin"] },
      { text: "Sub Tests", link: "/test-devices/subTests", roles: ["Admin"] },
    ],
  },
  {
    icon: <Users className="w-6 opacity-50 mr-2" />,
    title: "Customers",
    roles: ["Admin", "lab-tech"], // Only admin and lab -tech can see this
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
    ],
  },
  {
    icon: <ArchiveIcon className="w-6 opacity-50 mr-2" />,
    title: "Stock",
    roles: ["Admin", "lab-tech"], // Only admin and lab-tech can see this
    subItems: [
      { text: "Items", link: "/stock/items", roles: ["Admin", "lab-tech"] },
      {
        text: "Inventory",
        link: "/stock/inventory",
        roles: ["Admin", "lab-tech"],
      },
    ],
  },
  {
    icon: <ShoppingCart className="w-6 opacity-50 mr-2" />,
    title: "Purchases",
    roles: ["Admin", "lab-tech", "reception"], // Only admin and reception can see this
    subItems: [
      {
        text: "Add Purchase",
        link: "/purchases/add",
        roles: ["Admin", "lab-tech"],
      },
      {
        text: "All Purchases",
        link: "/purchases/all",
        roles: ["Admin", "lab-tech"],
      },
      {
        text: "Categories",
        link: "/purchases/categories",
        roles: ["Admin", "lab-tech"],
      },
    ],
  },
  {
    icon: <BadgeDollarSign className="w-6 opacity-50 mr-2" />,
    title: "Finance",
    roles: ["Admin", "lab-tech", "reception"], // Only admin, lab-tech, and reception can see this
    subItems: [
      {
        text: "Expenses",
        link: "/finance/expenses",
        roles: ["Admin", "lab-tech"],
      },
    ],
  },
  {
    icon: <MessageCircleWarning className="w-6 opacity-50 mr-2" />,
    title: "Reports",
    roles: ["Admin", "lab-tech"], // Only admin and lab-tech can see this
    subItems: [
      {
        text: "Daily Report",
        link: "/reports/daily-reports",
        roles: ["Admin", "lab-tech"],
      },
      {
        text: "Generate Reports",
        link: "/finance/generate-reports",
        roles: ["Admin", "lab-tech"],
      },
    ],
  },
  {
    icon: <MailCheck className="w-6 opacity-50 mr-2" />,
    title: "Messaging",
    roles: ["Admin", "lab-tech"], // Only admin and lab-tech can see this
    subItems: [
      {
        text: "All Messages",
        link: "/messaging/all-messages",
        roles: ["Admin", "lab-tech"],
      },
      {
        text: "New Message",
        link: "/messaging/new-message",
        roles: ["Admin", "lab-tech"],
      },
    ],
  },
  {
    icon: <Settings className="w-6 opacity-50 mr-2" />,
    title: "Settings",
    roles: ["Admin", "lab-tech", "reception"], // Only admin, lab-tech, and reception can see this
    subItems: [
      {
        text: "User Log",
        link: "/settings/user-log",
        roles: ["Admin", "lab-tech"],
      },
      { text: "Users", link: "/settings/users", roles: ["Admin", "lab-tech"] },
    ],
  },
].map((item) => ({
  ...item,
  subItems: item.subItems.map((subItem) => ({
    ...subItem,
    roles: subItem.roles as Role[],
  })),
  roles: item.roles as Role[],
}));

const SideBar = () => {
  const { user } = useAuth(); // Get the current user's role

  const pathname = usePathname();

  const [toggleCollapse, setToggleCollapse] = useState(() => {
    // Retrieve the collapse state from local storage
    const savedState = localStorage.getItem("sidebarCollapse");
    return savedState ? JSON.parse(savedState) : true;
  });
  const [isCollapsible, setIsCollapsible] = useState(true);

  const wrapperClasses = classNames("   p-2 ml-2 ", {
    ["w-[200px]"]: !toggleCollapse,
    ["w-[70px] py-8 "]: toggleCollapse,
  });

  const collapseIconClasses = classNames(
    "p-1 rounded bg-light-lighter absolute right-5 size-4",
    {
      "rotate-180 ": toggleCollapse,
    }
  );

  const collapseMenuIcon = classNames("w-full", {
    "flex flex-col gap-6 items-center": toggleCollapse,
  });

  const handleSidebarToggle = () => {
    const newToggleState = !toggleCollapse;
    setToggleCollapse(newToggleState);
    localStorage.setItem("sidebarCollapse", JSON.stringify(newToggleState));
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
        <div className={`flex flex-col gap-2 `}>
          <div
            className={`flex  items-center ${
              toggleCollapse
                ? "h-6 flex justify-center items-center"
                : "justify-between"
            }  relative`}
          >
            {!toggleCollapse ? (
              <div className="flex items-center  gap-2 ">
                <Image
                  src={fullLogoIcon}
                  alt=""
                  className={`transition duration-800 ease-linear max-w-[70%] `}
                />
              </div>
            ) : null}
            <button
              className={`${collapseIconClasses}  hover:opacity-60 transition duration-300 ease-soft-spring`}
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
