// "use client";

// import { Container } from "@mui/material";

// import { paths } from "@/routes/paths";

// import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";
// import { EmptyContent } from "@/components/empty-content";

// import { BlogList } from "../blog-list";

// import { useGetBlogs } from "@/api";

// export function BlogView() {
//   const { blogs, isLoading } = useGetBlogs();

//   const isBlogsNotFound = !isLoading && !blogs?.length;

//   const renderNotFound = () => (
//     <EmptyContent title="No blogs found" filled sx={{ py: 10 }} />
//   );

//   return (
//     <Container maxWidth="xl" sx={{ mt: 0, mb: 5 }}>
//       <CustomBreadcrumbs
//         heading="Blogs"

//         links={[{ name: "Blog", href: paths.blog.root }, { name: "Posts" }]}
//         sx={{ mb: { xs: 3, md: 5 } }}
//       />

//       {isBlogsNotFound && renderNotFound()}

//       <BlogList blogs={blogs} loading={isLoading} />
//     </Container>
//   );
// }
"use client";

import { paths } from "@/routes/paths";

import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";
import { EmptyContent } from "@/components/empty-content";

import { BlogList } from "../blog-list";

import { useGetBlogs } from "@/api";

export function BlogView() {
  const { blogs, isLoading } = useGetBlogs();

  const isBlogsNotFound = !isLoading && !blogs?.length;

  const renderNotFound = () => (
    <EmptyContent title="No blogs found" filled sx={{ py: 10 }} />
  );

  return (
    <div className="mx-auto container max-w-8xl px-4 sm:px-6 my-10">
      <CustomBreadcrumbs
        heading="Blogs"
        links={[{ name: "Blog", href: paths.blog.root }, { name: "Posts" }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {isBlogsNotFound && renderNotFound()}

      <BlogList blogs={blogs} loading={isLoading} />
    </div>
  );
}