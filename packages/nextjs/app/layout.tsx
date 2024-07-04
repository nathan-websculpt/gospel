import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/site-wide/ThemeProvider";
import "~~/styles/globals.css";

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : `http://localhost:${process.env.PORT || 3000}`;
// you would have to be authenticated in vercel to see this, won't work for socials
const baseUrl = "https://www.gospelonchain.com";
const imageUrl = `${baseUrl}/thumbnail.jpg`;

const title =
  process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
    ? "Gospel Onchain [" + process.env.NEXT_PUBLIC_VERCEL_ENV + "]"
    : "Gospel Onchain";
const titleTemplate = "%s | Gospel Onchain";
const description =
  "An endeavor to store the Gospels on the blockchain, where the text cannot be removed or altered | Gospel of John stored on Optimism in May of 2024.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: titleTemplate,
  },
  description,
  openGraph: {
    title: {
      default: title,
      template: titleTemplate,
    },
    description,
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [imageUrl],
    title: {
      default: title,
      template: titleTemplate,
    },
    description,
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
  },
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
