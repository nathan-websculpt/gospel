import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Add Verses Onchain",
  robots: { index: false, follow: false },
});

const AddVersesPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AddVersesPageLayout;
