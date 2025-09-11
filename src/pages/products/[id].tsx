"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { getProductById, getProducts } from "@/lib/woocommerce";

export default function ProductDetail({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: any[];
}) {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const images = product?.images || [];

  // ✅ Safe image getter
  const getSafeImage = (img: any, fallback = "/placeholder.png") =>
    img?.src && img.src.trim() !== "" ? img.src : fallback;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-8 lg:px-16">
      {/* ===== Mobile Layout ===== */}
      <div className="lg:hidden -mt-6">
        <div className="shadow-md space-y-3 bg-[#dadada]">
          {/* Mobile Main Image */}
          <div className="relative w-full h-64 sm:h-72 md:h-80 overflow-hidden bg-[#dadada] flex items-center justify-center">
            <div className="relative w-full h-full bg-white rounded-br-[60%] flex items-center justify-center">
              <div className="w-52 h-52 sm:w-56 md:w-60 rounded-full overflow-hidden relative">
                <Image
                  src={getSafeImage(images[selectedImage])}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <h2 className="text-lg font-semibold text-black px-4">
            {product.name}
          </h2>
          <p className="text-base font-bold text-black px-4">
            ₹{product.price}
          </p>
          <p className="text-yellow-500 font-medium text-sm px-4">
            ★★★★☆ 4.8 (3,166 Reviews)
          </p>

          {/* Accordions (all 4) */}
          <div className="space-y-3 mt-4 px-4 pb-20">
            <Accordion title="Product Features">
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>High-quality materials</li>
                <li>Durable and long-lasting</li>
                <li>Stylish design</li>
              </ul>
            </Accordion>
            <Accordion title="Specifications">
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Weight: 1.2kg</li>
                <li>Dimensions: 30x20x15 cm</li>
                <li>Color: Green</li>
              </ul>
            </Accordion>
            <Accordion title="Shipping & Returns">
              <p className="mt-2">
                Free shipping on all orders. Returns accepted within 30 days.
              </p>
            </Accordion>
            <Accordion title="Warranty">
              <p className="mt-2">This product comes with a 1-year warranty.</p>
            </Accordion>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts?.length > 0 && (
          <div className="mt-14 p-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              You may also like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {relatedProducts.slice(0, 4).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <div className="group relative bg-[#fff] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="relative w-full bg-[#dadada] rounded-br-[60%] flex items-center justify-center overflow-hidden h-48 sm:h-56">
                      <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden relative">
                        <Image
                          src={p.images?.[0]?.src || "/placeholder.jpg"}
                          alt={p.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="p-4 flex flex-col">
                      <h3 className="text-sm sm:text-base font-normal text-black line-clamp-2">
                        {p.name}
                      </h3>
                      <p className="text-base sm:text-lg font-normal text-black mt-1">
                        ₹{p.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Sticky Buttons */}
        <div className="fixed bottom-0 left-0 w-full border-t border-gray-200 shadow-md flex gap-3 px-4 py-3 lg:hidden bg-white z-[1000]">
          <a
            href="/enquiry"
            className="flex-1 text-center bg-blue-400 text-white px-4 py-2 rounded-lg font-light shadow hover:scale-105 transition"
          >
            Enquiry
          </a>
          <a
            href={`https://wa.me/919999999999?text=Hi, I'm interested in ${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-green-600 text-white px-4 py-2 rounded-lg font-light shadow hover:scale-105 transition"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* ===== Desktop Layout ===== */}
      <div className="hidden lg:block">
        {/* Gallery */}
        <div className="grid grid-cols-10 gap-4">
          {/* Left Big Image */}
          <div className="col-span-4 relative rounded-2xl overflow-hidden">
            <div className="w-full h-[500px] relative">
              <Image
                src={getSafeImage(images[0])}
                alt={product?.name || "Product Image"}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Middle Two Small Images */}
          <div className="col-span-2 flex flex-col gap-4">
            <div className="relative w-full h-[245px] rounded-2xl overflow-hidden">
              <Image
                src={getSafeImage(images[1])}
                alt={product?.name || "Product Image"}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-[245px] rounded-2xl overflow-hidden">
              <Image
                src={getSafeImage(images[2])}
                alt={product?.name || "Product Image"}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Big Image */}
          <div className="col-span-4 relative rounded-2xl overflow-hidden">
            <div className="w-full h-[500px] relative">
              <Image
                src={getSafeImage(images[3])}
                alt={product?.name || "Product Image"}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Info + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mt-8">
          {/* Details */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
              {product?.name || "Product Name"}
            </h1>
            <p className="text-2xl lg:text-3xl font-bold text-[#0c655c]">
              ₹{product?.price || "0.00"}
            </p>
            <p className="text-base lg:text-lg leading-relaxed">
              {product?.short_description?.replace(/<[^>]+>/g, "") ||
                "This is a premium product designed with top quality materials."}
            </p>

            {/* Accordions (all 4) */}
            <div className="space-y-3">
              <Accordion title="Product Features">
                <ul className="list-disc ml-5 mt-2 space-y-1 text-base">
                  <li>High-quality materials</li>
                  <li>Durable and long-lasting</li>
                  <li>Stylish design</li>
                </ul>
              </Accordion>
              <Accordion title="Specifications">
                <ul className="list-disc ml-5 mt-2 space-y-1 text-base">
                  <li>Weight: 1.2kg</li>
                  <li>Dimensions: 30x20x15 cm</li>
                  <li>Color: Green</li>
                </ul>
              </Accordion>
              <Accordion title="Shipping & Returns">
                <p className="mt-2 text-base">
                  Free shipping on all orders. Returns accepted within 30 days.
                </p>
              </Accordion>
              <Accordion title="Warranty">
                <p className="mt-2 text-base">
                  This product comes with a 1-year warranty.
                </p>
              </Accordion>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 self-start">
            {/* Newsletter */}
            <div className="p-6 border rounded-2xl shadow bg-white">
              <h3 className="text-lg font-semibold mb-2">📩 Stay up to date</h3>
              <p className="text-sm text-gray-500 mb-4">
                Get notified when we publish something new.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-6 border rounded-2xl shadow bg-white">
              <h3 className="text-lg font-semibold mb-4">👋 We are on socials</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <a href="#" className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50">
                  <span>📘</span> Facebook
                </a>
                <a href="#" className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50">
                  <span>🐦</span> Twitter
                </a>
                <a href="#" className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50">
                  <span>🐙</span> Github
                </a>
                <a href="#" className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50">
                  <span>🎵</span> TikTok
                </a>
              </div>
            </div>

            {/* About */}
            <div className="p-4 border rounded-2xl shadow bg-white">
              <h3 className="text-lg font-semibold mb-2">About product</h3>
              <p className="text-sm text-gray-500 mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
                in error consectetur eveniet repellendus atque quisquam mollitia
                perferendis ab ea dignissimos, quod fugit maiores obcaecati quo
                doloremque voluptatem provident tenetur.
              </p>
            </div>
          </aside>
        </div>

        {/* Related Products */}
        {relatedProducts?.length > 0 && (
          <div className="mt-14 p-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              You may also like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {relatedProducts.slice(0, 4).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <div className="group relative bg-[#fff] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="relative w-full bg-[#dadada] rounded-br-[60%] flex items-center justify-center overflow-hidden h-56 md:h-64">
                      <div className="w-44 h-44 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full overflow-hidden relative">
                        <Image
                          src={p.images?.[0]?.src || "/placeholder.jpg"}
                          alt={p.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col">
                      <h3 className="text-sm sm:text-base md:text-lg font-normal text-black line-clamp-2">
                        {p.name}
                      </h3>
                      <p className="text-base sm:text-lg md:text-xl font-normal text-black mt-1">
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
    </div>
  );
}

/* Accordion Component */
function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex justify-between items-center text-left text-lg font-semibold"
      >
        {title}
        <span className="text-gray-500">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="px-4 pb-4 text-gray-600">{children}</div>}
    </div>
  );
}

/* ====== Server-Side Data Fetching ====== */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const product = await getProductById(parseInt(id as string));
  const relatedProducts = await getProducts({ per_page: 4 });

  return {
    props: {
      product,
      relatedProducts,
    },
  };
};
