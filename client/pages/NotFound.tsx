import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-playfair font-bold text-[#6B3E26] mb-4">
          404
        </h1>
        <div className="h-1 w-16 bg-[#D4AF37] mx-auto mb-6"></div>
        <p className="text-2xl font-playfair text-[#6B3E26] mb-4">
          Page non trouvée
        </p>
        <p className="text-[#666666] font-lato mb-8">
          Oups! La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="space-y-3">
          <Link
            to="/"
            className="block px-6 py-3 bg-[#F58220] text-white font-lato font-bold uppercase text-sm tracking-wide hover:bg-[#E06E10] transition-colors rounded-sm"
          >
            Retour à l'Accueil
          </Link>
          <Link
            to="/menu"
            className="block px-6 py-3 border-2 border-[#F58220] text-[#F58220] font-lato font-bold uppercase text-sm tracking-wide hover:bg-[#F5F5F5] transition-colors rounded-sm"
          >
            Voir la Carte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
