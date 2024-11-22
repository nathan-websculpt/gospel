import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Read Bible Onchain",
  description:
    "You can read the Bible from Optimism Mainnet today | Are you interested in a blockchain Bible? Start reading now: In the beginning was the Word",
  imageRelativePath: "/twitter_card_read.jpg",
  canonicalRelativePath: "/read",
  keywords: "read, gospel, onchain, bible, blockchain",
});

const ReadLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ReadLayout;
