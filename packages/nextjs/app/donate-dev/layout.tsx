import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Dev Donate Page",
  description:
    "Dev donate page | Test donating directly to contract.",
    robots:{ index: false, follow: false,}
});

const DonatePageLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default DonatePageLayout;
