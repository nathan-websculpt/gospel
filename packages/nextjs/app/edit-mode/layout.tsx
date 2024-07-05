import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Edit Mode",
  robots: { index: false, follow: false },
});

const EditModeLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default EditModeLayout;
