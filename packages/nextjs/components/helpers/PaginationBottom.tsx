import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  pageNum: number;
  setPageNum: (pn: number) => void;
}

export const PaginationBottom = ({ pageNum, setPageNum }: PaginationProps) => {
  return (
    <>
      <div className="flex justify-end gap-3 mx-5 mt-5">
        <button className="btn btn-sm" disabled={!pageNum} onClick={() => setPageNum(0)}>
          <ArrowLeftIcon className="w-4 h-4" />
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        <span>...</span>
        <button className="btn btn-sm" disabled={!pageNum} onClick={() => setPageNum(prev => prev - 1)}>
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        <span className="self-center font-medium text-primary-content">Page {pageNum + 1}</span>
        <button className="btn btn-sm" onClick={() => setPageNum(prev => prev + 1)}>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
