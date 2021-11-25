export const authModalInitialState = { isOpen: false, modalType: "signup" };

export function authModalReducer(state, action) {
  switch (action.type) {
    case "open":
      return { isOpen: true, modalType: action.modalType };
    case "close":
      return { ...state, isOpen: false };
    default:
      throw new Error();
  }
}
