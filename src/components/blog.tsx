import Link from "next/link";
import Image from "next/image";

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
      <p className="text-center text-gray-500 text-base sm:text-lg mt-6">
        ⚠️ No blogs available
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blogs/${post.id}`} className="group">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
              {/* Featured Image */}
              {post.featured_image && (
                <div className="relative w-full h-52 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src={post.featured_image}
                    alt={post.title.rendered}
                    fill
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-all duration-500"></div>
                </div>
              )}

              {/* Content */}
              <div className="relative flex flex-col flex-1 p-5 sm:p-6">
                {/* Title */}
                <h3
                  className="text-lg sm:text-xl font-bold mb-3 text-gray-900 group-hover:text-[#3c3163] transition-colors duration-300 leading-snug"
                  dangerouslySetInnerHTML={{
                    __html: post?.title?.rendered || "",
                  }}
                />

                {/* Excerpt */}
                <div
                  className="text-gray-600 mb-5 line-clamp-3 text-sm sm:text-base flex-1"
                  dangerouslySetInnerHTML={{
                    __html: post?.excerpt?.rendered || "",
                  }}
                />

                {/* Read More Button */}
                <span className="mt-auto inline-block text-white bg-gradient-to-r from-[#1c8a7f] to-[#0c655c] hover:from-[#0c655c] hover:to-[#1c8a7f] px-5 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-xl text-center text-sm sm:text-base">
                  Read More →
                </span>
              </div>

              {/* Ripple effect circles like original CSS */}
              <div className="absolute -top-1/2 -left-1/2 w-[250%] h-[250%] bg-gray-200 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out -z-10" />
              <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 ease-in-out -z-10" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
