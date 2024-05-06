import { useEffect, useState } from "react";
import { SaveVerse } from "./SaveVerse";
import { getGospelOfJohn } from "~~/helpers/John";
import { notification } from "~~/utils/scaffold-eth";

export const AddVerse = () => {
  const versesArray = getGospelOfJohn();
  const [selectedChapter, setSelectedChapter] = useState<string>(undefined);
  const [selectedVerse, setSelectedVerse] = useState<string>(undefined);
  const [selectedIndex, setSelectedIndex] = useState<number>(undefined);
  const [selectedVerseObject, setSelectedVerseObject] = useState<object>(undefined);

  useEffect(() => {
    if (selectedVerseObject !== undefined) {
      console.log("selected verse obj:", selectedVerseObject);
    }
  }, [selectedVerseObject]);

  useEffect(() => {
    if (selectedIndex !== undefined) {
      setSelectedChapter("");
      setSelectedVerse("");
      setSelectedVerseObject(versesArray[selectedIndex]);
    }
  }, [selectedIndex]);

  const getVerse = async () => {
    if (!selectedChapter || !selectedVerse) {
      notification.error("need a chapter AND verse selected to retrieve a verse.");
      return;
    }

    for (let i = 0; i < versesArray.length; i++) {
      if (versesArray[i].ChapterNumber.toString() === selectedChapter) {
        if (versesArray[i].VerseNumber.toString() === selectedVerse) {
          setSelectedIndex(i);
          return;
        }
      }
    }
  };

  const getNextVerse = async () => {
    setSelectedIndex(selectedIndex + 1);
  };

  return (
    <>
      <p>choose where to start</p>
      <div className="flex flex-row justfy-between">
        <input
          placeholder="chapter number"
          className="w-3/4 input input-bordered input-accent"
          value={selectedChapter}
          onChange={e => setSelectedChapter(e.target.value)}
        />

        <input
          placeholder="verse number"
          className="w-3/4 input input-bordered input-accent"
          value={selectedVerse}
          onChange={e => setSelectedVerse(e.target.value)}
        />

        <button className="btn btn-primary" onClick={() => getVerse()}>
          GET VERSE
        </button>
      </div>

      <div className="px-6 pt-10 pb-8 mt-6 shadow-xl bg-primary sm:mx-auto sm:max-w-11/12 md:w-full sm:rounded-lg sm:px-10">
        {selectedVerseObject !== undefined && (
          <>
            <p className="text-lg">{selectedVerseObject?.FullVerseChapter}</p>
            <p className="text-2xl">{selectedVerseObject?.VerseContent}</p>
            <p className="text-sm">STRING LENGTH: {selectedVerseObject?.StringLength}</p>
          </>
        )}
      </div>


      <div className="mt-6 mb-6">
        <button className="btn btn-primary" onClick={() => getNextVerse()}>
          GET NEXT
        </button>
      </div>
      
      <hr />

      <div className="mt-32">
        {selectedVerseObject !== undefined && (
          <>
            <SaveVerse
              content={selectedVerseObject?.VerseContent}
              chapterNum={BigInt(selectedVerseObject?.ChapterNumber)}
              verseNum={BigInt(selectedVerseObject?.VerseNumber)}
            />
          </>
        )}
      </div>
    </>
  );
};
