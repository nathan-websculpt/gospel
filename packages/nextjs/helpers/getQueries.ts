import { gql } from "@apollo/client";

//for the READ page (while dev is adding book)
export const GQL_VERSES_For_Display = () => {
  return gql`
    query ($limit: Int!, $offset: Int!) {
      verses(orderBy: verseId, orderDirection: asc, first: $limit, skip: $offset) {
        id
        verseId
        chapterNumber
        verseNumber
        verseContent
      }
    }
  `;
};

//for the READ page (after done uploading book - can search by chapter)
export const GQL_VERSES_For_Display_search_by_chapter = (chapterNumberInput: string, verseNumberInput: string) => {
  if (chapterNumberInput.trim().length !== 0 && verseNumberInput.trim().length !== 0)
    return gql`
      query ($limit: Int!, $offset: Int!, $searchByChapterNumber: String, $searchByVerseNumber: String) {
        verses(
          where: { and: [{ chapterNumber_gte: $searchByChapterNumber }, { verseNumber_gte: $searchByVerseNumber }] }
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
  else if (chapterNumberInput.trim().length !== 0)
    return gql`
      query ($limit: Int!, $offset: Int!, $searchByChapterNumber: String) {
        verses(
          where: { chapterNumber_gte: $searchByChapterNumber }
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
      query ($limit: Int!, $offset: Int!) {
        verses(orderBy: verseId, orderDirection: asc, first: $limit, skip: $offset) {
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
export const GQL_VERSES_For_Display_with_search = (searchInput: string) => {
  if (searchInput.trim().length === 0)
    return gql`
      query ($limit: Int!, $offset: Int!) {
        verses(orderBy: verseId, orderDirection: asc, first: $limit, skip: $offset) {
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
export const GQL_VERSES_For_Confirmation = (chapterInput: string, verseInput: string) => {
  if (verseInput === undefined || verseInput === null || isNaN(verseInput))
    return gql`
      query ($limit: Int!, $offset: Int!) {
        verses(orderBy: verseId, orderDirection: asc, first: $limit, skip: $offset) {
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
  else
    return gql`
      query ($limit: Int!, $offset: Int!, $searchByChapter: Int!, $searchByVerse: Int!) {
        verses(
          where: { and: [{ chapterNumber: $searchByChapter }, { verseNumber: $searchByVerse }] }
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

//for the FULLY CONFIRMED page
export const GQL_VERSES_Fully_Confirmed = () => {
  return gql`
    query ($limit: Int!, $offset: Int!) {
      verses(orderBy: verseId, orderDirection: asc, first: $limit, skip: $offset, where: { confirmed: true }) {
        id
        verseId
        chapterNumber
        verseNumber
        verseContent
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
