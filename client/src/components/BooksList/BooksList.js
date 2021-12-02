import { useEffect, useState, useContext } from "react";
import { List, Card } from "antd";

import { BooksContext } from "../../hoc/AppContext";

import {
  getAllBooksData,
  getAllAuthorBooksData,
} from "../../services/getBooks";

function BooksList() {
  const { booksState, booksDispatch } = useContext(BooksContext);
  const { chosenAuthorBooksData, allBooksData } = booksState;

  useEffect(() => {
    (async () => {
      booksDispatch({ type: "allBooksData", payload: await getAllBooksData() });
    })();
  }, []);

  const getAllAuthorBooksHandler = async (e) => {
    const authorName = e.target.lastChild.textContent;

    booksDispatch({
      type: "chosenAuthorBooksData",
      payload: await getAllAuthorBooksData(authorName),
    });
    booksDispatch({ type: "chosenAuthor", payload: authorName });
  };

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
          <Card
            hoverable
            style={{ width: 350 }}
            cover={
              <img
                alt="book card"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }>
            <div label="Title">
              <h3>{item.title}</h3>
            </div>
            <div label="Author" onClick={(e) => getAllAuthorBooksHandler(e)}>
              Author: {item.authorName}
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
}

export default BooksList;
