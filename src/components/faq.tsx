import React, { useState } from "react";

const faqs = [
  {
    question: "What types of curtains do you offer?",
    answer:
      "We offer a wide variety of curtains including sheer, blackout, velvet, linen, and cotton curtains to suit every interior style.",
  },
  {
    question: "Do blackout curtains really block sunlight?",
    answer:
      "Yes, our blackout curtains are designed to block up to 95–100% of external light, making them perfect for bedrooms and media rooms.",
  },
  {
    question: "Can I get custom-sized curtains?",
    answer:
      "Absolutely! We provide customization options so you can order curtains in the exact measurements you need for your windows.",
  },
  {
    question: "Are the curtains easy to clean?",
    answer:
      "Most of our curtains are machine washable. Velvet and premium fabrics may require dry cleaning for longer durability.",
  },
  {
    question: "Do you provide curtain rods and accessories?",
    answer:
      "Yes, we also provide high-quality rods, hooks, and accessories to complement your curtains.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Our standard delivery time is 4–7 business days. Express shipping options are also available at checkout.",
  },
  {
    question: "Do you offer installation services?",
    answer:
      "Yes, we provide professional installation services in select locations. You can request it during checkout.",
  },
  {
    question: "What if I’m not satisfied with my purchase?",
    answer:
      "We offer a hassle-free return policy within 7 days of delivery if the curtains are unused and in original packaging.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
      {/* Heading */}
      <div className="max-w-4xl sm:max-w-5xl mx-auto text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          Frequently Asked <span className="text-[#0c655c]">Questions</span>
        </h2>
        <p className="text-gray-600 mt-3 sm:mt-4 text-base sm:text-lg md:text-xl">
          Got questions about our curtains? We’ve got the answers for you!
        </p>
      </div>

      {/* FAQ Grid */}
      <div className="max-w-4xl sm:max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-md bg-white transition-transform transform hover:-translate-y-1 hover:shadow-lg"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 sm:p-5 text-left focus:outline-none"
            >
              <span className="font-medium text-gray-800 text-base sm:text-lg md:text-xl">
                {faq.question}
              </span>
              <span className="text-[#0c655c] text-xl sm:text-2xl md:text-3xl transition-transform duration-300">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 px-4 sm:px-5 ${
                openIndex === index ? "max-h-96 py-3 sm:py-4" : "max-h-0 py-0"
              }`}
            >
              <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
