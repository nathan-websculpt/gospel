import { useRef } from "react";
import { Address } from "../scaffold-eth";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

interface BookContractDDLProps {
  contractNames: ContractName[];
  clonedContractsAddresses: string[];
  setSelectedContract: Dispatch<String>;
}

export const BookContractDDL = ({
  contractNames,
  clonedContractsAddresses,
  setSelectedContract,
}: BookContractDDLProps) => {
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const closeDropdown = () => {
    dropdownRef.current?.removeAttribute("open");
  };
  useOutsideClick(dropdownRef, closeDropdown);

  return (
    <>
      {contractNames?.length > 1 && (
        <div className="flex flex-row flex-wrap w-full gap-2 px-6 pb-1 max-w-7xl lg:px-10">
          <details ref={dropdownRef} className="leading-3 dropdown dropdown-right">
            <summary tabIndex={0} className="btn btn-secondary btn-sm shadow-md dropdown-toggle gap-0 !h-auto">
              Select Clone Contract
              <ChevronDownIcon className="w-4 h-6 ml-2 sm:ml-0" />
            </summary>
            <ul className="dropdown-content menu z-[100] p-2 mt-2 shadow-center shadow-accent bg-base-200 rounded-box gap-1">
              {clonedContractsAddresses?.map(address => (
                <li
                  key={address}
                  onClick={() => {
                    setSelectedContract(address);
                    closeDropdown();
                  }}
                  onKeyUp={() => setSelectedContract(address)}
                >
                  <Address address={address} disableAddressLink={true} />
                </li>
              ))}
            </ul>
          </details>
        </div>
      )}
    </>
  );
};
