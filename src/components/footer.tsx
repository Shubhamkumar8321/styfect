// import Image from "next/image";

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
//       <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
//         <div className="flex flex-col items-start">
//           <Image src="/logo.jpg" alt="CurtainHub Logo" width={180} height={50} />
//           <p className="mt-3">Elegant & affordable curtains to transform your home.</p>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
//           <ul className="space-y-2">
//             <li className="hover:text-white cursor-pointer">Shop</li>
//             <li className="hover:text-white cursor-pointer">About Us</li>
//             <li className="hover:text-white cursor-pointer">Contact</li>
//             <li className="hover:text-white cursor-pointer">Privacy Policy</li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="text-lg font-semibold mb-3 text-white">Contact</h3>
//           <p>Email: support@styfect.com</p>
//           <p>Phone: +91 00000 00000</p>
//         </div>
//       </div>

//       <p className="text-center mt-8 text-gray-500 text-sm">
//         © 2025 webspecia. All rights reserved.
//       </p>
//     </footer>
//   );
// }



import Image from "next/image";

export default function Footer() {
  const cities = [
    { x: 32, y: 32, icon: "🌷", name: "Flower city", anim: "anim-grow" },
    { x: 65, y: 22, icon: "🏛️", name: "Capital city", anim: "anim-slidein" },
    { x: 87, y: 58, icon: "🎢", name: "Funland", anim: "" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Left Section - Logo + Paragraph */}
        <div className="space-y-4 text-center md:text-left">
          <Image
            src="/Logo.jpg"
            alt="CurtainHub Logo"
            width={150}
            height={40}
            className="rounded-lg mx-auto md:mx-0"
          />
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto md:mx-0">
            At CurtainHub, we believe your home deserves elegance and comfort.
            Our wide collection of premium curtains is designed to transform
            every room with style and warmth — all at an affordable price.
          </p>
        </div>

        {/* Middle Section - Contact Info */}
        <div className="space-y-3 text-center md:text-left text-sm sm:text-base">
          <p className="text-white font-semibold text-lg">Contact Us</p>
          <p>Email: support@styfect.com</p>
          <p>Phone: +91 00000 00000</p>
          <p>Address: 123 Curtain Street, New Delhi, India</p>
        </div>
       {/* Right Section - Map */}
<div className="flex justify-center md:justify-end w-full">
  <div className="relative w-full h-52 sm:h-64 md:aspect-[2/1] md:h-auto max-w-[600px] rounded-md shadow-md overflow-hidden">
    <svg
      viewBox="0 0 500 500"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
    >
      <rect fill="#f5f0e5" width="500" height="500" />
      <path
        fill="#0c655c"
        d="M0,367.82c5.83-4.39,14.42-10.16,25.59-15.34,4.52-2.09,43.19-19.51,79.55-11.93,36.1,7.52,35.75,32.55,78.41,60.23,46.34,30.06,109.47,41.21,123.32,22.1,11.95-16.49-22.61-41.92-13.66-84.6,4.85-23.1,22.33-50.71,47.73-58.52,42.42-13.05,78.83,39.45,102.84,23.86,15.81-10.26.01-32.87,22.73-74.43,5.8-10.62,11.65-21.15,11.93-36.93.28-15.69-5.63-26.64-7.95-32.39-6.66-16.45-6.21-45.15,28.84-98.55.23,146.23.46,292.46.69,438.69H0v-132.18Z"
      />
    </svg>

    <div className="absolute inset-0">
      {cities.map((city, i) => (
        <div
          key={i}
          className="absolute group"
          style={{
            left: `calc(${city.x}% - 1rem)`,
            top: `calc(${city.y}% - 1rem)`,
          }}
        >
          <span className="text-base sm:text-lg md:text-xl">📍</span>
          <div
            className={`hidden group-hover:flex absolute left-1/2 -translate-x-1/2 mt-1 bg-emerald-500 text-white text-[10px] sm:text-xs md:text-sm font-semibold px-2 py-1 rounded shadow-md whitespace-nowrap ${city.anim}`}
          >
            <span className="mr-1">{city.icon}</span>
            {city.name}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      </div>

      {/* Bottom Text */}
      <p className="text-center mt-10 text-gray-500 text-xs sm:text-sm border-t border-gray-700 pt-4">
        © 2025 webspecia. All rights reserved.
      </p>

      {/* Animations */}
      <style jsx>{`
        .anim-grow::before {
          animation: grow 0.5s ease-in forwards;
        }
        .anim-slidein::before {
          animation: slidein 0.5s ease-out forwards;
        }
        @keyframes grow {
          0% {
            transform: translate(0, 200%);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        @keyframes slidein {
          0% {
            transform: translateX(-200%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </footer>
  );
}
