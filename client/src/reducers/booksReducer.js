export const booksInitialState = {
  chosenAuthor: null,
  chosenAuthorBooksData: null,
  allBooksData: [],
  currentPageData: [],
  currentPageDataReadingStatus: [],
};

export function booksReducer(state, action) {
  switch (action.type) {
    case "allBooksData":
      return { ...state, allBooksData: action.payload };
    case "chosenAuthorBooksData":
      return { ...state, chosenAuthorBooksData: action.payload };
    case "chosenAuthor":
      return { ...state, chosenAuthor: action.payload };
    case "currentPageData":
      return { ...state, currentPageData: action.payload };
    case "currentPageDataReadingStatus":
      return { ...state, currentPageDataReadingStatus: action.payload };
    default:
      throw new Error();
  }
}
