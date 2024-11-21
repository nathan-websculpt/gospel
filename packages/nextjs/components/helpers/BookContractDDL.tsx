import { useRef, useState } from "react";
import { Address } from "../scaffold-eth";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

interface BookContractDDLProps {
  listOfBookContracts: any[];
  selectedContract: String;
  setSelectedContract: Dispatch<String>;
  setSelectedContractTitle: Dispatch<String>;
}

export const BookContractDDL = ({
  listOfBookContracts,
  selectedContract,
  setSelectedContract,
  setSelectedContractTitle,
}: BookContractDDLProps) => {
  const [bookSelected, setBookSelected] = useState<string>("");
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
            <summary tabIndex={0} className="btn btn-primary btn-sm shadow-md dropdown-toggle gap-0 !h-auto">
              {bookSelected !== "" ? (
                <span>
                  {bookSelected}{" "}
                  {selectedContract && selectedContract !== "" && (
                    <span>
                      <Address
                        address={selectedContract}
                        disableAddressLink={true}
                        size="sm"
                        format="short"
                        disableCopyButton={true}
                      />
                    </span>
                  )}
                </span>
              ) : (
                <span>Select Book Contract</span>
              )}
              <ChevronDownIcon className="w-4 h-6 ml-2 sm:ml-0" />
            </summary>
            <ul className="dropdown-content menu z-[100] py-2 mt-2 shadow-center shadow-accent bg-base-200 rounded-box gap-1">
              <div className="overflow-y-auto max-h-96 overflow-x-clip">
                {listOfBookContracts?.map(b => (
                  <li
                    key={b.bookAddress}
                    onClick={() => {
                      setSelectedContract(b.bookAddress);
                      setSelectedContractTitle(b.title);
                      setBookSelected(b.title);
                      closeDropdown();
                    }}
                  >
                    <span>
                      {b.title}{" "}
                      <Address
                        address={b.bookAddress}
                        disableAddressLink={true}
                        size="sm"
                        format="short"
                        disableCopyButton={true}
                      />
                    </span>
                  </li>
                ))}
              </div>
            </ul>
          </details>
        </div>
      )}
    </>
  );
};
