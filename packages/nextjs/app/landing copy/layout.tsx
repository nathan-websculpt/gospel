import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Landing Page",
//   description:
//     "Learn more about the project that aims to store the Gospels (and more) on the blockchain | The blockchain is where texts like the Bible could be safe from censorship.",
//   imageRelativePath: "/twitter_card_about.jpg",
//   canonicalRelativePath: "/about",
//   keywords: "about, bible, blockchain, project, gospel, onchain",
});

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default LandingPageLayout;
