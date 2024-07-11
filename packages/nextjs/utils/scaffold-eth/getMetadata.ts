import type { Metadata } from "next";

export const getMetadata = ({
  title,
  description,
  imageRelativePath = "/thumbnail.jpg",
  robots = null,
  canonicalRelativePath = "/",
  keywords = null,
}: {
  title: string;
  description: string;
  imageRelativePath?: string;
  robots?: null | string | Robots;
  canonicalRelativePath?: string;
  keywords?: null | string;
}): Metadata => {
  // const baseUrl = process.env.VERCEL_URL
  //   ? `https://${process.env.VERCEL_URL}`
  //   : `http://localhost:${process.env.PORT || 3000}`;
  // you would have to be authenticated in vercel to see this, won't work for socials
  const baseUrl = "https://www.gospelonchain.com";
  const imageUrl = `${baseUrl}${imageRelativePath}`;
  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: imageUrl,
        },
      ],
    },
    twitter: {
      title: title,
      description: description,
      images: [imageUrl],
    },
    robots: robots,
    alternates: {
      canonical: baseUrl + canonicalRelativePath,
    },
  };
};
