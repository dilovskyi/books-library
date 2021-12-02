import { useReducer, createContext } from "react";

import { authModalInitialState } from "../reducers/authModalReducer";
import { authModalReducer } from "../reducers/authModalReducer";

import { userInfoInitialState } from "../reducers/userInfoReducer";
import { userInfoReducer } from "../reducers/userInfoReducer";

import { booksInitialState } from "../reducers/booksReducer";
import { booksReducer } from "../reducers/booksReducer";

export const AuthModalContext = createContext();
export const UserInfoContext = createContext();
export const BooksContext = createContext();

function AppContext({ children }) {
  const [authModalState, authModalDispatch] = useReducer(
    authModalReducer,
    authModalInitialState
  );

  const [userInfoState, userInfoDispatch] = useReducer(
    userInfoReducer,
    userInfoInitialState
  );

  const [booksState, booksDispatch] = useReducer(
    booksReducer,
    booksInitialState
  );

  return (
    <>
      <AuthModalContext.Provider value={{ authModalState, authModalDispatch }}>
        <UserInfoContext.Provider value={{ userInfoState, userInfoDispatch }}>
          <BooksContext.Provider value={{ booksState, booksDispatch }}>
            {children}
          </BooksContext.Provider>
        </UserInfoContext.Provider>
      </AuthModalContext.Provider>
    </>
  );
}

export default AppContext;
