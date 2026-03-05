import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-background-warm min-h-screen mandala-bg">
      <AdminSidebar />
      <main className="flex-1 lg:ml-72 p-6 md:p-12 relative z-10 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
