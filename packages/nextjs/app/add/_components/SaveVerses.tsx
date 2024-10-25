import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { Abi } from "abitype";
import { useAccount, useWriteContract } from "wagmi";
import { GQL_BOOK_ID_By_Title } from "~~/helpers/getQueries";
import { useTransactor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { notification } from "~~/utils/scaffold-eth";

interface VerseProps {
  content: string[];
  chapterNum: bigint[];
  verseNum: bigint[];
  selectedContract: string;
  setSelectedContract: Dispatch<SetStateAction<string | null>>;
  selectedContractTitle: string;
  selectedBookId: string;
  setSelectedBookId: Dispatch<SetStateAction<string>>;
  deployedContractData: any; //todo:
}

export const SaveVerses = (_v: VerseProps) => {
  const client = useApolloClient();
  const { chain } = useAccount();
  const writeTxn = useTransactor();
  const { targetNetwork } = useTargetNetwork();
  const writeDisabled = !chain || chain?.id !== targetNetwork.id;

  const { data: result, isPending, writeContractAsync } = useWriteContract();

  const [data_onebook, setData_onebook] = useState({});
  const [queryLoading, setQueryLoading] = useState(true);

  useEffect(() => {
    if (_v.selectedContractTitle && _v.selectedContractTitle !== "") preQuery();
  }, [_v.selectedContractTitle]);
  useEffect(() => {
    console.log("data_onebook:", data_onebook);
    if (data_onebook && data_onebook?.books && data_onebook?.books?.length > 0)
      _v.setSelectedBookId(data_onebook?.books[0].id);
  }, [data_onebook]);

  const preQuery = async () => {
    setQueryLoading(true);
    // get all
    doQuery_basic({
      searchByBook: _v.selectedContractTitle,
    });
  };

  const doQuery_basic = async (options: object) => {
    await client
      .query({
        query: GQL_BOOK_ID_By_Title(),
        variables: options,
        fetchPolicy: "no-cache",
      })
      .then(d => {
        setData_onebook(d.data);
      })
      .catch(e => {
        console.log("GQL_BOOK_ID_By_Title QUERY ERROR: ", e);
      });
    setQueryLoading(false);
  };

  const writeAsync = async () => {
    if (writeDisabled) {
      notification.error("Chain/targetNetwork mismatch");
      return;
    }
    if (!_v.selectedBookId || _v.selectedBookId === "") {
      notification.error("There is no book ID (bytes subgraph id) selected");
      console.log(
        "There is no book ID (bytes subgraph id) selected - This is a query that should be automatically occurring",
      );
      return;
    }
    try {
      const args = [_v.selectedBookId, _v?.verseNum, _v?.chapterNum, _v?.content];

      const makeWriteWithParams = () =>
        writeContractAsync({
          address: _v.selectedContract,
          functionName: "addBatchVerses",
          abi: _v.deployedContractData.abi as Abi,
          args: args,
        });
      await writeTxn(makeWriteWithParams);
    } catch (e: any) {
      console.error("error from SaveVerses.tsx writeAsync()", e);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => writeAsync()}>
        BATCH SAVE ONCHAIN
      </button>
    </>
  );
};
