import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: [
        "/blockexplorer/",
        "/debug/",
        "/add/",
        "/donate-dev/",
        "/edit-mode/",
        "/fully-confirmed/",
        "/onchain-test/",
      ],
    },
    sitemap: ["https://www.gospelonchain.com/sitemap.xml"],
  };
}
