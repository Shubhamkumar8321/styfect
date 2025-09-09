// src/components/CurtainCategory.tsx
import React, { useState } from "react";

interface Curtain {
  name: string;
  image: string;
}

const curtains: Curtain[] = [
  { name: "Sheer", image: "/curtains/image1.jpg" },
  { name: "Blackout", image: "/curtains/image2.jpg" },
  { name: "Velvet", image: "/curtains/image3.jpg" },
  { name: "Linen", image: "/curtains/image4.jpg" },
];

const CurtainCategory: React.FC = () => {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (name: string) => {
    setSelected(name);
    console.log("Selected curtain type:", name);
  };

  return (
    <div className="p-6 sm:p-8 md:p-12 bg-gray-100">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
        Choose Your Curtain Type
      </h2>

      {/* Responsive Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 justify-items-center max-w-full mx-auto">
          {curtains.map((curtain) => (
            <div
              key={curtain.name}
              className={`relative cursor-pointer rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105
                ${selected === curtain.name ? "ring-4 ring-[#0c655c]" : ""} 
                w-64 h-64 sm:w-64 sm:h-64 md:w-72 md:h-72`}
              onClick={() => handleSelect(curtain.name)}
            >
              {/* Background Image */}
              <div
                className="w-full h-full bg-center bg-cover"
                style={{ backgroundImage: `url(${curtain.image})` }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center transition-opacity duration-300 hover:bg-black/30">
                <span className="text-white text-lg sm:text-xl md:text-2xl font-semibold text-center px-2">
                  {curtain.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurtainCategory;
