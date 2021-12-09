import { useEffect, useContext } from "react";
import { List } from "antd";

import { BooksContext } from "../../hoc/AppContext";

import BookCard from "./BookCard/BookCard";

import { getAllBooksData } from "../../services/getBooks";

function BooksList() {
  const { booksState, booksDispatch } = useContext(BooksContext);
  const { chosenAuthorBooksData, allBooksData } = booksState;

  useEffect(() => {
    (async () => {
      booksDispatch({ type: "allBooksData", payload: await getAllBooksData() });
    })();
  }, []);

  return (
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
        <List.Item>
          <BookCard item={item} />
        </List.Item>
      )}
    />
  );
}

export default BooksList;
