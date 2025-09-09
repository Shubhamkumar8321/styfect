import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: "https://thekidling.com",
  consumerKey: process.env.WC_CONSUMER_KEY as string,
  consumerSecret: process.env.WC_CONSUMER_SECRET as string,
  version: "wc/v3",
});

// ✅ Fetch all products with optional pagination
export const getProducts = async (options?: { per_page?: number; page?: number }) => {
  try {
    const { data } = await api.get("products", options || {});
    return data;
  } catch (error: any) {
    console.error("❌ Error fetching products:", error.response?.data || error.message);
    return [];
  }
};

// ✅ Fetch single product by ID
export const getProductById = async (id: number) => {
  try {
    const { data } = await api.get(`products/${id}`);
    return data || null;
  } catch (error: any) {
    console.error("❌ Error fetching product by ID:", error.response?.data || error.message);
    return null;
  }
};
