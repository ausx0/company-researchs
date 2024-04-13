"use client";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import { Can } from "@/app/Rules/Can";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="h-screen flex flex-row justify-start overflow-hidden">
        {/* Include shared UI here e.g. a header or sidebar */}
        <Can I="read" a="Admin">
          <section className="overflow-auto px-4  scrollbar-thumb-gray-200 scrollbar-none hover:scrollbar-thumb-gray-300 bg-slate-100 ">
            <SideBar />
          </section>
        </Can>

        <div className="flex flex-col  flex-1">
          <div className="flex   justify-end">
            <NavBar />
          </div>

          <Can I="read" a="Admin">
            <div className=" flex-1 p-4 m-2 overflow-auto scrollbar-none rounded-lg px-8 ">
              {children}
            </div>
          </Can>
          <Can I="read" a="reception">
            <h1>hi this is reception </h1>
          </Can>
        </div>
      </section>

      <Can I="read" a="reception">
        <h1>hi this is reception </h1>
      </Can>
    </>
  );
}
