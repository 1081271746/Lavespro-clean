import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="lg:ml-64">
        <AdminHeader />

        <main>
          {children}
        </main>
      </div>
    </div>
  );
}