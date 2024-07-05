import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Onchain Test",
  robots: { index: false, follow: false },
});

const OnchainTestPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default OnchainTestPageLayout;
