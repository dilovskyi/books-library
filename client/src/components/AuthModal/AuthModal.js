import { useContext } from "react";

import { AuthModalContext } from "../../hoc/AppContext";

function AuthModal() {
  const { state, dispatch } = useContext(AuthModalContext);
  return <></>;
}

export default AuthModal;
