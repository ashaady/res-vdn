export default function Footer() {
  return (
    <footer className="bg-[#6B3E26] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-2 text-[#D4AF37]">
              LE GOURMET
            </h3>
            <p className="text-sm font-lato text-gray-200">Cuisine Raffinée</p>
            <p className="text-xs font-lato text-gray-400 mt-2">
              Depuis 1990, nous offrons une expérience gastronomique inoubliable
              avec des plats raffinés et un service impeccable.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="font-playfair font-bold text-[#D4AF37] mb-4">
              Nous Contacter
            </h4>
            <div className="space-y-2 text-sm font-lato text-gray-200">
              <p>📍 Dakar, Plateau - Rue de la Gastronomie</p>
              <p>📞 33 867 61 00 | 78 304 53 53</p>
              <p>📧 contact@legourmet.sn</p>
            </div>
          </div>

          {/* Hours Section */}
          <div>
            <h4 className="font-playfair font-bold text-[#D4AF37] mb-4">
              Horaires d'Ouverture
            </h4>
            <div className="space-y-2 text-sm font-lato text-gray-200">
              <p>Lun - Dim : 12h00 - 23h00</p>
              <p className="text-xs text-gray-400 mt-4">
                Nous sommes fermés certains jours fériés.
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-[#9C6B4A] pt-8 text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="#"
              className="text-sm font-lato hover:text-[#F58220] transition-colors"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-sm font-lato hover:text-[#F58220] transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-sm font-lato hover:text-[#F58220] transition-colors"
            >
              WhatsApp
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs font-lato text-gray-400">
            © 2026 Le Gourmet - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
