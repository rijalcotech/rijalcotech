import { paths } from "@/routes/paths";

import { BlogItem } from "./blog-item";
import { BlogItemSkeleton } from "./blog-skeleton";

// ----------------------------------------------------------------------

export function BlogList({ blogs, loading }) {
  const renderLoading = () => <BlogItemSkeleton />;

  const renderList = () =>
    blogs.map((blog) => (
      <BlogItem
        key={blog.id}
        blog={blog}
        detailsHref={paths.blog.details(blog.slug)}
      />
    ));

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
        {loading ? renderLoading() : renderList()}
      </div>

      {blogs.length > 8 && (
        <div className="mt-8 flex justify-center md:mt-12">
          {/* Replace with your pagination component */}
          <div className="flex items-center gap-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <button
                key={index}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-sm transition hover:bg-gray-100"
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}