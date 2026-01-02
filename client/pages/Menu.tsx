import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "entrees";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const { addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const currentCategory = categories.find((c) => c.id === selectedCategory);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchParams({ category: categoryId });
  };

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    toast.success(`${product.name} ajouté au panier!`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative h-80 flex items-center justify-center text-center text-white overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504674900152-b8b9e832046f?w=1200&h=600&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#6B3E26] opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-playfair font-bold mb-2">NOTRE CARTE</h1>
          <div className="h-1 w-24 bg-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-lg font-lato text-gray-100">
            Découvrez nos 17 catégories de plats raffinés
          </p>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="sticky top-20 z-40 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          {/* Desktop Category Buttons */}
          <div className="hidden md:flex flex-wrap justify-center gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 font-lato font-semibold text-sm whitespace-nowrap rounded transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-[#F58220] text-white border-b-4 border-[#D4AF37]"
                    : "bg-[#F5F5F5] text-[#6B3E26] hover:bg-[#9C6B4A] hover:text-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Mobile Category Select */}
          <div className="md:hidden">
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full bg-[#F5F5F5] border-[#D4AF37] text-[#6B3E26]">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          {/* Category Header */}
          <div className="text-center mb-12">
            <div className="inline-block">
              <span className="text-[#9C6B4A] font-playfair text-2xl font-bold">
                {categories.findIndex((c) => c.id === selectedCategory) + 1}.
              </span>
              <h2 className="text-4xl font-playfair font-bold text-[#6B3E26]">
                {currentCategory?.label}
              </h2>
            </div>
            <div className="h-1 w-32 bg-[#D4AF37] mx-auto mt-4"></div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#999999] font-lato text-lg">
                Aucun produit dans cette catégorie
              </p>
            </div>
          )}

          {/* Info Banner */}
          <div className="bg-[#F5F5F5] border-l-4 border-[#F58220] p-6 rounded text-center">
            <p className="text-[#6B3E26] font-lato text-sm">
              <strong>Besoin d'aide ?</strong> Appelez-nous au{" "}
              <strong>33 867 61 00</strong> ou <strong>78 304 53 53</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
