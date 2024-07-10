import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Confirm Verses Onchain",
  description:
    "Want to confirm a verse? Just be sure that the text is the same as the original and state your claim onchain | Confirm verses for pennies on Optimism.",
  imageRelativePath: "/twitter_card_confirm.jpg",
  canonicalRelativePath: "/confirm",
  keywords: "confirm, verses, bible, blockchain, gospel, onchain"
});

const ConfirmLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ConfirmLayout;
