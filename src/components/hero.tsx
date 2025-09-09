"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  const leftCurtain = useRef<HTMLDivElement>(null);
  const rightCurtain = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Set transform origin for folding effect
    gsap.set(leftCurtain.current, { transformOrigin: "left center" });
    gsap.set(rightCurtain.current, { transformOrigin: "right center" });

    // Curtains fold open
    tl.to(leftCurtain.current, {
      scaleX: 0,
      duration: 2,
      ease: "power3.inOut",
    });
    tl.to(
      rightCurtain.current,
      {
        scaleX: 0,
        duration: 2,
        ease: "power3.inOut",
      },
      "<" // start at same time as left
    );

    // Hero content fade in AFTER curtains open
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 2, ease: "power3.out" },
      "-=0.3" // slight overlap for smoothness
    );
  }, []);

  return (
    <section className="relative h-[70vh] sm:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full -z-20 blur-[2px] brightness-99">
        <Image
          src="/curtains/image3.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover sm:object-center object-[center_top]"
        />
      </div>

      {/* Left Curtain */}
      <div
        ref={leftCurtain}
        className="absolute top-0 left-0 h-full w-1/2 z-20"
      >
        <Image
          src="/curtain-left.jpg"
          alt="Left Curtain"
          fill
          className="object-cover"
        />
      </div>

      {/* Right Curtain */}
      <div
        ref={rightCurtain}
        className="absolute top-0 right-0 h-full w-1/2 z-20"
      >
        <Image
          src="/curtain-right.jpg"
          alt="Right Curtain"
          fill
          className="object-cover"
        />
      </div>

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center text-white px-4 xs:px-6 sm:px-8 max-w-full xs:max-w-sm sm:max-w-md md:max-w-2xl mx-auto"
      >
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg leading-tight">
          Transform Your Home with Beautiful Curtains
        </h1>
        <p className="text-sm xs:text-base sm:text-lg md:text-xl mb-6 drop-shadow-md leading-relaxed">
          Explore our wide collection of elegant, stylish, and affordable
          curtains to give your home a fresh look.
        </p>
        <button className="bg-[#0c655c] text-white px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#0c655c]/80 transition text-xs xs:text-sm sm:text-base">
          Shop Now
        </button>
      </div>
    </section>
  );
}
