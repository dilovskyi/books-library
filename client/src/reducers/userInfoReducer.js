export const userInfoInitialState = {
  isAuthenticated: false,
  isLogged: localStorage.getItem("isLogged"),
  username: null,
  login: null,
  id: null,
  email: null,
  userHistory: [],
};

export function userInfoReducer(state, action) {
  switch (action.type) {
    case "isUserAuth":
      return { ...state, isAuthenticated: action.isAuthenticated };
    case "isUserLogged":
      return { ...state, isLogged: action.isLogged };
    case "setUserInfo":
      return { ...state, ...action.payload };
    case "initUserHistory":
      return { ...state, userHistory: action.payload };
    // case "setUserHistory":
    //   const newHistory = state.userHistory;
    //   newHistory.push(action.payload);
    //   return { ...state, userHistory: newHistory };
    default:
      throw new Error();
  }
}
