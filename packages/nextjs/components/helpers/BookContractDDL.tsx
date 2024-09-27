import { useRef } from "react";
import { Address } from "../scaffold-eth";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

interface BookContractDDLProps {
  listOfBookContracts: any[];
  setSelectedContract: Dispatch<String>;
  setSelectedContractTitle: Dispatch<String>;
}

export const BookContractDDL = ({ listOfBookContracts, setSelectedContract, setSelectedContractTitle }: BookContractDDLProps) => {
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const closeDropdown = () => {
    dropdownRef.current?.removeAttribute("open");
  };
  useOutsideClick(dropdownRef, closeDropdown);

  return (
    <>
      {listOfBookContracts?.length > 1 && (
        <div className="flex flex-row flex-wrap w-full gap-2 px-6 pb-1 max-w-7xl lg:px-10">
          <details ref={dropdownRef} className="leading-3 dropdown dropdown-right">
            <summary tabIndex={0} className="btn btn-secondary btn-sm shadow-md dropdown-toggle gap-0 !h-auto">
              Select Clone Contract
              <ChevronDownIcon className="w-4 h-6 ml-2 sm:ml-0" />
            </summary>
            <ul className="dropdown-content menu z-[100] p-2 mt-2 shadow-center shadow-accent bg-base-200 rounded-box gap-1">
              {listOfBookContracts?.map(b => (
                <li
                  key={b.bAddr}
                  onClick={() => {
                    setSelectedContract(b.bAddr);
                    setSelectedContractTitle(b.title);
                    closeDropdown();
                  }}
                  // onKeyUp={() => setSelectedContract(b.bAddr); setSelectedContractTitle(b.title);}
                >
                  <span>
                    {b.title} <Address address={b.bAddr} disableAddressLink={true} size="sm" format="short" />
                  </span>
                </li>
              ))}
            </ul>
          </details>
        </div>
      )}
    </>
  );
};
