import { useContext } from "react";
import { PageHeader, Button } from "antd";
import styles from "./Header.module.scss";

import { AuthModalContext } from "../../hoc/AppContext";
import { UserInfoContext } from "../../hoc/AppContext";

function Header() {
  const { authModalDispatch } = useContext(AuthModalContext);
  const { userInfoState, userInfoDispatch } = useContext(UserInfoContext);

  const openModalHandler = (modalType) =>
    authModalDispatch({ type: "openModal", modalType: modalType });

  return (
    <PageHeader
      className={styles.header}
      onBack={() => null}
      title={
        userInfoState.isLogged
          ? `Welcome ${userInfoState.username}`
          : "Please log in account"
      }
      extra={
        userInfoState.isLogged ? (
          <Button
            key="3"
            data-signin
            onClick={() => {
              localStorage.removeItem("Authorization");
              userInfoDispatch({
                type: "isUserLogged",
                isLogged: false,
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
                openModalHandler("signin");
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
