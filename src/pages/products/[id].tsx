import { useState } from "react";
import { GetServerSideProps } from "next";
import { getProductById, getProducts } from "@/lib/woocommerce";
import Link from "next/link";

export default function ProductDetail({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: any[];
}) {
  const [selectedImage, setSelectedImage] = useState<number | "video">(0);
  const [selectedColor, setSelectedColor] = useState("Porcelain");
  const [mountType, setMountType] = useState("Outside");
  const [width, setWidth] = useState(36);
  const [height, setHeight] = useState(48);
  const [roomName, setRoomName] = useState("");
  const [warranty, setWarranty] = useState("3-Year Limited");

  const images = product.images?.length
    ? product.images
    : [{ src: "/placeholder.png" }];

  const whatsappNumber = "919999999999"; // ✅ replace with your WhatsApp number
  const enquiryLink = "/enquiry"; // ✅ replace with your enquiry page route

  if (!product)
    return <p className="text-center mt-20">⚠️ Product not found</p>;

  // Dummy colors
  const colors = [
    "Perfect White",
    "Porcelain",
    "Sand",
    "Greige",
    "Taupe",
    "Cork",
    "Brown",
    "Gray",
    "Stone Wall",
    "Basalt",
  ];

  // --- Drag handler for measurement scale
  const handleDrag = (
    e: React.MouseEvent<HTMLDivElement>,
    type: "width" | "height"
  ) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (type === "width") {
      setWidth(Math.round(24 + percent * (96 - 24)));
    } else {
      setHeight(Math.round(36 + percent * (96 - 36)));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-10 relative">
        {/* LEFT SIDE - FIXED IMAGE + VIDEO GALLERY */}
        <div className="md:sticky md:top-24 self-start">
          <div className="bg-white rounded-2xl p-4 border border-gray-300">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-blue-200 to-white opacity-25 blur-3xl"></div>
            {/* Main Display */}
            {selectedImage === "video" ? (
              <video
                controls
                className="w-full h-[450px] object-cover rounded-xl"
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                Your browser does not support video playback.
              </video>
            ) : (
              <img
                src={images[Number(selectedImage)]?.src || "/placeholder.png"}
                alt={product.name}
                className="w-full h-[450px] object-cover rounded-xl"
              />
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2 relative">
            {images.slice(0, 5).map((img: any, idx: number) => (
              <img
                key={idx}
                src={img.src}
                alt={`thumb-${idx}`}
                className={`w-20 h-20 object-cover rounded-lg border border-gray-300 cursor-pointer transition ${
                  selectedImage === idx
                    ? "ring-2 ring-[#0c655c]"
                    : "hover:opacity-80"
                }`}
                onClick={() => setSelectedImage(idx)}
              />
            ))}

            {/* Video Thumbnail */}
            <div
              className={`relative w-20 h-20 rounded-lg border border-gray-300 overflow-hidden cursor-pointer ${
                selectedImage === "video" ? "ring-2 ring-[#0c655c]" : ""
              }`}
              onClick={() => setSelectedImage("video")}
            >
              <img
                src="/video-thumbnail.jpg"
                alt="video"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l4.5-2.5a.5.5 0 0 0 0-.814l-4.5-2.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - PRODUCT INFO */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-yellow-400 font-medium">
            ★★★★☆ 4.8 (3,166 Reviews)
          </p>
          <p className="text-3xl font-bold text-[#0c655c]">₹{product.price}</p>
          <p className="text-red-600">
            🎉 Eligible Discounts: <b>50% Off</b> ₹99+! Applied in cart
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href={enquiryLink}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition"
            >
              Enquiry Now
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-green-700 transition"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Colors */}
          <Accordion title="🎨 Selected Color">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`border border-gray-300 rounded-lg p-3 text-sm font-medium transition ${
                    selectedColor === c
                      ? "ring-2 ring-[#0c655c]"
                      : "hover:shadow"
                  }`}
                >
                  {c}
                  <div className="text-xs text-[#0c655c]">Free Sample</div>
                </button>
              ))}
            </div>
          </Accordion>

          {/* Size & Measurement */}
          <style jsx global>{`
            /* Scrollbar hide CSS */
            .hide-scrollbar {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }
            .hide-scrollbar::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
            }
          `}</style>

          <Accordion title="📏 Enter Measurements">
            <div className="space-y-6 mt-3">
              {/* Width */}
              <div>
                <label className="font-semibold flex items-center gap-2">
                  ↔ Width (inches)
                </label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-24 border border-gray-300 rounded px-2 py-1"
                    min={24}
                    max={120}
                    step={1}
                  />
                  <div className="relative w-full overflow-x-auto hide-scrollbar">
                    <div
                      className="relative h-12 bg-gray-50 border border-gray-300 rounded flex"
                      style={{ width: `${(120 - 24) * 20}px` }}
                    >
                      {Array.from({ length: 120 - 24 + 1 }, (_, i) => {
                        const value = 24 + i;
                        return (
                          <div
                            key={i}
                            onClick={() => setWidth(value)}
                            className="relative flex-shrink-0 cursor-pointer flex flex-col items-center"
                            style={{ width: "20px" }}
                          >
                            <div
                              className={`w-0.5 bg-gray-700 ${
                                value % 12 === 0
                                  ? "h-6"
                                  : value % 6 === 0
                                  ? "h-4"
                                  : "h-3"
                              }`}
                            ></div>
                            {value % 12 === 0 && (
                              <span className="text-xs text-gray-700 mt-1">
                                {value}
                              </span>
                            )}
                          </div>
                        );
                      })}
                      <div
                        className="absolute inset-y-0 flex flex-col items-center"
                        style={{ left: `${(width - 24) * 20}px` }}
                      >
                        <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-blue-600"></div>
                        <div className="w-0.5 bg-blue-600 flex-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Height */}
              <div>
                <label className="font-semibold flex items-center gap-2">
                  ↕ Height (inches)
                </label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-24 border border-gray-300 rounded px-2 py-1"
                    min={36}
                    max={120}
                    step={1}
                  />
                  <div className="relative w-full overflow-x-auto hide-scrollbar">
                    <div
                      className="relative h-12 bg-gray-50 border border-gray-300 rounded flex"
                      style={{ width: `${(120 - 36) * 20}px` }}
                    >
                      {Array.from({ length: 120 - 36 + 1 }, (_, i) => {
                        const value = 36 + i;
                        return (
                          <div
                            key={i}
                            onClick={() => setHeight(value)}
                            className="relative flex-shrink-0 cursor-pointer flex flex-col items-center"
                            style={{ width: "20px" }}
                          >
                            <div
                              className={`w-0.5 bg-gray-700 ${
                                value % 12 === 0
                                  ? "h-6"
                                  : value % 6 === 0
                                  ? "h-4"
                                  : "h-3"
                              }`}
                            ></div>
                            {value % 12 === 0 && (
                              <span className="text-xs text-gray-700 mt-1">
                                {value}
                              </span>
                            )}
                          </div>
                        );
                      })}
                      <div
                        className="absolute inset-y-0 flex flex-col items-center"
                        style={{ left: `${(height - 36) * 20}px` }}
                      >
                        <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-blue-600"></div>
                        <div className="w-0.5 bg-blue-600 flex-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room Name */}
              <div>
                <label className="text-sm font-semibold block">Room Name</label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Ex: West Wall"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>
          </Accordion>

          {/* Mount Type */}
          <Accordion title="🪟 Mount Type">
            <div className="flex gap-4 mt-3">
              {["Inside", "Outside"].map((type) => (
                <button
                  key={type}
                  onClick={() => setMountType(type)}
                  className={`px-4 py-2 border rounded-lg ${
                    mountType === type
                      ? "bg-[#0c655c] text-white"
                      : "border-gray-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </Accordion>

          {/* Warranty */}
          <Accordion title="🛡️ Warranty Options">
            <div className="space-y-3 mt-3">
              {[
                {
                  label: "3-Year Limited Warranty (FREE)",
                  value: "3-Year Limited",
                },
                {
                  label: "5-Year Limited Warranty (+₹375)",
                  value: "5-Year Limited",
                },
                {
                  label: "5-Year Unlimited Warranty (+₹1128)",
                  value: "5-Year Unlimited",
                },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="warranty"
                    value={opt.value}
                    checked={warranty === opt.value}
                    onChange={() => setWarranty(opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </Accordion>
        </div>
      </div>

      {/* Product Info Below */}
      <div className="mt-12 space-y-4">
        <Accordion title="ℹ️ Product Information">
          <div
            dangerouslySetInnerHTML={{
              __html: product.short_description || product.description,
            }}
          />
        </Accordion>
        <Accordion title="⚙️ Specifications">
          <p>Dimensions, materials, and technical details go here.</p>
        </Accordion>
        <Accordion title="🛠️ Measure and Install">
          <p>Step-by-step installation guide here.</p>
        </Accordion>
        <Accordion title="🚚 Shipping & Production">
          <p>Ships in 2-3 business days. Free shipping available.</p>
        </Accordion>
        <Accordion title="⭐ Reviews">
          <p>Customer reviews section goes here.</p>
        </Accordion>
      </div>

      {/* Related Products */}
      {relatedProducts?.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((p) => (
              <Link key={p.id} href={`/products/${p.id || p.id}`}>
                <div className="border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-3 bg-white cursor-pointer">
                  <img
                    src={p.images?.[0]?.src || "/placeholder.png"}
                    alt={p.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-medium">{p.name}</h3>
                  <p className="text-[#0c655c] font-semibold">₹{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Accordion Component
function Accordion({ title, children }: { title: string; children: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-300 rounded-xl shadow-sm">
      <button
        className="w-full flex justify-between items-center px-4 py-3 font-semibold text-left hover:bg-gray-50 transition"
        onClick={() => setOpen(!open)}
      >
        {title}
        <span>{open ? "▲" : "▼"}</span>
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
