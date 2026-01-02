import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, categories } from "@/data/products";
import { Star, Clock, ChefHat, Truck } from "lucide-react";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  const handleAddToCart = (product: any) => {
    console.log("Added to cart:", product);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=800&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#6B3E26] opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-7xl font-playfair font-bold mb-2 text-white">
            LE GOURMET
          </h1>

          {/* Decorative Line */}
          <div className="h-1 w-20 bg-[#D4AF37] mx-auto mb-6"></div>

          <p className="text-2xl font-lato text-white mb-4 font-light">
            Cuisine Raffinée & Authentique
          </p>

          <p className="text-lg font-lato text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Découvrez notre carte variée alliant tradition et modernité dans une
            ambiance chaleureuse
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              to="/menu"
              className="px-8 py-4 bg-[#D4AF37] text-[#6B3E26] font-playfair font-bold text-lg uppercase tracking-wide hover:bg-white transition-colors rounded-sm"
            >
              📖 Découvrir la Carte
            </Link>
            <button className="px-8 py-4 border-2 border-white text-white font-lato font-bold uppercase text-lg tracking-wide hover:bg-white hover:text-[#6B3E26] transition-colors rounded-sm">
              🚚 Commander Maintenant
            </button>
          </div>

          {/* Opening Hours */}
          <p className="text-sm font-lato text-gray-200">
            ⭐ Ouvert du Lundi au Dimanche | 12h - 23h
          </p>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-[#6B3E26] mb-2">
              NOS SPÉCIALITÉS DE LA MAISON
            </h2>
            <div className="h-1 w-32 bg-[#D4AF37] mx-auto mb-4"></div>
            <p className="text-[#666666] font-lato text-lg">
              Les plats qui ont fait notre renommée depuis 1990
            </p>
          </div>

          {/* Featured Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-block px-8 py-3 bg-[#F58220] text-white font-lato font-bold uppercase text-sm tracking-wide hover:bg-[#E06E10] transition-colors rounded-sm"
            >
              Voir toute notre carte
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-[#6B3E26] mb-2">
              NOTRE CARTE
            </h2>
            <div className="h-1 w-24 bg-[#D4AF37] mx-auto"></div>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((category) => {
              const categoryImages: Record<string, string> = {
                entrees:
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
                plats_jour:
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
                plats_garnis:
                  "https://images.unsplash.com/photo-1467521889514-2e564e6b95ea?w=400&h=300&fit=crop",
                grillades:
                  "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=300&fit=crop",
                pizzas:
                  "https://images.unsplash.com/photo-1571407-4dbc9149333d?w=400&h=300&fit=crop",
                crepes:
                  "https://images.unsplash.com/photo-1567327613485-f436f6d1d0e2?w=400&h=300&fit=crop",
              };

              return (
                <Link key={category.id} to={`/menu?category=${category.id}`}>
                  <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
                    <img
                      src={
                        categoryImages[category.id] || categoryImages.entrees
                      }
                      alt={category.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[#6B3E26] bg-opacity-40 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                      <h3 className="text-2xl font-playfair font-bold text-white text-center">
                        {category.label}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-[#6B3E26] mb-2">
              POURQUOI CHOISIR LE GOURMET ?
            </h2>
            <div className="h-1 w-48 bg-[#D4AF37] mx-auto"></div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Ingredient Freshness */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="text-6xl">🍽️</div>
              </div>
              <h3 className="text-xl font-playfair font-bold text-[#6B3E26] mb-3">
                Ingrédients Frais
              </h3>
              <p className="text-[#666666] font-lato text-sm">
                Produits de qualité sélectionnés avec soin pour votre bien-être
              </p>
            </div>

            {/* Experienced Chefs */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="text-6xl">👨‍🍳</div>
              </div>
              <h3 className="text-xl font-playfair font-bold text-[#6B3E26] mb-3">
                Chefs Expérimentés
              </h3>
              <p className="text-[#666666] font-lato text-sm">
                Plus de 20 ans d'expérience au service de la gastronomie
              </p>
            </div>

            {/* Fast Delivery */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="text-6xl">🚚</div>
              </div>
              <h3 className="text-xl font-playfair font-bold text-[#6B3E26] mb-3">
                Livraison Rapide
              </h3>
              <p className="text-[#666666] font-lato text-sm">
                Partout à Dakar dans les meilleurs délais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-playfair font-bold text-[#6B3E26] mb-2">
              CE QUE DISENT NOS CLIENTS
            </h2>
            <div className="h-1 w-40 bg-[#D4AF37] mx-auto"></div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Amadou D.",
                text: "Excellente expérience ! Les plats sont délicieux et le service impeccable.",
                rating: 5,
              },
              {
                name: "Fatou S.",
                text: "Un vrai restaurant gastronomique à Dakar. Je recommande vivement !",
                rating: 5,
              },
              {
                name: "Moussa B.",
                text: "Qualité constante et ambiance chaleureuse. Parfait pour les occasions spéciales.",
                rating: 5,
              },
              {
                name: "Aïssatou T.",
                text: "Les pizzas sont meilleures que dans certaines grandes capitales européennes !",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#F58220]"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="fill-[#F58220] text-[#F58220]"
                    />
                  ))}
                </div>
                <p className="text-[#666666] font-lato mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="text-[#6B3E26] font-playfair font-bold">
                  - {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-[#6B3E26] text-white text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-playfair font-bold mb-4">
            Prêt à savourer ?
          </h2>
          <p className="text-gray-200 font-lato mb-8 text-lg">
            Explorez notre menu complet et faites votre sélection
          </p>
          <Link
            to="/menu"
            className="inline-block px-8 py-4 bg-[#F58220] text-white font-lato font-bold uppercase text-lg tracking-wide hover:bg-[#E06E10] transition-colors rounded-sm"
          >
            Consulter la Carte Complète
          </Link>
        </div>
      </section>
    </div>
  );
}
