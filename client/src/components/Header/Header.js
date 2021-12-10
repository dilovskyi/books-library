import { useContext } from "react";
import { PageHeader, Button, Tag } from "antd";
import styles from "./Header.module.scss";

import AuthorsDrawer from "../AuthorsDraver/AuthorsDrawer";
import ReaderProfile from "../ReaderProfile/ReaderProfile";

import { AuthModalContext } from "../../hoc/AppContext";
import { UserInfoContext } from "../../hoc/AppContext";
import { BooksContext } from "../../hoc/AppContext";

function Header() {
  const { authModalDispatch } = useContext(AuthModalContext);
  const { userInfoState, userInfoDispatch } = useContext(UserInfoContext);
  const { booksState, booksDispatch } = useContext(BooksContext);

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
          <div>
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
            <ReaderProfile />
          </div>
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
      }>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Tag
            closable
            visible={!!booksState.chosenAuthorBooksData}
            onClose={() =>
              booksDispatch({ type: "chosenAuthorBooksData", payload: null })
            }>
            {booksState.chosenAuthor}
          </Tag>
        </div>
        <AuthorsDrawer />
      </div>
    </PageHeader>
  );
}

export default Header;
