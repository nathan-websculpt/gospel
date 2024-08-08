import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  pageNum: number;
  setPageNum: (pn: number) => void;
  scrollTo: any | null | undefined;
}

export const PaginationBottom = ({ pageNum, setPageNum, scrollTo }: PaginationProps) => {
  const handleClick = thisPageNum => {
    setPageNum(thisPageNum);
    const thisScrollToSpot = scrollTo === null || scrollTo === undefined ? 0 : scrollTo.current.offsetTop - 10;
    window.scrollTo({ top: thisScrollToSpot, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex justify-end gap-3 mx-5 mt-5">
        <button
          className="btn btn-sm btn-primary"
          disabled={!pageNum}
          onClick={() => handleClick(0)}
          aria-labelledby="Page One"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        <span>...</span>
        <button
          className="btn btn-sm btn-primary"
          disabled={!pageNum}
          onClick={() => handleClick(pageNum - 1)}
          aria-labelledby="Previous Page"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        <span className="self-center font-medium text-primary-content">Page {pageNum + 1}</span>
        <button className="btn btn-sm btn-primary" onClick={() => handleClick(pageNum + 1)} aria-labelledby="Next Page">
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
