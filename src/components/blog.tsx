import Link from "next/link";

interface BlogPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  featured_image?: string;
}

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg">
        ⚠️ No blogs available
      </p>
    );
  }

  return (
    <div className="max-w-full mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blogs/${post.id}`}>
            <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col h-full overflow-hidden group cursor-pointer border border-gray-100">
              {/* Featured Image */}
              {post.featured_image && (
                <div className="relative w-full h-52 overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title.rendered}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
              )}

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3
                  className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#0c655c] transition-colors duration-300 leading-snug"
                  dangerouslySetInnerHTML={{
                    __html: post?.title?.rendered || "",
                  }}
                />

                <div
                  className="text-gray-600 mb-6 line-clamp-3 text-sm flex-1"
                  dangerouslySetInnerHTML={{
                    __html: post?.excerpt?.rendered || "",
                  }}
                />

                <span className="mt-auto inline-block text-white bg-gradient-to-r from-[#0c655c] to-[#0c655c] hover:from-[#0c655c]/90 hover:to-[#0c655c] px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-xl text-center">
                  Read More →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
