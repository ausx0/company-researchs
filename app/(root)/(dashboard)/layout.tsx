import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen flex flex-row justify-start overflow-hidden">
      {/* Include shared UI here e.g. a header or sidebar */}
      <section className="overflow-auto  scrollbar-thumb-gray-200 scrollbar-none hover:scrollbar-thumb-gray-300 ">
        <SideBar />
      </section>
      <div className="flex flex-col  flex-1">
        <NavBar />

        <div className=" flex-1 p-4 overflow-auto scrollbar-none">
          {children}
        </div>
      </div>
    </section>
  );
}
