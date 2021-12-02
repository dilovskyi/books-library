export const booksInitialState = {
  chosenAuthor: null,
  chosenAuthorBooksData: null,
  allBooksData: [],
};

export function booksReducer(state, action) {
  switch (action.type) {
    case "allBooksData":
      return { ...state, allBooksData: action.payload };
    case "chosenAuthorBooksData":
      return { ...state, chosenAuthorBooksData: action.payload };
    case "chosenAuthor":
      return { ...state, chosenAuthor: action.payload };
    default:
      throw new Error();
  }
}
