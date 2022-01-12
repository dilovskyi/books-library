export const booksInitialState = {
  chosenAuthor: null,
  chosenAuthorBooksData: null,
  chosenAuthorBooksDataLength: 0,
  currentPageData: [],
  currentPageDataReadingStatus: [],
  totalDataLength: 0,
};

export function booksReducer(state, action) {
  switch (action.type) {
    case "chosenAuthorBooksData":
      return { ...state, chosenAuthorBooksData: action.payload };
    case "chosenAuthorBooksDataLength":
      return { ...state, chosenAuthorBooksDataLength: action.payload };
    case "chosenAuthor":
      return { ...state, chosenAuthor: action.payload };
    case "currentPageData":
      return { ...state, currentPageData: action.payload };
    case "currentPageDataReadingStatus":
      return { ...state, currentPageDataReadingStatus: action.payload };
    case "totalDataLength":
      return { ...state, totalDataLength: action.payload };
    default:
      throw new Error();
  }
}
