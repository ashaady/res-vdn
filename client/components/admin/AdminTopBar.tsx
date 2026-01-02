import { useState } from "react";
import { Search, Bell, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";

interface AdminTopBarProps {
  title: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

export default function AdminTopBar({
  title,
  searchPlaceholder = "Rechercher...",
  onSearch,
}: AdminTopBarProps) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        {/* Left - Title */}
        <div className="flex-1 hidden md:block">
          <h1 className="text-2xl font-playfair font-bold text-[#6B3E26]">
            {title}
          </h1>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]"
            />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 border-[#D4AF37] font-lato"
            />
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors relative"
            >
              <Bell size={20} className="text-[#6B3E26]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-playfair font-bold text-[#6B3E26]">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-4 border-b border-gray-100 hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                    >
                      <p className="font-lato font-semibold text-sm text-[#6B3E26]">
                        Nouvelle commande #{10001 + i}
                      </p>
                      <p className="text-xs text-[#999999] mt-1">
                        Client: Jean Dupont - 8500 F
                      </p>
                      <p className="text-xs text-[#999999]">il y a 2 minutes</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-gray-200">
                  <button className="text-sm text-[#F58220] font-lato font-semibold hover:underline">
                    Voir toutes les notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="hidden md:text-right">
              <p className="text-sm font-playfair font-bold text-[#6B3E26]">
                {user?.full_name}
              </p>
              <p className="text-xs text-[#999999] font-lato">
                {user?.role === "admin" ? "Administrateur" : "Manager"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#F58220] flex items-center justify-center text-white font-bold">
              {user?.full_name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search - Only visible on mobile */}
      <div className="md:hidden px-6 pb-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999]"
          />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 border-[#D4AF37] font-lato"
          />
        </div>
      </div>
    </div>
  );
}
