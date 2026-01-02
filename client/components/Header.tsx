import { useState } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/menu", label: "Notre Carte" },
    { href: "/cart", label: "Mon Panier" },
    { href: "/orders", label: "Mes Commandes" },
    { href: "/account", label: "Espace Client" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#6B3E26] shadow-lg">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F562ab4a0fd0a4cbdb2356bc1d15ae09f%2Fc57dc195ba544a7f8fb75b5b0c07efa7?format=webp&width=800"
            alt="La VDN Logo"
            className="h-12 w-auto"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-playfair font-bold text-white">VDN</h1>
            <p className="text-xs text-[#D4AF37] -mt-1 font-lato">
              Cuisine Raffinée
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-white font-lato text-sm font-medium hover:text-[#D4AF37] transition-colors hover:border-b-2 hover:border-[#D4AF37] pb-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/account"
            className="text-white hover:text-[#D4AF37] transition-colors"
          >
            👤
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <button className="text-white p-2 hover:bg-[#9C6B4A] rounded transition-colors">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-64 bg-white border-l-4 border-[#D4AF37]"
          >
            <nav className="flex flex-col gap-6 mt-8">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="text-[#6B3E26] font-playfair text-2xl font-bold hover:text-[#F58220] transition-colors"
              >
                VDN
              </Link>
              <div className="border-t border-gray-200 pt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-[#6B3E26] font-lato font-medium hover:text-[#F58220] hover:pl-2 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <button className="text-2xl text-center py-3 hover:text-[#F58220] transition-colors">
                👤
              </button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
