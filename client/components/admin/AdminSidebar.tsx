import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  submenu?: NavItem[];
  requiredRole?: string[];
}

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({
  isOpen = true,
  onClose,
}: AdminSidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [expandedMenu, setExpandedMenu] = useState<string | null>("orders");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(isOpen);

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: <BarChart3 size={20} />,
    },
    {
      label: "Commandes",
      href: "/admin/orders",
      icon: <ShoppingCart size={20} />,
      badge: 3,
      submenu: [
        { label: "Toutes", href: "/admin/orders" },
        { label: "En attente", href: "/admin/orders?status=pending" },
        { label: "En préparation", href: "/admin/orders?status=preparing" },
        { label: "En livraison", href: "/admin/orders?status=delivery" },
      ],
    },
    {
      label: "Produits",
      href: "/admin/products",
      icon: <Package size={20} />,
    },
    ...(user?.role === "manager"
      ? [
          {
            label: "Statistiques",
            href: "/manager/dashboard-overview",
            icon: <BarChart3 size={20} />,
            submenu: [
              {
                label: "Vue d'ensemble",
                href: "/manager/dashboard-overview",
              },
              {
                label: "Produits",
                href: "/manager/dashboard-products",
              },
              {
                label: "Analytics",
                href: "/manager/dashboard-analytics",
              },
            ],
          },
        ]
      : []),
    {
      label: "Paramètres",
      href: "/admin/settings",
      icon: <Settings size={20} />,
      requiredRole: ["manager"],
    },
  ];

  const isActive = (href: string) => location.pathname === href;

  const renderNavItems = () => (
    <nav className="space-y-1 px-3 py-4">
      {navItems.map((item) => {
        if (
          item.requiredRole &&
          !item.requiredRole.includes(user?.role || "")
        ) {
          return null;
        }

        const active = isActive(item.href);
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        const isExpanded = expandedMenu === item.label;

        return (
          <div key={item.label}>
            {hasSubmenu ? (
              <button
                onClick={() => setExpandedMenu(isExpanded ? null : item.label)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg font-lato font-semibold transition-colors text-white ${
                  isExpanded
                    ? "bg-[#F58220] text-white"
                    : "hover:bg-[#9C6B4A] text-white/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            ) : (
              <Link
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-lato font-semibold transition-colors ${
                  active
                    ? "bg-[#F58220] text-white"
                    : "text-white/80 hover:bg-[#9C6B4A] hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {item.badge}
                  </span>
                )}
              </Link>
            )}

            {hasSubmenu && isExpanded && (
              <div className="pl-4 space-y-1 mt-1">
                {item.submenu.map((subitem) => (
                  <Link
                    key={subitem.label}
                    to={subitem.href}
                    className={`block px-4 py-2 rounded-lg text-sm font-lato transition-colors ${
                      isActive(subitem.href)
                        ? "bg-[#F58220] text-white"
                        : "text-white/70 hover:text-white hover:bg-[#9C6B4A]/50"
                    }`}
                  >
                    {subitem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed top-20 left-4 z-50 p-2 bg-[#6B3E26] text-white rounded-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-80 bg-[#6B3E26] shadow-lg transform transition-transform duration-300 z-40 md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:sticky md:top-0`}
      >
        {/* Header */}
        <div className="border-b border-[#9C6B4A] px-6 py-6">
          <div className="flex items-center justify-center mb-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F562ab4a0fd0a4cbdb2356bc1d15ae09f%2Fc57dc195ba544a7f8fb75b5b0c07efa7?format=webp&width=800"
              alt="VDN"
              className="h-10 w-auto"
            />
          </div>
          <h2 className="text-xl font-playfair font-bold text-white text-center">
            VDN Admin
          </h2>
          <div className="flex justify-center mt-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-lato font-bold text-white ${
                user?.role === "admin" ? "bg-blue-600" : "bg-[#F58220]"
              }`}
            >
              {user?.role === "admin" ? "👨‍💼 Admin" : "📊 Manager"}
            </span>
          </div>
        </div>

        {/* Navigation */}
        {renderNavItems()}

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[#9C6B4A] px-6 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#F58220] flex items-center justify-center text-white font-bold">
              {user?.full_name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-playfair font-bold text-white truncate">
                {user?.full_name}
              </p>
              <p className="text-xs text-white/60 font-lato truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              location.href = "/login";
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg font-lato font-semibold transition-colors"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30 top-20"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
