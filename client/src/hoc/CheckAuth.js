import { useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";

import checkAuth from "../services/checkAuth";
import { UserInfoContext } from "./AppContext";

function CheckAuth({ children }) {
  const { userInfoDispatch } = useContext(UserInfoContext);
  useEffect(() => {
    (async function () {
      return await checkAuth("reader/checkAuth").then((res) => {
        if (res.token) {
          //TODO: DRY
          localStorage.setItem("Authorization", res.token);
          userInfoDispatch({ type: "isUserLogged", isLogged: true });

          const decoded = jwt_decode(res.token);
          const { username, login, id, email } = decoded;

          userInfoDispatch({
            type: "setUserInfo",
            payload: { username, login, id, email },
          });
        } else {
          userInfoDispatch({ type: "isUserLogged", isLogged: false });
        }
      });
    })();
  }, []);
  return <>{children}</>;
}

export default CheckAuth;
