import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GQL_BOOKS_List } from "~~/helpers/getQueries";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface VerseProps {
  bookId: string;
  content: string[];
  chapterNum: bigint[];
  verseNum: bigint[];
}

export const SaveVerses = (_v: VerseProps) => {
  const [selectedContract, setSelectedContract] = useState("");
  const [selectedBookId, setSelectedBookId] = useState("");

  const { writeContractAsync: writeToJohn } = useScaffoldWriteContract("John");
  const { writeContractAsync: writeToMark } = useScaffoldWriteContract("Mark");

  const { loading, error, data } = useQuery(GQL_BOOKS_List());

  useEffect(() => {
    console.log("Selected contract changed to:", selectedContract);
  }, [selectedContract]);

  useEffect(() => {
    console.log("Selected book ID changed to:", selectedBookId);
  }, [selectedBookId]);

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

  const writeAsync = async () => {
    try {
      const args = [selectedBookId, _v?.verseNum, _v?.chapterNum, _v?.content];
      const contractCall = {
        functionName: "addBatchVerses",
        args: args,
      };

      if (selectedContract === "Mark") {
        await writeToMark(contractCall);
      } else {
        await writeToJohn(contractCall);
      }
    } catch (e) {
      console.error("Error calling addBatchVerses on contract:", e);
    }
  };

  const changeContract = (e) => {
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

      <button className="btn btn-primary" onClick={() => writeAsync()}>
        BATCH SAVE ONCHAIN
      </button>
    </>
  );
};
