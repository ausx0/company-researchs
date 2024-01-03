import SideBar from "./components/SideBar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen flex flex-row justify-start">
      {/* Include shared UI here e.g. a header or sidebar */}
      <SideBar />
      <div className="bg-primary flex-1">{children}</div>
    </section>
  );
}
