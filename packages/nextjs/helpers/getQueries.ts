import { gql } from "@apollo/client";

// for the READ page (after done uploading book)
// initial query on page load
// and for Chapter DDL
export const GQL_VERSES_by_chapter = () => {
  return gql`
    query ($searchByBook: String, $searchByChapterNumber: Int) {
      verses(
        where: { book_: { id: $searchByBook }, chapterNumber: $searchByChapterNumber }
        orderBy: verseId
        orderDirection: asc
        first: 1000 #TODO:
        skip: 0 #TODO:
      ) {
        id
        verseId
        chapterNumber
        verseNumber
        verseContent
      }
    }
  `;
};

// PRODTODO: Read page needs to query where isFinalizeed is true to get production books

//used on read page
//so other queries have access to book titles
export const GQL_BOOK_TITLES = () => {
  return gql`
    query {
      books(orderBy: index, orderDirection: asc) {
        id
        index
        title
        chapterCount
      }
    }
  `;
};

// for the READ page
// used as part one;
// part two is GQL_VERSES_after_verseid
export const GQL_VERSEID_by_chapter_and_verse = () => {
  return gql`
    query ($searchByBook: String, $searchByChapterNumber: String, $searchByVerseNumber: String) {
      verses(
        where: {
          and: [
            { book_: { id: $searchByBook } }
            { chapterNumber: $searchByChapterNumber }
            { verseNumber: $searchByVerseNumber }
          ]
        }
      ) {
        verseId
      }
    }
  `;
};

// for the READ page
// used after a Numerical ID is acquired from
// GQL_VERSEID_by_chapter_and_verse
export const GQL_VERSES_after_verseid = () => {
  return gql`
    query ($limit: Int!, $offset: Int!, $searchByBook: String, $searchByNumericalVerseId: String) {
      verses(
        where: { and: [{ book_: { id: $searchByBook } }, { verseId_gte: $searchByNumericalVerseId }] }
        orderBy: verseId
        orderDirection: asc
        first: $limit
        skip: $offset
      ) {
        id
        verseId
        chapterNumber
        verseNumber
        verseContent
      }
    }
  `;
};

//for the SEARCH page
//used for all books
export const GQL_VERSES_For_Display_with_search_all_books = (searchInput: string) => {
  if (searchInput.trim().length === 0)
    return gql`
      query ($limit: Int!, $offset: Int!) {
        # verses(orderBy: verseId, orderDirection: asc, first: $limit, skip: $offset) {
        verses(orderBy: book__blockTimestamp, orderDirection: asc, first: $limit, skip: $offset) {
          id
          verseId
          chapterNumber
          verseNumber
          verseContent
        }
      }
    `;
  else
    return gql`
      query ($limit: Int!, $offset: Int!, $searchBy: String) {
        verses(
          where: { verseContent_contains_nocase: $searchBy }
          # orderBy: verseId
          orderBy: blockTimestamp
          orderDirection: asc
          first: $limit
          skip: $offset
        ) {
          id
          verseId
          chapterNumber
          verseNumber
          verseContent
        }
      }
    `;
};

//for the SEARCH page
//used for one book
export const GQL_VERSES_For_Display_with_search_one_book = (searchInput: string) => {
  if (searchInput.trim().length === 0)
    return gql`
      query ($limit: Int!, $offset: Int!, $searchByBook: String) {
        verses(
          where: { book_: { id: $searchByBook } }
          orderBy: verseId
          orderDirection: asc
          first: $limit
          skip: $offset
        ) {
          id
          verseId
          chapterNumber
          verseNumber
          verseContent
        }
      }
    `;
  else
    return gql`
      query ($limit: Int!, $offset: Int!, $searchByBook: String, $searchBy: String) {
        verses(
          where: { and: [{ book_: { id: $searchByBook } }, { verseContent_contains_nocase: $searchBy }] }
          orderBy: verseId
          orderDirection: asc
          first: $limit
          skip: $offset
        ) {
          id
          verseId
          chapterNumber
          verseNumber
          verseContent
        }
      }
    `;
};

//for the CONFIRMATION page
export const GQL_VERSES_For_Confirmation = () => {
  return gql`
    query ($limit: Int!, $offset: Int!, $searchByBook: String!) {
      verses(
        where: { book_: { id: $searchByBook } }
        orderBy: verseId
        orderDirection: asc
        first: $limit
        skip: $offset
      ) {
        id
        verseId
        chapterNumber
        verseNumber
        verseContent
        confirmationCount
        confirmations {
          confirmedBy
        }
      }
    }
  `;
};

//returns last verse added
//for use on the Add Verses page
export const GQL_VERSE_Last_Added = () => {
  return gql`
    query {
      verses(first: 1, orderBy: verseId, orderDirection: desc) {
        verseId
        chapterNumber
        verseNumber
        verseContent
      }
    }
  `;
};

//currently just need this for Book (bytes) ID from subgraph
export const GQL_BOOKS_List = () => {
  return gql`
    query {
      books(orderBy: index, orderDirection: asc) {
        id
        title
      }
    }
  `;
};

// for getting the Book (bytes) ID from subgraph
export const GQL_BOOK_ID_By_Title = () => {
  return gql`
    query ($searchByBook: String) {
      books(first: 1, where: { title: $searchByBook }) {
        id
      }
    }
  `;
};
