import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Donate to this project",
  description:
    "You can can support this project today! Become a part of history, help put the Bible on the blockchain.",
  imageRelativePath: "/twitter_card_read.jpg",
});

const DonatePageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default DonatePageLayout;
