import { useContext, useEffect } from "react";
import { Pagination } from "antd";

import { BooksContext } from "../../hoc/AppContext";
import { ajax } from "rxjs/ajax";

function PagePagination({ defaultPage, onChangeHandler }) {
  const { booksState, booksDispatch } = useContext(BooksContext);
  const { chosenAuthorBooksDataLength, totalDataLength } = booksState;
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

  return (
    <div>
      <Pagination
        current={defaultPage}
        total={actualDataLength}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        onChange={onChangeHandler}
        showSizeChanger={false}
      />
    </div>
  );
}

export default PagePagination;
