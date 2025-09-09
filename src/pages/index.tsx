import Link from "next/link";
import Hero from "@/components/hero";
import CurtainCategory from "@/components/category";
import AboutSection from "@/components/about";
import FAQSection from "@/components/faq";
import BlogList from "@/components/blog";
import dynamic from "next/dynamic"; // 👈 for client-only import
import ProductCard from "@/components/curtaincard";
import { getProducts } from "@/lib/woocommerce";
import { getAllPostsForHome } from "@/lib/wordpress";
export default function Home({
  products,
  posts,
}: {
  products: any[];
  posts: any[];
}) {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

    {/* Featured Products Section */}
<div className="relative max-w-7xl mx-auto px-6 py-12">
  <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-blue-200 to-white opacity-50 blur-3xl"></div>
  <h2 className="text-5xl font-bold mb-6 text-center relative z-10">
    Featured Products
  </h2>

  {Array.isArray(products) && products.length > 0 ? (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-8 relative z-10">
        <Link
          href="/products"
          className="px-6 py-3 bg-[#0c655c] text-white rounded-lg hover:bg-[#0c655c]/90 transition"
        >
          View More Products
        </Link>
      </div>
    </>
  ) : (
    <p className="text-center text-gray-500 relative z-10">⚠️ No products available</p>
  )}
</div>


      {/* Categories */}
      <CurtainCategory />

      {/* About Section */}
      <AboutSection />

      {/* Blog Preview with CTA */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-5xl font-bold">Latest Blogs</h2>
          <Link
            href="/blogs"
            className="px-4 py-2 bg-[#0c655c] text-white rounded-lg hover:bg-[#0c655c] transition"
          >
            View All Blogs
          </Link>
        </div>

        {Array.isArray(posts) && posts.length > 0 ? (
          <BlogList posts={posts.slice(0,4)} /> 
        ) : (
          <p className="text-center text-gray-500">⚠️ No blogs available</p>
        )}
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}

// ✅ Always return array (never undefined)
export async function getServerSideProps() {
  try {
    const products = await getProducts();
    const posts = await getAllPostsForHome();
    return { props: { products: products || [], posts: posts || [] } };
  } catch (error) {
    console.error("Error loading data:", error);
    return { props: { products: [], posts: [] } };
  }
}
