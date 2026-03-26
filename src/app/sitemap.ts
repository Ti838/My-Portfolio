import { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://timonbiswas.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/", "/about", "/skills", "/projects",
    "/experience", "/education", "/achievements",
    "/blog", "/contact",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
