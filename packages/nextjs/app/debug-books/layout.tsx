import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Debug Contract Clones",
  robots: { index: false, follow: false },
});

const Debug = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Debug;
