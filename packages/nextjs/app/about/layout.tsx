import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "About Page",
  description:
    "Learn more about the project that stored the Bible on the blockchain | The blockchain is where texts like the Bible can be safe from censorship.",
  imageRelativePath: "/twitter_card_about.jpg",
  canonicalRelativePath: "/about",
  keywords: "about, bible, blockchain, project, gospel, onchain",
});

const AboutPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AboutPageLayout;
