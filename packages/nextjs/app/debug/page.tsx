import { DebugContracts } from "./_components/DebugContracts";
import type { NextPage } from "next";

const Debug: NextPage = () => {
  return (
    <>
      <DebugContracts />
      <div className="p-10 mt-8 text-center bg-secondary">
        <h1 className="my-0 text-4xl">Debug Contracts</h1>
        <p className="text-neutral">
          You can debug & interact with your deployed contracts here.
          <br /> Check{" "}
          <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem] px-1">
            packages / nextjs / app / debug / page.tsx
          </code>{" "}
        </p>
      </div>
    </>
  );
};

export default Debug;
