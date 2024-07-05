import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Debug Contract",
  robots: { index: false, follow: false },
});

const Debug = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Debug;
