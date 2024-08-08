interface PaginationProps {
  pageNum: number;
  pageSize: number;
  setPageNum: (pn: number) => void;
  setPageSize: (ps: number) => void;
}

export const PaginationTop = ({ pageNum, pageSize, setPageNum, setPageSize }: PaginationProps) => {
  return (
    <>
      <div className="flex items-center justify-between sm:justify-around">
        <button
          disabled={!pageNum}
          className="text-sm btn btn-primary sm:text-md xl:text-xl"
          onClick={() => setPageNum(prev => prev - 1)}
          aria-label="Previous Page"
        >
          Prev
        </button>
        <div className="flex flex-col w-1/4 gap-3 sm:w-1/5 md:w-1/6">
          <span className="mx-auto text-sm font-bold sm:text-md xl:text-xl">Page {pageNum + 1}</span>
          <select
            // className="px-2 py-1 text-sm text-center sm:px-4 sm:py-2 sm:text-md xl:text-xl bg-primary focus-visible:outline-none focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-base-200"
            className="px-2 py-1 text-sm text-center rounded-none sm:px-4 sm:py-2 sm:text-md xl:text-xl btn btn-primary"
            onChange={event => setPageSize(parseInt(event.target.value))}
            value={pageSize.toString()}
            aria-label="Change Amount Returned"
          >
            <option value="100">Show 100</option>
            <option value="25">Show 25</option>
            <option value="10">Show 10</option>
          </select>
        </div>
        <button
          className="text-sm btn btn-primary sm:text-md xl:text-xl"
          onClick={() => setPageNum(prev => prev + 1)}
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </>
  );
};
