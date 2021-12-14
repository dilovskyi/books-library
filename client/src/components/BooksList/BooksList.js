import { useEffect, useContext, useState } from "react";
import { List, Spin } from "antd";

import { BooksContext } from "../../hoc/AppContext";
import { UserInfoContext } from "../../hoc/AppContext";

import BookCard from "./BookCard/BookCard";

import { getAllBooksData } from "../../services/getBooks";

function BooksList() {
  const { booksState, booksDispatch } = useContext(BooksContext);
  const { userInfoState } = useContext(UserInfoContext);

  const [loadingStatus, setLoadingStatus] = useState(false);

  const { chosenAuthorBooksData, allBooksData } = booksState;

  //FIXME:
  useEffect(() => {
    (async () => {
      if (userInfoState.id) {
        booksDispatch({
          type: "allBooksData",
          payload: await getAllBooksData(userInfoState.id),
        });
        setLoadingStatus(true);
      }
    })();
  }, [userInfoState]);

  return (
    <>
      {loadingStatus ? (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 3,
          }}
          dataSource={chosenAuthorBooksData || allBooksData}
          renderItem={(item) => (
            <List.Item id={item.id}>
              <BookCard item={item} />
            </List.Item>
          )}
        />
      ) : (
        <Spin size="large" />
      )}
    </>
  );
}

export default BooksList;
