import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Search Gospel Onchain",
  description: "The Gospel of John is fully-functional onchain | You can read and search the text on Optimism Mainnet today | Try searching for the word: ‘light’.",
  imageRelativePath: "/twitter_card_search.jpg",
});

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default SearchLayout;