import { useEffect, useContext, useState } from "react";
import { List, Spin } from "antd";

import { BooksContext } from "../../hoc/AppContext";
import { UserInfoContext } from "../../hoc/AppContext";

import BookCard from "./BookCard/BookCard";
import PagePagination from "../PagePagination/PagePagination";

import { getAllBooksData, getBooksDataByPage } from "../../services/getBooks";

function BooksList() {
  const { booksState, booksDispatch } = useContext(BooksContext);
  const { userInfoState } = useContext(UserInfoContext);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [listPage, setListPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState();

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

  useEffect(() => {
    (async () => {
      await getBooksDataByPage(userInfoState.id, listPage).then((data) => {
        console.log(data);
        setCurrentPageData(data);
      });
    })();
  }, [listPage]);

  const setCurrentPageHandler = async (currentPage) => {
    setListPage(currentPage);
  };

  const actualData = chosenAuthorBooksData || allBooksData;

  return (
    <>
      {loadingStatus ? (
        <>
          <PagePagination
            defaultPage={listPage}
            dataLength={actualData.length}
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
            dataSource={currentPageData || actualData}
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
