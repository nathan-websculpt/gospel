import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GQL_VERSE_Last_Added } from "~~/helpers/getQueries";
import { LoadingSpinner } from "~~/components/helpers/LoadingSpinner";

export const DiplayLastAdded = () => {
  const { loading, error, data } = useQuery(GQL_VERSE_Last_Added(), {
    pollInterval: 6000,
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_VERSE_Last_Added Query Error: ", error);
  }, [error]);

  useEffect(() => {
    if (data !== undefined && data !== null) console.log("GQL_VERSE_Last_Added Query DATA: ", data);
  }, [data]);

  if (loading) {
    return (      
      <LoadingSpinner />
    );
  } else if (data?.verses?.length > 0) {
    return (
      <>
        <div className="flex flex-row mb-12">
          <div className="px-6 pt-10 pb-8 mt-6 shadow-xl bg-primary sm:mx-auto sm:max-w-11/12 md:w-full sm:rounded-lg sm:px-10">
            <p className="mb-12 text-xl underline">LAST VERSE ADDED</p>
            <p className="text-md">
              {data?.verses[0].chapterNumber} : {data?.verses[0].verseNumber}
            </p>
            <p className="text-lg">{data?.verses[0].verseContent}</p>
          </div>
        </div>
      </>
    );
  } else {
    return (
        <>
        <div className="flex flex-row mb-12">
          <div className="px-6 pt-10 pb-8 mt-6 shadow-xl bg-primary sm:mx-auto sm:max-w-11/12 md:w-full sm:rounded-lg sm:px-10">
            <p className="mb-12 text-xl underline">NO VERSES ADDED, YET.</p>
          </div>
        </div>
        </>
    )
  }
};
