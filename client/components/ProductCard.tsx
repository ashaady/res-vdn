import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, quantity?: number) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col">
        {/* Name */}
        <h3 className="text-lg font-playfair font-bold text-[#6B3E26] mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm font-lato text-[#666666] mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Button Container */}
        <div className="mt-auto">
          {/* Price */}
          <div className="mb-4">
            {product.sizes ? (
              <div className="space-y-2">
                {product.sizes.map((size, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-[#666666] font-lato">
                      {size.label}
                    </span>
                    <span className="text-[#F58220] font-bold">
                      {size.price.toLocaleString()} F
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-2xl font-bold text-[#F58220] font-lato">
                {product.price.toLocaleString()} F
              </p>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={() => onAddToCart?.(product)}
            className="w-full bg-[#F58220] hover:bg-[#E06E10] text-white uppercase font-lato font-semibold text-sm tracking-wide h-10 flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            Ajouter
          </Button>
        </div>
      </div>
    </div>
  );
}
