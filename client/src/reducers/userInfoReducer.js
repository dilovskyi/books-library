export const userInfoInitialState = {
  isAuthenticated: false,
  username: null,
  login: null,
};

export function userInfoReducer(state, action) {
  switch (action.type) {
    case "isUserLogged":
      return { ...state, isAuthenticated: action.isAuthenticated };
    case "setUserInfo":
      return { ...state, username: action.username, login: action.login };
    default:
      throw new Error();
  }
}
