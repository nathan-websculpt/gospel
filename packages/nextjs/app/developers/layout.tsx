import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Developers Section",
  description:
    "View new features, see open source code, debug, and test here.",
  robots: { index: true, follow: false },
  canonicalRelativePath: "/developers",
  keywords: "developers, debug, test, onchain, gospel"
});

const AddVersesPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AddVersesPageLayout;
