import { useEffect, useState } from "react";
import Link from "next/link";
import { ConfirmVerse } from "./ConfirmVerse";
import { useQuery } from "@apollo/client";
import { LoadingSpinner } from "~~/components/helpers/LoadingSpinner";
import { PaginationBottom } from "~~/components/helpers/PaginationBottom";
import { PaginationTop } from "~~/components/helpers/PaginationTop";
import { GQL_VERSES_For_Confirmation } from "~~/helpers/getQueries";

export const VersesList_Confirm = () => {
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);

  const { loading, error, data } = useQuery(GQL_VERSES_For_Confirmation(), {
    variables: {
      limit: pageSize,
      offset: pageNum * pageSize,
    },
    pollInterval: 6000, //no longer needs to poll
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_VERSES_For_Confirmation Query Error: ", error);
  }, [error]);

  useEffect(() => {
    if (data !== undefined && data !== null) console.log("GQL_VERSES_For_Confirmation Query DATA: ", data);
  }, [data]);

  return (
    <>
      <div className="flex self-center w-full">
        <article className="px-4 mx-auto mt-8 prose mb-14 lg:prose-lg md:px-0">
          <h2 className="text-center">Want to confirm a verse?</h2>
          <h3 className="text-center prose-h4:">Please verify the text against the original</h3>
          <h4 className="text-center">
            You can confirm verses for pennies on
            <span> </span>
            <Link href="https://www.optimism.io/" passHref className="link" target="_blank">
              Optimism
            </Link>{" "}
          </h4>
        </article>
      </div>
      <PaginationTop pageNum={pageNum} pageSize={pageSize} setPageNum={setPageNum} setPageSize={setPageSize} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {data?.verses?.map(verse => (
            <div key={verse.id.toString()} className="flex flex-row">
              <ConfirmVerse
                content={verse.verseContent}
                chapterNum={verse.chapterNumber}
                verseNum={verse.verseNumber}
                verseId={verse.id}
                confirmationCount={verse.confirmationCount}
                numericalId={BigInt(verse.verseId)}
              />
            </div>
          ))}
        </>
      )}

      <PaginationBottom pageNum={pageNum} setPageNum={setPageNum} />
    </>
  );
};
