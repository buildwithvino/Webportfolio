import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://vinothdeveloper.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // Block AI model training harvesters but allow search indexers
        userAgent: ["GPTBot", "Google-Extended", "Bytespider", "CCBot", "anthropic-ai", "cohere-ai"],
        disallow: "/",
      },
      {
        // Explicitly allow real-time AI search citation crawlers to index and credit content
        userAgent: ["OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot"],
        allow: "/",
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
