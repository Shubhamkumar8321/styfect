export default function AboutSection() {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-20 max-w-full mx-auto rounded-2xl shadow-lg">
      {/* Heading */}
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Why Choose <span className="text-[#0c655c]">STYFECT</span>
        </h2>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl sm:max-w-3xl mx-auto px-2">
          Transform your living space with our premium curtains, blending
          style, comfort, and durability. At Styfect, we believe your
          home deserves the perfect finishing touch.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
        <div className="p-5 sm:p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <span className="text-[#0c655c] text-3xl sm:text-4xl mb-3 sm:mb-4 inline-block">🛋️</span>
          <h3 className="font-semibold text-base sm:text-lg mb-2">Premium Quality</h3>
          <p className="text-gray-500 text-sm sm:text-base">
            Crafted from the finest fabrics to ensure durability and elegance.
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <span className="text-[#0c655c] text-3xl sm:text-4xl mb-3 sm:mb-4 inline-block">🎨</span>
          <h3 className="font-semibold text-base sm:text-lg mb-2">Wide Variety</h3>
          <p className="text-gray-500 text-sm sm:text-base">
            From modern minimal to luxurious velvet, we’ve got styles for
            every taste.
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <span className="text-[#0c655c] text-3xl sm:text-4xl mb-3 sm:mb-4 inline-block">⚡</span>
          <h3 className="font-semibold text-base sm:text-lg mb-2">Fast Shipping</h3>
          <p className="text-gray-500 text-sm sm:text-base">
            Get your favorite curtains delivered quickly, right to your door.
          </p>
        </div>

        <div className="p-5 sm:p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <span className="text-[#0c655c] text-3xl sm:text-4xl mb-3 sm:mb-4 inline-block">🤝</span>
          <h3 className="font-semibold text-base sm:text-lg mb-2">Trusted Support</h3>
          <p className="text-gray-500 text-sm sm:text-base">
            Our friendly team is here to help you before and after your
            purchase.
          </p>
        </div>
      </div>
    </section>
  );
}
