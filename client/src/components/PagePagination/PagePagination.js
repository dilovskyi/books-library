import { useContext, useEffect } from "react";
import { Pagination } from "antd";

import { BooksContext } from "../../hoc/AppContext";
import { ajax } from "rxjs/ajax";

function PagePagination() {
  const { booksState, booksDispatch } = useContext(BooksContext);
  const {
    chosenAuthorBooksDataLength,
    totalDataLength,
    dataLengthLimit,
    currentListPage,
  } = booksState;
  const actualDataLength = chosenAuthorBooksDataLength || totalDataLength;

  useEffect(() => {
    const booksData$ = ajax(
      "http://192.168.0.173:8080/book/getTotalDataLength"
    );
    booksData$.subscribe((data) => {
      booksDispatch({
        type: "totalDataLength",
        payload: data.response.booksTotal,
      });
    });
  }, []);

  function onChangeHandler(current, pageSize) {
    if (currentListPage !== current) {
      booksDispatch({
        type: "currentListPage",
        payload: current,
      });
    } else if (dataLengthLimit !== pageSize) {
      booksDispatch({
        type: "dataLengthLimit",
        payload: pageSize,
      });
    }
  }

  return (
    <div>
      <Pagination
        current={currentListPage}
        total={actualDataLength}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        onChange={onChangeHandler}
        onShowSizeChange={onChangeHandler}
        showSizeChanger
      />
    </div>
  );
}

export default PagePagination;
