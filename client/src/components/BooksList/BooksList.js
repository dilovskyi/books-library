import { useEffect, useContext } from "react";
import { List, Spin } from "antd";

import { BooksContext, UserInfoContext } from "../../hoc/AppContext";

import BookCard from "./BookCard/BookCard";
import PagePagination from "../PagePagination/PagePagination";

import { getBooksDataByPage } from "../../services/getBooks";
import { getBooksReadingStatus } from "../../services/getBooksReadingStatus";

function BooksList() {
  const { booksState, booksDispatch } = useContext(BooksContext);
  const { userInfoState } = useContext(UserInfoContext);

  const {
    isLoaded,
    chosenAuthorBooksData,
    currentPageData,
    dataLengthLimit,
    currentListPage,
  } = booksState;

  useEffect(() => {
    if (userInfoState.id) {
      (async () => {
        const data = await getBooksDataByPage(currentListPage, dataLengthLimit);
        booksDispatch({
          type: "currentPageData",
          payload: await data,
        });

        booksDispatch({
          type: "isLoaded",
          payload: true,
        });
      })();
    }
  }, [booksDispatch, currentListPage, userInfoState, dataLengthLimit]);

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

  const actualData = chosenAuthorBooksData || currentPageData;

  return (
    <>
      {isLoaded ? (
        <>
          <PagePagination />
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
