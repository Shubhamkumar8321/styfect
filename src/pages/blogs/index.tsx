// pages/blogs/index.tsx
import { GetServerSideProps } from "next";
import { getPosts } from "@/lib/wordpress";
import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    ["wp:featuredmedia"]?: { source_url: string }[];
  };
}

export default function BlogPage({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
        📰 Latest Blogs
      </h1>

      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {posts.map((post) => {
            const title =
              post?.title?.rendered?.replace(/<[^>]+>/g, "") || "Untitled";
            const excerpt =
              post?.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "";
            const image =
              post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

            return (
              <Link key={post.id} href={`/blogs/${post.id}`} className="group">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  {/* Featured Image */}
                  {image && (
                    <div className="relative w-full h-48 sm:h-56 md:h-52 lg:h-56 overflow-hidden">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-all duration-500"></div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative flex flex-col flex-1 p-5 sm:p-6">
                    {/* Title */}
                    <h2 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 group-hover:text-[#3c3163] transition-colors duration-300 leading-snug">
                      {title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm sm:text-base mb-5 line-clamp-3 flex-grow">
                      {excerpt}
                    </p>

                    {/* Read More Button */}
                    <span className="mt-auto inline-block text-white bg-gradient-to-r from-[#1c8a7f] to-[#0c655c] hover:from-[#0c655c] hover:to-[#1c8a7f] px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-xl text-center text-sm sm:text-base">
                      Read More →
                    </span>
                  </div>

                  {/* Ripple Background Circles */}
                  <div className="absolute -top-1/2 -left-1/2 w-[250%] h-[250%] bg-gray-200 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out -z-10" />
                  <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 ease-in-out -z-10" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12 text-base sm:text-lg">
          ⚠️ No posts found
        </p>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const posts = await getPosts();

    return {
      props: {
        posts: Array.isArray(posts) ? posts : [],
      },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { props: { posts: [] } };
  }
};
