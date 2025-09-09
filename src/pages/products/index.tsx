import { GetServerSideProps } from "next";
import { getProducts } from "@/lib/woocommerce";
import ProductCard from "@/components/curtaincard";
import Faq from "@/components/faq";

interface Product {
  id: number;
  name: string;
  price: string;
  images: { src: string}[];
}

export default function Products({ products }: { products: Product[] }) {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          Our Products
        </h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            ⚠️ No products available
          </p>
        )}
      </div>
      <Faq />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await getProducts();
  return { props: { products } };
};
