import { useContext, useEffect } from "react";
import { PageHeader, Button } from "antd";
import styles from "./Header.module.scss";

import { AuthModalContext } from "../../hoc/AppContext";

function Header() {
  const { dispatch } = useContext(AuthModalContext);

  const openModalHandeler = (modalType) =>
    dispatch({ type: "openModal", modalType: modalType });

  return (
    <PageHeader
      className={styles.header}
      onBack={() => null}
      title="Title"
      subTitle="This is a subtitle"
      extra={[
        <Button key="3" data-signin onClick={() => openModalHandeler("signin")}>
          Login
        </Button>,
        <Button key="2" data-signup onClick={() => openModalHandeler("signup")}>
          Registration
        </Button>,
      ]}
    />
  );
}

export default Header;
