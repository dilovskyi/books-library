export const authModalInitialState = { isOpen: false };

export function authModalReducer(state, action) {
  switch (action.type) {
    case "open":
      return { isOpen: true };
    case "close":
      return { isOpen: false };
    default:
      throw new Error();
  }
}
