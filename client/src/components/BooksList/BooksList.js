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

  const setCurrentPageHandler = async (currentPage) => {
    setListPage(currentPage);

    await getBooksDataByPage(userInfoState.id, currentPage).then((data) => {
      console.log(data);
      setCurrentPageData(data);
    });
  };

  const actualData = currentPageData || chosenAuthorBooksData || allBooksData;

  return (
    <>
      {loadingStatus ? (
        <>
          <PagePagination
            defaultPage={listPage}
            dataLength={allBooksData.length}
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
