import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: string;
  images: { src: string }[];
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="group relative bg-[#0c655c] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 w-full sm:w-64 md:w-72">
      <Link href={`/products/${product.id}`}>
        {/* Product Image */}
        <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-2xl">
          <Image
            src={product.images?.[0]?.src || "/placeholder.jpg"}
            alt={product.name}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-br-[60%]"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          {/* Product Name */}
          <h2 className="text-sm sm:text-base md:text-lg font-normal text-white group-hover:text-white transition-colors duration-300 line-clamp-2">
            {product.name}
          </h2>

          {/* Price */}
          <p className="text-base sm:text-lg md:text-xl font-normal text-white mt-1">
            ₹{product.price}
          </p>

          {/* Buy Button */}
          <button className="mt-3 px-4 sm:px-5 py-2 bg-white text-[#0c655c] font-semibold rounded-lg shadow-md hover:bg-white/90 transition-all duration-300 text-sm sm:text-base">
            Buy Now
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
