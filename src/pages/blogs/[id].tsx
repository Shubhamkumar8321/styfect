// pages/blogs/[id].tsx
import { GetServerSideProps } from "next";
import { getPostById } from "@/lib/wordpress";
import Image from "next/image";

export default function BlogDetail({ post }: { post: any }) {
  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        ⚠️ Post not found
      </div>
    );
  }

  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* ---------------- Left: Blog Content ---------------- */}
      <div className="lg:col-span-2 space-y-6">
        {/* Featured Image */}
        {image && (
          <div className="w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={image}
              alt={post.title.rendered}
              width={1200} 
              height={400} 
              className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover transition-transform duration-500 hover:scale-105 rounded-2xl"
            />
          </div>
        )}

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* Meta Info */}
        <p className="text-sm sm:text-base text-gray-500">
          Published on{" "}
          <span className="font-medium">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>

        {/* Blog Content */}
        <div
          className="prose prose-sm sm:prose lg:prose-lg prose-gray max-w-full leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>

      {/* ---------------- Right: Sidebar (Mobile Responsive) ---------------- */}
      <aside className="space-y-6 lg:sticky lg:top-20 self-start">
        {/* Newsletter Widget */}
        <div className="p-6 border rounded-2xl shadow bg-white">
          <h3 className="text-lg font-semibold mb-2">📩 Stay up to date</h3>
          <p className="text-sm text-gray-500 mb-4">
            Get notified when we publish something new.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Social Links Widget */}
        <div className="p-6 border rounded-2xl shadow bg-white">
          <h3 className="text-lg font-semibold mb-4">👋 We are on socials</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <a
              href="#"
              className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50"
            >
              <span>📘</span> Facebook
            </a>
            <a
              href="#"
              className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50"
            >
              <span>🐦</span> Twitter
            </a>
            <a
              href="#"
              className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50"
            >
              <span>🐙</span> Github
            </a>
            <a
              href="#"
              className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50"
            >
              <span>🎵</span> TikTok
            </a>
          </div>
        </div>

        {/* Categories Widget */}
        <div className="p-6 border rounded-2xl shadow bg-white">
          <h3 className="text-lg font-semibold mb-4">✨ Top Categories</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex justify-between">
              <span>Uncategorized</span> <span>66 Articles</span>
            </li>
            <li className="flex justify-between">
              <span>Design</span> <span>24 Articles</span>
            </li>
            <li className="flex justify-between">
              <span>Development</span> <span>42 Articles</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const post = await getPostById(id);
  return { props: { post } };
};
