"use client";
import { apiGetNotifications } from "@/app/services/api/Notifications";
import { logout } from "@/app/services/auth";
import socket from "@/app/services/Socket";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { BellRingIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const NavBar = () => {
  const router = useRouter();
  const [badgeCount, setBadgeCount] = useState(0);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Notifications"],
    queryFn: apiGetNotifications,
  });

  // useEffect(() => {
  //   const storedBadgeCount = localStorage.getItem("badgeCount");
  //   if (storedBadgeCount) {
  //     setBadgeCount(parseInt(storedBadgeCount));
  //   }

  //   socket.on("notifications", () => {
  //     setBadgeCount((prevCount) => prevCount + 1);
  //     localStorage.setItem("badgeCount", (badgeCount + 1).toString());
  //   });

  //   socket.on("clear_badge", () => {
  //     setBadgeCount(0);
  //     localStorage.removeItem("badgeCount");
  //   });

  //   return () => {
  //     socket.off("notification");
  //     socket.off("clear_badge");
  //   };
  // }, []);

  const onNotificationView = () => {
    socket.emit("notifications", "clear");
    setBadgeCount(0);
    refetch();
    // localStorage.removeItem("badgeCount");
  };

  const onLogout = () => {
    logout();
    router.push("/login");
  };

  const userDataString =
    typeof window !== "undefined" ? localStorage.getItem("userData") : null;
  const userData = userDataString ? JSON.parse(userDataString) : null;

  return (
    <>
      <div className="flex justify-end p-4 gap-8 items-center">
        <div>
          <Sheet>
            <SheetTrigger
              onClick={onNotificationView}
              className="hover:bg-slate-200 p-2 transition rounded-lg"
            >
              {badgeCount > 0 ? (
                <Badge content={badgeCount} color="primary">
                  <BellRingIcon />
                </Badge>
              ) : (
                <BellRingIcon />
              )}
            </SheetTrigger>
            <SheetContent className="min-w-[700px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    data.map((notification: any) => (
                      <Card
                        key={notification.ID}
                        className="my-3 p-8 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                      >
                        <p className="font-bold text-lg mb-1">
                          {notification.Title}
                        </p>
                        <p className="text-gray-600">{notification.Message}</p>
                        <p className="text-xs text-gray-400">
                          {notification.TimeStamp}
                        </p>
                      </Card>
                    ))
                  )}
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-center gap-4">
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                className="transition-transform"
                description={`@${userData?.Username}`}
                name={userData?.Username}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">{userData?.Scope}</p>
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
