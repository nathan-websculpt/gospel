import React from "react";
import Link from "next/link";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Faucet } from "~~/components/scaffold-eth";
import { SwitchTheme } from "~~/components/site-wide/SwitchTheme";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <div className="min-h-0 px-1 py-5 mb-11 lg:mb-0">
      <div>
        <div className="fixed bottom-0 left-0 z-10 flex items-center justify-between w-full p-4 pointer-events-none">
          <div className="flex flex-col gap-2 pointer-events-auto md:flex-row">
            {isLocalNetwork && (
              <>
                <Faucet />
                <Link href="/blockexplorer" passHref className="gap-1 font-normal btn btn-primary btn-sm">
                  <MagnifyingGlassIcon className="w-4 h-4" />
                  <span>Block Explorer</span>
                </Link>
              </>
            )}
          </div>
          <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} />
        </div>
      </div>
      <div className="w-full">
        <ul className="w-full menu menu-horizontal">
          <div className="flex items-center justify-center w-full gap-2 text-sm">
            <div className="text-center">
              <a
                href="https://github.com/nathan-websculpt/gospel"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1"
              >
                Want to see the code? <span className="link">Project on Github</span>
              </a>
            </div>
            <span>·</span>
            <div className="text-center">
              <a
                href="https://optimistic.etherscan.io/address/0x29BB1313321dbA27Ad074DD6AD2943040319B439"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1"
              >
                Stored onto Optimism at <span className="link">Contract 0x29B...</span>
              </a>
            </div>
            <span>·</span>
            <div className="text-center">
              <a
                href="https://twitter.com/sculpt_web"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1"
              >
                Follow this developer on <span className="link">Twitter</span>
              </a>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
