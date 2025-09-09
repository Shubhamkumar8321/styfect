// pages/blogs/index.tsx
import { GetServerSideProps } from "next";
import { getPosts } from "@/lib/wordpress";
import Image from "next/image";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {posts.map((post) => {
            const title =
              post?.title?.rendered?.replace(/<[^>]+>/g, "") || "Untitled";
            const excerpt =
              post?.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "";
            const image =
              post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

            return (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col overflow-hidden h-full"
              >
                {/* Featured Image */}
                {image && (
                  <div className="relative w-full h-48 sm:h-56 md:h-48 lg:h-52 overflow-hidden">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  {/* Title */}
                  <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 line-clamp-2">
                    {title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm sm:text-base flex-grow line-clamp-3">
                    {excerpt}
                  </p>

                  {/* Read More Button */}
                  <a
                    href={`/blogs/${post.id}`}
                    className="mt-4 sm:mt-6 inline-block text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-xl text-center"
                  >
                    Read More →
                  </a>
                </div>
              </div>
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
