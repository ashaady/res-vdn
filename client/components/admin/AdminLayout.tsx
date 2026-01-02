import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopBar from "./AdminTopBar";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

export default function AdminLayout({
  children,
  title,
  searchPlaceholder,
  onSearch,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-80">
        {/* TopBar */}
        <AdminTopBar
          title={title}
          searchPlaceholder={searchPlaceholder}
          onSearch={onSearch}
        />

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
