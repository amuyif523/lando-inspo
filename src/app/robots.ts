import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://amanuel.dev";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
