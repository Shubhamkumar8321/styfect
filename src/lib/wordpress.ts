import axios from "axios";

const WP_API_URL =
  process.env.NEXT_PUBLIC_WP_API_URL || "https://thekidling.com/wp-json/wp/v2";

// 🔹 Axios instance
const api = axios.create({
  baseURL: WP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Fetch latest posts (for homepage)
export const getAllPostsForHome = async (limit: number = 6) => {
  try {
    const res = await api.get(`/posts?per_page=${limit}&_embed`);
    console.log("📌 Home Posts Fetched:", res.data.length);
    return res.data || [];
  } catch (error: any) {
    console.error("❌ Error fetching home posts:", error.message);
    return [];
  }
};

// ✅ Fetch paginated posts (blog listing)
export const getPosts = async (page: number = 1, perPage: number = 16) => {
  try {
    const res = await api.get(`/posts?page=${page}&per_page=${perPage}&_embed`);
    console.log("📌 Posts fetched:", res.data.length);
    return res.data || [];
  } catch (error: any) {
    console.error("❌ Error fetching posts:", error.message);
    return [];
  }
};

// ✅ Fetch single post by ID
export const getPostById = async (id: string) => {
  try {
    const res = await api.get(`/posts/${id}?_embed`);
    return res.data || null;
  } catch (error: any) {
    console.error("❌ Error fetching post by ID:", error.message);
    return null;
  }
};

// ✅ Fetch single post by slug
export const getPostBySlug = async (slug: string) => {
  try {
    const res = await api.get(`/posts?slug=${slug}&_embed`);
    return res.data?.[0] || null;
  } catch (error: any) {
    console.error("❌ Error fetching post by slug:", error.message);
    return null;
  }
};
