import { useEffect, useContext, useState } from "react";
import { List, Spin } from "antd";

import { BooksContext, UserInfoContext } from "../../hoc/AppContext";

import BookCard from "./BookCard/BookCard";
import PagePagination from "../PagePagination/PagePagination";

import { getBooksDataByPage } from "../../services/getBooks";
import { getBooksReadingStatus } from "../../services/getBooksReadingStatus";

function BooksList() {
  const { booksState, booksDispatch } = useContext(BooksContext);
  const { userInfoState } = useContext(UserInfoContext);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [listPage, setListPage] = useState(1);

  const { chosenAuthorBooksData, currentPageData } = booksState;

  useEffect(() => {
    if (userInfoState.id) {
      (async () => {
        const data = await getBooksDataByPage(userInfoState.id, listPage);
        booksDispatch({
          type: "currentPageData",
          payload: await data,
        });

        setLoadingStatus(true);
      })();
    }
  }, [booksDispatch, listPage, userInfoState]);

  useEffect(() => {
    if (currentPageData.length) {
      (async () => {
        const booksId = currentPageData.map((book) => book.id);
        booksDispatch({
          type: "currentPageDataReadingStatus",
          payload: await getBooksReadingStatus(booksId),
        });
      })();
    }
  }, [booksDispatch, currentPageData]);

  const setCurrentPageHandler = async (currentPage) => {
    setListPage(currentPage);
  };

  const actualData = chosenAuthorBooksData || currentPageData;

  return (
    <>
      {loadingStatus ? (
        <>
          <PagePagination
            defaultPage={listPage}
            onChangeHandler={setCurrentPageHandler}
          />
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
            dataSource={actualData}
            renderItem={(item) => (
              <List.Item id={item.id}>
                <BookCard item={item} />
              </List.Item>
            )}
          />
        </>
      ) : (
        <>
          <Spin size="large" />
        </>
      )}
    </>
  );
}

export default BooksList;
