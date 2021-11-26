import { useReducer, createContext } from "react";

import { authModalInitialState } from "../reducers/authModalReducer";
import { authModalReducer } from "../reducers/authModalReducer";

import { userInfoInitialState } from "../reducers/userInfoReducer";
import { userInfoReducer } from "../reducers/userInfoReducer";

export const AuthModalContext = createContext();
export const UserInfoContext = createContext();

function AppContext({ children }) {
  const [authModalState, authModalDispatch] = useReducer(
    authModalReducer,
    authModalInitialState
  );

  const [userInfoState, userInfoDispatch] = useReducer(
    userInfoReducer,
    userInfoInitialState
  );

  return (
    <>
      <AuthModalContext.Provider
        value={{ state: authModalState, dispatch: authModalDispatch }}>
        <UserInfoContext.Provider value={{ userInfoState, userInfoDispatch }}>
          {children}
        </UserInfoContext.Provider>
      </AuthModalContext.Provider>
    </>
  );
}

export default AppContext;
