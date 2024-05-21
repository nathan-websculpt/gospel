import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Read Gospel",
  description: "You can read the Gospel of John from Optimism Mainnet today | Did you know that you can also confirm verses onchain, so others can trust the text?",
  imageRelativePath: "/twitter_card_read.jpg",
});

const ReadLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ReadLayout;
