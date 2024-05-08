import { gql } from "@apollo/client";

//for the READ page (before done loading book)
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

//for the READ page (after done loading book)
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
      orderBy: verseId, orderDirection: asc, first: $limit, skip: $offset
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
    query ($limit: Int!, $offset: Int!) {
      verses(orderBy: verseId, orderDirection: asc, first: $limit, skip: $offset) {
        id
        verseId
        chapterNumber
        verseNumber
        verseContent
        confirmationCount
      }
    }
  `;
};
