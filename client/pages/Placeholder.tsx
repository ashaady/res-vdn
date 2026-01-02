import { Link } from "react-router-dom";

interface PlaceholderProps {
  title: string;
  description?: string;
  icon?: string;
}

export default function Placeholder({
  title,
  description = "Cette page est en cours de développement. Continuez à explorer le reste de l'application en attendant.",
  icon = "🍽️",
}: PlaceholderProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center bg-white rounded-lg shadow-lg p-12">
        <div className="text-6xl mb-6">{icon}</div>
        <h1 className="text-3xl font-playfair font-bold text-[#6B3E26] mb-4">
          {title}
        </h1>
        <p className="text-[#666666] font-lato mb-8">{description}</p>
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
}
