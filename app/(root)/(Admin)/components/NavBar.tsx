"use client";
import { logout } from "@/app/services/auth";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { BellRingIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const NavBar = () => {
  // Rename the function to NavBar
  const router = useRouter(); // Use the useRouter hook

  const onLogout = () => {
    // Cookies.remove("token");
    logout();
    router.push("/login");
  };
  // let userData = null;

  const userDataString = localStorage.getItem("userData");

  const userData = userDataString ? JSON.parse(userDataString) : null;

  return (
    <>
      <div className="flex justify-end p-4 gap-8 items-center">
        <div>
          <BellRingIcon />
        </div>
        <div className="flex items-center gap-4">
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                className="transition-transform"
                description={userData?.Username}
                name={userData?.Fullname}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">{userData?.Scope}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={onLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default NavBar;
