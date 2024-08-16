import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GQL_BOOKS_List } from "~~/helpers/getQueries";

interface BookDDLProps {
  selectedContract: string;
  setSelectedContract?: Dispatch<SetStateAction<string | null>>;
  setSelectedBookId: Dispatch<SetStateAction<string>>;
}

export const BookDDL = ({ selectedContract, setSelectedContract, setSelectedBookId }: BookDDLProps) => {
  const { loading, error, data } = useQuery(GQL_BOOKS_List());

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_BOOKS_List Query Error: ", error);
  }, [error]);

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setSelectedContract(data?.books[0].title);
      setSelectedBookId(data?.books[0].id);
      console.log("GQL_BOOKS_List Query DATA: ", data);
    }
  }, [data]);

  const changeContract = e => {
    setSelectedContract(e.target.value);
    setSelectedBookId(e.target.selectedOptions[0].getAttribute("data-bookid"));
  };

  return (
    <>
      {!loading && (
        <select
          className="w-32 px-2 py-2 mr-1 text-xs rounded-none sm:px-6 sm:py-2 sm:mr-2 sm:text-sm md:text-md lg:text-lg sm:w-44 btn btn-primary"
          value={selectedContract}
          onChange={changeContract}
          aria-label="Change Book"
        >
          {data?.books.map(b => (
            <option key={b.id} data-bookid={b.id} value={b.title}>
              {b.title}
            </option>
          ))}
        </select>
      )}
    </>
  );
};
