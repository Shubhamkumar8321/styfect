
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
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">📰 Latest Blogs</h1>

      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col overflow-hidden"
              >
                {/* Featured Image */}
                {image && (
                  <Image
                    src={image}
                    alt={title}
                    width={600} // ✅ required
                    height={400} // ✅ required
                    className="w-full h-48 object-cover"
                  />
                )}

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Title */}
                  <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                    {title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm flex-grow line-clamp-3">
                    {excerpt}
                  </p>

                  {/* Read More Button */}
                  <a
                    href={`/blogs/${post.id}`}
                    className="mt-6 inline-block text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-xl text-center"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12">⚠️ No posts found</p>
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
