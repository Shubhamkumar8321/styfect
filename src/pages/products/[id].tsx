"use client";
import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { getProductById, getProducts } from "@/lib/woocommerce";
import Link from "next/link";
import Image from "next/image";

export default function ProductDetail({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: any[];
}) {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const images = product.images?.length
    ? product.images
    : [{ src: "/placeholder.png" }];

  // Auto-loop images
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!product)
    return (
      <p className="text-center mt-20 text-lg text-gray-600">
        ⚠️ Product not found
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left Section */}
        <div className="w-full lg:sticky lg:top-24 self-start space-y-4">
          {/* Desktop Main Image */}
          <div className="hidden lg:block relative w-full h-[480px] overflow-hidden rounded-2xl bg-[#0c655c]">
            <Image
              src={images[selectedImage]?.src || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover w-full h-full transition-transform duration-500 rounded-br-[60%]"
            />
          </div>

          {/* Desktop Thumbnails */}
          <div className="hidden lg:flex gap-3 justify-start mt-2">
            {images.slice(0, 5).map((image: { src: string }, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-16 h-16 rounded-full overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-yellow-500"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={image.src}
                  alt={`Thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Section (Desktop Only) */}
        <div className="hidden lg:flex flex-col space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {product.name}
          </h1>
          <p className="text-yellow-500 font-medium text-sm sm:text-base">
            ★★★★☆ 4.8 (3,166 Reviews)
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-[#0c655c]">
            ₹{product.price}
          </p>

          <div className="flex gap-4 mt-6">
            <a
              href="/enquiry"
              className="flex-1 text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
            >
              Enquiry Now
            </a>
            <a
              href={`https://wa.me/919999999999?text=Hi, I'm interested in ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Accordions */}
          <div className="space-y-4 mt-8">
            <Accordion title="Measurements">
              <p className="text-sm sm:text-base text-gray-700">
                Measurement instructions...
              </p>
            </Accordion>
            <Accordion title="Product Information">
              <div
                className="text-sm sm:text-base leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: product.short_description || product.description,
                }}
              />
            </Accordion>
            <Accordion title="Measure & Install">
              <p className="text-sm sm:text-base">Guide coming soon.</p>
            </Accordion>
            <Accordion title="Shipping & Production">
              <p className="text-sm sm:text-base">Ships in 2-3 days.</p>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4">
        <div className=" rounded-2xl shadow-md p-4 space-y-3 bg-[#0c655c]">
          {/* Mobile Main Image */}
          <div className="relative w-full h-64 sm:h-72 md:h-80  overflow-hidden bg-[#0c655c] flex items-center justify-center">
            {/* White background with rounded bottom-right */}
            <div className="relative w-full h-full bg-white rounded-br-[60%] flex items-center justify-center">
              {/* Circle image */}
              <div className="w-52 h-52 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-full overflow-hidden relative">
                <Image
                  src={images[selectedImage]?.src || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <h2 className="text-lg font-semibold text-white">{product.name}</h2>
          <p className="text-base font-bold text-white">₹{product.price}</p>
          <p className="text-yellow-500 font-medium text-sm ">
            ★★★★☆ 4.8 (3,166 Reviews)
          </p>

          {/* Buttons row */}
          <div className="flex gap-3 mt-3">
            <a
              href="/enquiry"
              className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
            >
              Enquiry
            </a>
            <a
              href={`https://wa.me/919999999999?text=Hi, I'm interested in ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
            >
              WhatsApp
            </a>
          </div>

          {/* Accordions (same for mobile & desktop) */}
          <div className="space-y-3 mt-4">
            <Accordion title="Measurements">
              <p className="text-sm text-gray-700">
                Measurement instructions...
              </p>
            </Accordion>
            <Accordion title="Product Information">
              <div
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: product.short_description || product.description,
                }}
              />
            </Accordion>
            <Accordion title="Measure & Install">
              <p className="text-sm">Guide coming soon.</p>
            </Accordion>
            <Accordion title="Shipping & Production">
              <p className="text-sm">Ships in 2-3 days.</p>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts?.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            You may also like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {relatedProducts.slice(0, 4).map((p) => (
              <Link key={p.id} href={`/products/${p.id}`}>
                <div className="group relative bg-[#0c655c] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-full sm:w-64 md:w-72">
                  {/* White Background with Rounded Bottom Right */}
                  <div className="relative w-full bg-white rounded-br-[60%] flex items-center justify-center overflow-hidden h-48 sm:h-56 md:h-64">
                    {/* Circle Image */}
                    <div className="w-44 h-44 sm:w-48 sm:h-48 md:w-60 md:h-60 rounded-full overflow-hidden relative">
                      <Image
                        src={p.images?.[0]?.src || "/placeholder.jpg"}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <h3 className="text-sm sm:text-base md:text-lg font-normal text-white line-clamp-2">
                      {p.name}
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl font-normal text-white mt-1">
                      ₹{p.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Accordion({ title, children }: { title: string; children: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white">
      <button
        className="w-full flex justify-between items-center px-4 py-4 font-bold text-lg text-gray-900 hover:bg-gray-50 transition"
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        <span className="text-2xl">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 text-gray-700">{children}</div>}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const productId = parseInt(id, 10);

  const product = await getProductById(productId);
  let relatedProducts = [];
  if (product?.related_ids?.length) {
    relatedProducts = await getProducts({ per_page: 4 });
  }

  return { props: { product, relatedProducts } };
};
