import { getAllProducts } from "@/api/product.server";

export default async function sitemap() {
  const products = await getAllProducts();
  const baseUrl = "https://www.rijalcotech.com";

  // Base product listing page
  const productPage = {
    url: `${baseUrl}/product`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  };

  // Individual product detail pages
  const productEntries = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [productPage, ...productEntries];
}
