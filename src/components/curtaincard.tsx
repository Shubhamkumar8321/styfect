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
    <div
      className="
        group relative bg-[#dadada] rounded-2xl overflow-hidden 
        shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100
        w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[340px] mx-auto
      "
    >
      <Link href={`/products/${product.id}`}>
        {/* White BG Section with Curve */}
        <div
          className="
            relative w-full 
            h-48 sm:h-56 md:h-64 lg:h-72 
            bg-white rounded-br-[50%] flex items-center justify-center
          "
        >
          {/* Circle Image */}
          <div
            className="
              w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48
              rounded-full overflow-hidden shadow-md
            "
          >
            <Image
              src={product.images?.[0]?.src || "/placeholder.jpg"}
              alt={product.name}
              width={176}
              height={176}
              className="object-cover w-full h-full rounded-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          {/* Product Name */}
          <h2 className="text-sm sm:text-base md:text-lg font-normal text-white line-clamp-2">
            {product.name}
          </h2>

          {/* Price */}
          <p className="text-base sm:text-lg md:text-xl font-normal text-white mt-1">
            ₹{product.price}
          </p>

          {/* Buy Button */}
          <button
            className="
              mt-3 px-4 sm:px-5 py-2 
              bg-white text-[#0c655c] font-semibold rounded-lg shadow-md 
              hover:bg-white/90 transition-all duration-300 
              text-sm sm:text-base
            "
          >
            Buy Now
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
