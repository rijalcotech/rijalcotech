"use client";

import { useState, useMemo } from "react";
import { useAppSelector } from "@/redux/hooks";
import { RouterLink } from "@/routes/components";
import { paths } from "@/routes/paths";
import { fDate } from "@/utils/format-time";
import { Markdown } from "@/components/markdown";
import { CustomBreadcrumbs } from "@/components/custom-breadcrumbs";
import { EmptyContent } from "@/components/empty-content";
import { Iconify } from "@/components/iconify";
import { toast } from "@/components/snackbar";
import { useGetBlogDetail, useGetBlogs } from "@/api";
import { BlogDetailsHero } from "../blog-details-hero";
import { BlogDetailsSkeleton } from "../blog-skeleton";
import { BlogItem } from "../blog-item";

// ----------------------------------------------------------------------

// Recent Blog Card Component for Sidebar
function RecentBlogCard({ blog, primaryColor, index }) {
  const { title, featured_image, created_at, slug } = blog;

  return (
    <RouterLink
      href={paths.blog.details(slug)}
      className="group flex gap-3.5 p-3 no-underline bg-white border border-gray-500/12 rounded-2xl transition-all duration-300 hover:border-primary-main hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
    >
      <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-100">
        <img
          src={featured_image}
          alt={title}
          title={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
        />
        {index !== undefined && (
          <span
            className="absolute top-1 left-1 w-5 h-5 rounded-md text-[10px] font-black flex items-center justify-center text-white shadow-xs"
            style={{ backgroundColor: primaryColor }}
          >
            0{index + 1}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-0 py-0.5 justify-between">
        <p className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-gray-100 leading-[1.4] line-clamp-2 group-hover:text-primary-main transition-colors">
          {title}
        </p>

        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Iconify icon="solar:calendar-linear" width={13} />
          <span>{fDate(created_at)}</span>
        </div>
      </div>
    </RouterLink>
  );
}

// ----------------------------------------------------------------------

// Share Bar Component with 1-Click Copy Link
function ShareButtons({ title, primaryColor }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success("Article link copied!");
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      toast.error("Could not copy link");
    }
  };

  const shareLinks = [
    {
      name: "Facebook",
      icon: "mdi:facebook",
      color: "#1877F2",
      bgColor: "rgba(24,119,242,0.08)",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "X (Twitter)",
      icon: "ri:twitter-x-fill",
      color: "#111111",
      bgColor: "rgba(0,0,0,0.06)",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title || "")}`,
    },
    {
      name: "LinkedIn",
      icon: "mdi:linkedin",
      color: "#0A66C2",
      bgColor: "rgba(10,102,194,0.08)",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title || "")}`,
    },
    {
      name: "WhatsApp",
      icon: "mdi:whatsapp",
      color: "#25D366",
      bgColor: "rgba(37,211,102,0.08)",
      url: `https://wa.me/?text=${encodeURIComponent(`${title} - ${shareUrl}`)}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-gray-50/80/60 border border-gray-500/12">
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
          style={{ backgroundColor: primaryColor }}
        >
          <Iconify icon="solar:share-bold" width={16} />
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100">
            Share this article
          </h4>
          <p className="text-[11px] text-gray-500">
            Spread the knowledge with your network
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${link.name}`}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
            style={{ backgroundColor: link.bgColor, color: link.color }}
          >
            <Iconify icon={link.icon} width={16} />
          </a>
        ))}

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 transition-all duration-200 hover:border-primary-main shadow-2xs active:scale-95"
          style={{
            borderColor: copied ? primaryColor : undefined,
            color: copied ? primaryColor : undefined,
          }}
        >
          <Iconify icon={copied ? "solar:check-circle-bold" : "solar:copy-bold"} width={14} />
          <span>{copied ? "Copied" : "Copy Link"}</span>
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------

// Table of Contents Sidebar Widget
function TableOfContentsWidget({ content, primaryColor }) {
  const headings = useMemo(() => {
    if (!content) return [];
    const matches = [];
    const regex = /^(#{2,3})\s+(.+)$/gm;
    let match;
    while ((match = regex.exec(content)) !== null) {
      matches.push({
        level: match[1].length,
        text: match[2].replace(/[*_~`]/g, ""),
        id: match[2]
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-"),
      });
    }
    return matches.slice(0, 6);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-white  border border-gray-500/12">
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-500/12">
        <Iconify icon="solar:list-check-bold" width={18} style={{ color: primaryColor }} />
        <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
          Table of Contents
        </h3>
      </div>

      <ul className="space-y-2 text-xs">
        {headings.map((h, i) => (
          <li key={i} className={h.level === 3 ? "pl-3" : ""}>
            <a
              href={`#${h.id}`}
              className="text-gray-600 dark:text-gray-300 hover:text-primary-main transition-colors flex items-center gap-1.5 py-0.5 line-clamp-1"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: primaryColor }}
              />
              <span>{h.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ----------------------------------------------------------------------

// Newsletter Sidebar Widget
function SidebarNewsletterWidget({ primaryColor }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubscribed(true);
    toast.success("Subscribed to newsletter!");
  };

  return (
    <div
      className="p-5 rounded-3xl text-white text-center shadow-md relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, #111827 100%)`,
      }}
    >
      <div className="flex flex-col items-center gap-2.5 relative z-10">
        <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center">
          <Iconify icon="solar:letter-bold" width={22} />
        </div>

        <h3 className="text-base font-bold">Stay Updated</h3>

        <p className="text-xs opacity-90 leading-relaxed max-w-xs">
          Subscribe to our newsletter for the latest insights, updates, and news.
        </p>

        {subscribed ? (
          <div className="w-full py-2.5 px-4 rounded-xl bg-white/20 text-xs font-semibold">
            🎉 Thank you for subscribing!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full space-y-2 mt-1">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/15 border border-white/25 text-white placeholder-white/60 text-xs focus:outline-hidden"
            />
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-white text-gray-900 font-bold text-xs hover:bg-white/90 transition-all shadow-sm"
            >
              Subscribe Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------

export function BlogDetailsView({ slug }) {
  const { vendor } = useAppSelector((state) => state.vendor);
  const primaryColor = vendor?.primary_color || "#1976d2";

  const { blog, isLoading, error } = useGetBlogDetail(slug);
  const { blogs: allBlogs, isLoading: blogsLoading } = useGetBlogs();

  const {
    title,
    description,
    short_description,
    featured_image,
    created_by,
    created_at,
    category,
  } = blog || {};

  const recentBlogs = useMemo(() => {
    return (allBlogs || []).filter((b) => b.slug !== slug).slice(0, 5);
  }, [allBlogs, slug]);

  const relatedBlogs = useMemo(() => {
    return (allBlogs || []).filter((b) => b.slug !== slug).slice(0, 3);
  }, [allBlogs, slug]);

  const isBlogFound = !isLoading && !error && title;
  const isBlogMissing = !isLoading && (error || !title);

  const readingTime = description
    ? Math.max(
      1,
      Math.ceil(description.replace(/<[^>]*>/g, "").split(/\s+/).length / 220)
    )
    : 3;

  const renderLoading = () => <BlogDetailsSkeleton />;

  const renderError = () => (
    <EmptyContent
      title="Blog Not Found"
      description="Oops! The blog you're looking for isn't available."
      action={
        <RouterLink
          href={paths.blog.root}
          className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary border border-gray-300 hover:border-primary transition-colors"
        >
          <Iconify icon="eva:arrow-ios-back-fill" width={16} />
          Back to List
        </RouterLink>
      }
      className="py-20"
    />
  );

  const renderBlog = () => (
    <>
      {/* Hero Section Component */}
      <BlogDetailsHero
        title={title}
        category={category}
        createdBy={created_by}
        coverUrl={featured_image}
        createdAt={created_at}
        readingTime={readingTime}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CustomBreadcrumbs
          links={[
            { name: "Home", href: paths.home },
            { name: "Blog", href: paths.blog.root },
            { name: title },
          ]}
          className="py-5"
        />
      </div>

      {/* Main Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Main Content (8 Columns) */}
          <div className="md:col-span-8 space-y-6">

            {/* Quick Excerpt Callout (if available) */}
            {short_description && (
              <div
                className="p-5 sm:p-6 rounded-3xl border-l-4 bg-gray-50/80/40 shadow-2xs"
                style={{ borderColor: primaryColor }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Iconify icon="solar:quote-left-bold" width={18} style={{ color: primaryColor }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: primaryColor }}>
                    Article Excerpt
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 leading-relaxed font-medium italic">
                  &ldquo;{short_description}&rdquo;
                </p>
              </div>
            )}

            {/* Article Content Card */}
            <div className="p-6 md:p-8 rounded-3xl bg-white  border border-gray-500/12 shadow-2xs">
              <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary-main prose-img:rounded-2xl">
                <Markdown children={description} />
              </div>
            </div>

            {/* Share Buttons */}
            {/* <ShareButtons title={title} primaryColor={primaryColor} /> */}

            {/* Back Button */}
            <div className="pt-2">
              <RouterLink
                href={paths.blog.root}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white border border-gray-500/12 hover:border-primary-main transition-all duration-200 hover:-translate-x-1 shadow-2xs"
              >
                <Iconify icon="solar:arrow-left-linear" width={18} />
                Back to all articles
              </RouterLink>
            </div>
          </div>

          {/* Sidebar (4 Columns) */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-24 flex flex-col gap-6">

              {/* Table of Contents */}
              <TableOfContentsWidget content={description} primaryColor={primaryColor} />

              {/* Recent Posts */}
              <div className="p-4 sm:p-5 rounded-3xl bg-white  border border-gray-500/12 shadow-2xs">
                <div className="flex flex-col gap-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-gray-500/12">
                    <div className="flex items-center gap-2">
                      <Iconify icon="solar:flame-bold" width={18} style={{ color: primaryColor }} />
                      <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                        Recent Posts
                      </h3>
                    </div>

                    <RouterLink
                      href={paths.blog.root}
                      className="text-xs text-gray-400 hover:text-primary-main font-medium"
                    >
                      View all
                    </RouterLink>
                  </div>

                  {/* Posts list */}
                  {blogsLoading ? (
                    <div className="flex flex-col gap-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-3 animate-pulse">
                          <div className="w-16 h-16 rounded-xl bg-gray-200 dark:bg-gray-700 shrink-0" />
                          <div className="flex flex-col gap-2 flex-1 py-1">
                            <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : recentBlogs.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {recentBlogs.map((recentBlog, index) => (
                        <RecentBlogCard
                          key={recentBlog.id || recentBlog.slug}
                          blog={recentBlog}
                          primaryColor={primaryColor}
                          index={index}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 text-center py-4">
                      No other posts available
                    </p>
                  )}
                </div>
              </div>

              {/* Newsletter Card */}
              {/* <SidebarNewsletterWidget primaryColor={primaryColor} /> */}

            </div>
          </div>
        </div>
      </div>

      {/* ── Related Articles Section ── */}
      {relatedBlogs.length > 0 && (
        <section className="py-12 border-t border-gray-500/12 bg-gray-50/50 /40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                  Related Articles
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Discover more story topics from our editorial collection
                </p>
              </div>

              <RouterLink
                href={paths.blog.root}
                className="group inline-flex items-center gap-1 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-primary-main transition-all"
              >
                <span>View all articles</span>
                <Iconify
                  icon="solar:arrow-right-linear"
                  width={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </RouterLink>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedBlogs.map((item) => (
                <article key={item.id || item.slug}>
                  <BlogItem
                    blog={item}
                    detailsHref={paths.blog.details(item.slug)}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );

  return (
    <>
      {isLoading && renderLoading()}
      {isBlogFound && renderBlog()}
      {isBlogMissing && renderError()}
    </>
  );
}