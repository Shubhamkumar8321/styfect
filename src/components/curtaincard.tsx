import React from "react";
import Link from "next/link";
// import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: string;
  images: { src: string }[];
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      <Link href={`/products/${product.id}`}>
        {/* Product Image */}
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={product.images?.[0]?.src || "/placeholder.jpg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay hover effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Wishlist */}
          <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Product Info */}
        <div className="p-5 space-y-2">
          {/* Product Name */}
          <h2 className="text-base font-semibold text-gray-800 group-hover:text-[#0c655c] transition-colors duration-300 line-clamp-2">
            {product.name}
          </h2>
          {/* Price */}
          <p className="text-lg font-bold text-[#0c655c]">₹{product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;


// import React from "react";
// import Link from "next/link";

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   images: { src: string }[];
// }

// const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
//   return (
//     <div className="parent w-72 h-80 relative perspective-1200">
//       <Link href={`/products/${product.id}`}>
//         <div className="card relative h-full rounded-3xl bg-gradient-to-br from-purple-600 to-purple-400 transform-style-preserve-3d transition-all duration-700 shadow-lg">
          
//           {/* Floating Logo Circles */}
//           <div className="logo absolute top-0 left-0 transform-style-preserve-3d">
//             {[160, 130, 100, 70, 40].map((size, index) => (
//               <span
//                 key={index}
//                 className={`circle absolute rounded-full bg-purple-300/30 shadow-md transition-all duration-700`}
//                 style={{
//                   width: size,
//                   height: size,
//                   top: 10 + index * 5,
//                   left: 10 + index * 5,
//                   transform: `translate3d(0,0,${25 + index * 20}px)`,
//                   transitionDelay: `${index * 0.3}s`,
//                   display: "grid",
//                   placeContent: index === 4 ? "center" : undefined,
//                 }}
//               >
//                 {index === 4 && (
//                   <img
//                     src={product.images?.[0]?.src || "/placeholder.jpg"}
//                     alt={product.name}
//                     className="w-10 h-10 object-cover rounded-full"
//                   />
//                 )}
//               </span>
//             ))}
//           </div>

//           {/* Glass overlay */}
//           <div className="glass absolute inset-2 rounded-3xl bg-white/30 border border-white/50 transform translate-z-8 transition-all duration-700"></div>

//           {/* Product Info */}
//           <div className="content absolute bottom-0 left-0 right-0 p-5 transform translate-z-10">
//             <h2 className="title text-white text-lg font-bold">{product.name}</h2>
//             <p className="text text-white/80 mt-2 text-sm">₹{product.price}</p>
//           </div>

//           {/* Bottom Social / Explore buttons */}
//           <div className="bottom absolute bottom-5 left-5 right-5 flex justify-between items-center transform translate-z-10">
//             <div className="social-buttons-container flex gap-2">
//               {/* You can map over social icons */}
//               <button className="social-button w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-purple-800 hover:text-white transition-colors">
//                 🛒
//               </button>
//             </div>
//             <button className="view-more-button text-purple-700 font-bold hover:text-purple-900 flex items-center gap-1">
//               Explore
//               <svg
//                 className="w-4 h-4 stroke-current"
//                 fill="none"
//                 strokeWidth={2}
//                 viewBox="0 0 24 24"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="m6 9 6 6 6-6"></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;


// import React from "react";
// import Link from "next/link";

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   images: { src: string }[];
// }

// const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
//   return (
//     <Link href={`/products/${product.id}`}>
//       <div className="card relative w-72 h-48 rounded-2xl overflow-hidden shadow-md bg-gradient-to-br from-purple-500 to-pink-400 transition-transform hover:scale-105">
        
//         {/* Background Circles */}
//         <div className="absolute inset-0">
//           <span className="circle absolute top-[-80%] right-[-50%] w-72 h-72 bg-yellow-400 opacity-40 rounded-full"></span>
//           <span className="circle absolute top-[-70%] right-[-30%] w-52 h-52 bg-yellow-400 opacity-40 rounded-full"></span>
//           <span className="circle absolute top-[-35%] right-[-8%] w-24 h-24 bg-yellow-400 opacity-100 rounded-full"></span>
//         </div>

//         {/* Info Section */}
//         <div className="info-section relative flex justify-between items-center h-3/4 px-4 py-2 z-10 text-white">
//           {/* Left: Image + Name */}
//           <div className="left-side flex flex-col justify-around h-full">
//             <img
//               src={product.images?.[0]?.src || "/placeholder.jpg"}
//               alt={product.name}
//               className="w-24 h-24 object-cover rounded-xl shadow-md"
//             />
//             <h2 className="font-semibold text-lg line-clamp-1">{product.name}</h2>
//           </div>

//           {/* Right: Price */}
//           <div className="right-side flex flex-col justify-around items-end h-full pr-4">
//             <div className="text-right">
//               <p className="text-xl font-bold">₹{product.price}</p>
//             </div>
//           </div>
//         </div>

//         {/* Days / Bottom Buttons Section */}
//         <div className="days-section absolute bottom-0 flex justify-between items-center w-full h-1/4 bg-pink-700 gap-1 shadow-inner">
//           <button className="flex-1 h-full flex items-center justify-center bg-pink-600 hover:scale-95 transition-transform rounded-tl-lg rounded-tr-lg text-white font-medium">
//             Buy Now
//           </button>
//           <button className="flex-1 h-full flex items-center justify-center bg-pink-600 hover:scale-95 transition-transform rounded-tl-lg rounded-tr-lg text-white font-medium">
//             Details
//           </button>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;



// import React, { useRef, useEffect } from "react";
// import Link from "next/link";
// import { gsap } from "gsap";

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   images: { src: string }[];
// }

// const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const imageRef = useRef<HTMLDivElement>(null);
//   const titleRef = useRef<HTMLHeadingElement>(null);
//   const priceRef = useRef<HTMLParagraphElement>(null);
//   const buttonRef = useRef<HTMLButtonElement>(null);

//   useEffect(() => {
//     const card = cardRef.current;
//     const image = imageRef.current;
//     const title = titleRef.current;
//     const price = priceRef.current;
//     const button = buttonRef.current;

//     if (!card || !image || !title || !price || !button) return;

//     // Initial floating animation
//     gsap.to(card, {
//       y: -5,
//       rotationX: 1,
//       rotationY: -1,
//       duration: 2,
//       repeat: -1,
//       yoyo: true,
//       ease: "power1.inOut",
//     });

//     // Hover animations
//     const handleMouseEnter = (e: MouseEvent) => {
//       gsap.to(card, {
//         rotationX: 10,
//         rotationY: -10,
//         scale: 1.05,
//         duration: 0.5,
//         ease: "power3.out",
//       });
//       gsap.to(image, {
//         scale: 1.1,
//         duration: 0.5,
//         ease: "power3.out",
//       });
//       gsap.to([title, price, button], {
//         y: -10,
//         opacity: 1,
//         stagger: 0.05,
//         duration: 0.5,
//         ease: "power3.out",
//       });
//     };

//     const handleMouseLeave = (e: MouseEvent) => {
//       gsap.to(card, {
//         rotationX: 0,
//         rotationY: 0,
//         scale: 1,
//         duration: 0.5,
//         ease: "power3.out",
//       });
//       gsap.to(image, {
//         scale: 1,
//         duration: 0.5,
//         ease: "power3.out",
//       });
//       gsap.to([title, price, button], {
//         y: 0,
//         opacity: 1,
//         duration: 0.5,
//         ease: "power3.out",
//       });
//     };

//     card.addEventListener("mouseenter", handleMouseEnter);
//     card.addEventListener("mouseleave", handleMouseLeave);

//     return () => {
//       card.removeEventListener("mouseenter", handleMouseEnter);
//       card.removeEventListener("mouseleave", handleMouseLeave);
//     };
//   }, []);

//   return (
//     <div
//       ref={cardRef}
//       className="relative w-72 h-96 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-500 shadow-2xl cursor-pointer overflow-hidden"
//     >
//       <Link href={`/products/${product.id}`}>
//         {/* Product Image */}
//         <div
//           ref={imageRef}
//           className="relative w-full h-64 overflow-hidden rounded-t-3xl"
//         >
//           <img
//             src={product.images?.[0]?.src || "/placeholder.jpg"}
//             alt={product.name}
//             className="w-full h-full object-cover"
//           />
//           {/* Image overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>
//         </div>

//         {/* Product Info */}
//         <div className="p-5 flex flex-col gap-2">
//           <h2
//             ref={titleRef}
//             className="text-white text-lg font-bold line-clamp-2"
//           >
//             {product.name}
//           </h2>
//           <p
//             ref={priceRef}
//             className="text-yellow-300 text-xl font-extrabold"
//           >
//             ₹{product.price}
//           </p>
//           <button
//             ref={buttonRef}
//             className="mt-3 px-4 py-2 bg-white text-purple-700 font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform"
//           >
//             Buy Now
//           </button>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;
