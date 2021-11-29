export const userInfoInitialState = {
  isAuthenticated: false,
  isLogged: localStorage.getItem("isLogged"),
  username: null,
  login: null,
  id: null,
  email: null,
};

export function userInfoReducer(state, action) {
  switch (action.type) {
    case "isUserAuth":
      return { ...state, isAuthenticated: action.isAuthenticated };
    case "isUserLogged":
      return { ...state, isLogged: action.isLogged };
    case "setUserInfo":
      return { ...state, ...action.payload };
    default:
      throw new Error();
  }
}
