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

    gsap.set(leftCurtain.current, { transformOrigin: "left center" });
    gsap.set(rightCurtain.current, { transformOrigin: "right center" });

    tl.to(leftCurtain.current, {
      scaleX: 0,
      duration: 1.5,
      ease: "power3.inOut",
    });
    tl.to(
      rightCurtain.current,
      {
        scaleX: 0,
        duration: 1.5,
        ease: "power3.inOut",
      },
      "<"
    );

    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
      "-=0.2"
    );
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/curtains/image3.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 100vw,
         100vw"
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
          priority
          className="object-cover"
          sizes="50vw"
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
          priority
          className="object-cover"
          sizes="50vw"
        />
      </div>

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center text-white px-4 sm:px-6 max-w-lg md:max-w-2xl"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg leading-tight">
          Transform Your Home with Beautiful Curtains 🪟
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 drop-shadow-md">
          Explore our wide collection of elegant, stylish, and affordable
          curtains to give your home a fresh look.
        </p>
        <button className="bg-[#0c655c] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#0c655c]/80 transition text-sm sm:text-base">
          Shop Now
        </button>
      </div>
    </section>
  );
}
