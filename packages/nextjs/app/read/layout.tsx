import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Read Gospel of John",
  description:
    "You can read the Gospel of John from Optimism Mainnet today | Are you interested in a blockchain Bible? Start reading now: In the beginning was the Word",
  imageRelativePath: "/twitter_card_read.jpg",
  canonicalRelativePath: "/read",
  keywords: "read, gospel, john, onchain, bible, blockchain",
});

const ReadLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ReadLayout;
