export const authModalInitialState = { isOpen: false, modalType: "signup" };

export function authModalReducer(state, action) {
  switch (action.type) {
    case "openModal":
      return { isOpen: true, modalType: action.modalType };
    case "closeModal":
      return { ...state, isOpen: false };
    case "toggleModalType":
      let modalType = state.modalType;
      if (modalType === "signup") {
        modalType = "signin";
      } else {
        modalType = "signup";
      }
      return { ...state, modalType: modalType };
    default:
      throw new Error();
  }
}
