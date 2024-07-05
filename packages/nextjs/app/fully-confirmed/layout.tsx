import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Fully-confirmed verses",
  robots: { index: false, follow: false },
});

const FullyConfirmedLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default FullyConfirmedLayout;
