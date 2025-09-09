import { useState } from "react";
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
  const [selectedImage, setSelectedImage] = useState<number | "video">(0);

  const images = product.images?.length
    ? product.images
    : [{ src: "/placeholder.png" }];

  const whatsappNumber = "919999999999";
  const enquiryLink = "/enquiry";

  if (!product)
    return (
      <p className="text-center mt-20 text-lg text-gray-600">
        ⚠️ Product not found
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Left Section */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="bg-white rounded-2xl p-3 md:p-4 shadow-md">
            {selectedImage === "video" ? (
              <video
                controls
                className="w-full h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px] object-cover rounded-xl"
              >
                <source src="/demo-video.mp4" type="video/mp4" />
              </video>
            ) : (
              <Image
                src={images[Number(selectedImage)]?.src || "/placeholder.png"}
                alt={product.name}
                width={600}
                height={480}
                className="w-full h-[280px] sm:h-[350px] md:h-[420px] lg:h-[480px] object-cover rounded-xl"
              />
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hidden">
            {images.slice(0, 5).map((img: any, idx: number) => (
              <Image
                key={idx}
                src={img.src}
                alt={`thumb-${idx}`}
                width={80}
                height={80}
                className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg cursor-pointer transition transform hover:scale-105 ${
                  selectedImage === idx
                    ? "ring-2 ring-[#0c655c]"
                    : "hover:opacity-80"
                }`}
                onClick={() => setSelectedImage(idx)}
              />
            ))}

            {/* Video Thumbnail */}
            <div
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden cursor-pointer transition ${
                selectedImage === "video" ? "ring-2 ring-[#0c655c]" : ""
              }`}
              onClick={() => setSelectedImage("video")}
            >
              <Image
                src="/video-thumbnail.jpg"
                alt="video"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l4.5-2.5a.5.5 0 0 0 0-.814l-4.5-2.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {product.name}
          </h1>
          <p className="text-yellow-500 font-medium text-sm sm:text-base">
            ★★★★☆ 4.8 (3,166 Reviews)
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-[#0c655c]">
            ₹{product.price}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <a
              href={enquiryLink}
              className="flex-1 text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
            >
              Enquiry Now
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in ${product.name}`}
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
              <div className="space-y-3 mt-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                <h3 className="font-semibold text-lg text-blue-700">
                  How to Measure?
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Width:</strong> Add{" "}
                    <span className="font-semibold">3-4 inches extra</span> on
                    both sides for full coverage.
                  </li>
                  <li>
                    <strong>Height:</strong> Add{" "}
                    <span className="font-semibold">5-6 inches above</span> and{" "}
                    <span className="font-semibold">3-4 inches below</span> for
                    better fitting.
                  </li>
                  <li>
                    Take <span className="font-semibold">two readings</span>{" "}
                    (left & right for height, top & bottom for width).
                  </li>
                  <li>
                    Always use the{" "}
                    <span className="underline">largest value</span>.
                  </li>
                </ul>
                <p className="italic text-xs sm:text-sm text-gray-500">
                  Tip: Use a steel measuring tape for accuracy.
                </p>
              </div>
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
              <p className="text-sm sm:text-base">
                Step-by-step installation guide coming soon.
              </p>
            </Accordion>

            <Accordion title="Shipping & Production">
              <p className="text-sm sm:text-base">
                Ships in 2-3 business days. Free shipping available.
              </p>
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
                <div className="rounded-lg shadow-md hover:shadow-xl transition transform hover:scale-105 p-3 bg-white cursor-pointer">
                  <Image
                    src={p.images?.[0]?.src || "/placeholder.png"}
                    alt={p.name}
                    width={300}
                    height={200}
                    className="w-full h-36 sm:h-40 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-sm sm:text-base font-medium line-clamp-1">
                    {p.name}
                  </h3>
                  <p className="text-[#0c655c] font-semibold text-sm sm:text-base">
                    ₹{p.price}
                  </p>
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
        className="w-full flex justify-between items-center px-4 py-4 font-bold text-lg sm:text-xl text-gray-900 hover:bg-gray-50 transition"
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
