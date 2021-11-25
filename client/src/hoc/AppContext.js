import { useReducer, createContext } from "react";
import { authModalInitialState } from "../reducers/authModalReducer";
import { authModalReducer } from "../reducers/authModalReducer";

export const AuthModalContext = createContext();

function AppContext({ children }) {
  const [authModalState, authModalDispatch] = useReducer(
    authModalReducer,
    authModalInitialState
  );

  return (
    <>
      <AuthModalContext.Provider
        value={{ state: authModalState, dispatch: authModalDispatch }}>
        {children}
      </AuthModalContext.Provider>
    </>
  );
}

export default AppContext;
