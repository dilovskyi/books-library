import { useContext } from "react";
import { PageHeader, Button } from "antd";
import styles from "./Header.module.scss";

import { AuthModalContext } from "../../hoc/AppContext";
import { UserInfoContext } from "../../hoc/AppContext";

function Header() {
  const { dispatch } = useContext(AuthModalContext);
  const { userInfoState, userInfoDispatch } = useContext(UserInfoContext);

  const openModalHandeler = (modalType) =>
    dispatch({ type: "openModal", modalType: modalType });

  return (
    <PageHeader
      className={styles.header}
      onBack={() => null}
      title={
        userInfoState.isAuthenticated
          ? `Welcome ${userInfoState.username}`
          : "Please create account"
      }
      extra={
        userInfoState.isAuthenticated ? (
          <Button
            key="3"
            data-signin
            onClick={() => {
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
              onClick={() => openModalHandeler("signin")}>
              Login
            </Button>,
            <Button
              key="2"
              data-signup
              onClick={() => openModalHandeler("signup")}>
              Registration
            </Button>,
          ]
        )
      }
    />
  );
}

export default Header;
