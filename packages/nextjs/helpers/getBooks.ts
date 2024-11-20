// with 5 books completed, I want to be able to work on new books without them popping up on the prod website (unfinished)
// hard-coding the onchain book ids until the other books are added

export const getBooks = (): object => {
  return {
    books: [
      {
        id: "0xdd644d6359663d5b3323f4369870ef0dfd0d13f53ca3ace2cd56b361eda6c83d77000000",
        index: "40",
        title: "Matthew",
        chapterCount: 28
      },
      {
        id: "0x08835a60b3a73d42f8b18d8850bbb1f5a9eccfe8e225b99a935fe29181d486bde2000000",
        index: "41",
        title: "Mark",
        chapterCount: 16
      },
      {
        id: "0xb5c543984275b51f7bd7db790088df44aa114fad7d3f363b76995b4f3992476fe4010000",
        index: "42",
        title: "Luke",
        chapterCount: 24
      },
      {
        id: "0x5dfd85215154dd41af211f5c091ff327c046a726eea11fd33793ecfa3d559a6596000000",
        index: "43",
        title: "John",
        chapterCount: 21
      },
      {
        id: "0xe9489006bfe1934333dd0bd5eb7415963b15f833bdec8dd07049daab65f3ec0372000000",
        index: "44",
        title: "Acts",
        chapterCount: 28
      },
    ],
  };
};
