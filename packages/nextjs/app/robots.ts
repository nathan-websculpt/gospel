import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production")
    return {
      rules: {
        userAgent: "*",
        disallow: ["/"],
      },
    };
  else
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
