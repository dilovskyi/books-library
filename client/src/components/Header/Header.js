import { useContext } from "react";
import { PageHeader, Button } from "antd";
import styles from "./Header.module.scss";

import { AuthModalContext } from "../../hoc/AppContext";
import { UserInfoContext } from "../../hoc/AppContext";

function Header() {
  const { dispatch } = useContext(AuthModalContext);
  const { userInfoState, userInfoDispatch } = useContext(UserInfoContext);

  const openModalHandler = (modalType) =>
    dispatch({ type: "openModal", modalType: modalType });

  return (
    <PageHeader
      className={styles.header}
      onBack={() => null}
      title={userInfoState.isLogged ? `Welcome` : "Please log in account"}
      extra={
        userInfoState.isLogged ? (
          <Button
            key="3"
            data-signin
            onClick={() => {
              localStorage.removeItem("isLogged");
              userInfoDispatch({
                type: "isUserLogged",
                isAuthenticated: false,
              });
            }}>
            Logout
          </Button>
        ) : (
          [
            <Button
              key="3"
              data-signin
              onClick={() => {
                if (localStorage.getItem("isAuthenticated")) {
                  localStorage.setItem("isLogged", true);
                  userInfoDispatch({
                    type: "isUserLogged",
                    isLogged: true,
                  });
                } else {
                  openModalHandler("signin");
                }
              }}>
              Login
            </Button>,
            <Button
              key="2"
              data-signup
              onClick={() => openModalHandler("signup")}>
              Registration
            </Button>,
          ]
        )
      }
    />
  );
}

export default Header;
