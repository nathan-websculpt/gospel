import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Search Onchain Bible",
  description:
    "Search for Bible verses on the blockchain. The KJV Bible is fully-functional onchain | Try searching for the word: beginning",
  imageRelativePath: "/twitter_card_search.jpg",
  canonicalRelativePath: "/search",
  keywords: "search, bible, blockchain, gospel, onchain"
});

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default SearchLayout;
