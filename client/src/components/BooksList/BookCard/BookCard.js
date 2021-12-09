import { useContext } from "react";
import { Card } from "antd";

import { BooksContext } from "../../../hoc/AppContext";

import { getAllAuthorBooksData } from "../../../services/getBooks";

function BookCard({ item }) {
  const { booksDispatch } = useContext(BooksContext);

  const getAllAuthorBooksHandler = async (e) => {
    const authorName = e.target.lastChild.textContent;

    booksDispatch({
      type: "chosenAuthorBooksData",
      payload: await getAllAuthorBooksData(authorName),
    });
    booksDispatch({ type: "chosenAuthor", payload: authorName });
  };

  return (
    <>
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
    </>
  );
}

export default BookCard;
