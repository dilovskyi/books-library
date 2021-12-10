import { useContext } from "react";
import { Card, Button } from "antd";

import { BooksContext, UserInfoContext } from "../../../hoc/AppContext";

import { getAllAuthorBooksData } from "../../../services/getBooks";
import { reserveBook } from "../../../services/reserveBook";

function BookCard({ item }) {
  const { booksDispatch } = useContext(BooksContext);
  const { userInfoState } = useContext(UserInfoContext);
  const getAllAuthorBooksHandler = async (e) => {
    const authorName = e.target.lastChild.textContent;

    booksDispatch({
      type: "chosenAuthorBooksData",
      payload: await getAllAuthorBooksData(authorName),
    });
    booksDispatch({ type: "chosenAuthor", payload: authorName });
  };

  async function reserveBookHandler(event) {
    let button = null;

    if (event.target.tagName !== "BUTTON") {
      button = event.target.parentNode;
    } else {
      button = event.target;
    }

    const reservedBookId = button.getAttribute("data-book-id");

    reserveBook(reservedBookId, userInfoState.id)
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data));
  }

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
        <Button
          onClick={reserveBookHandler}
          type="primary"
          shape="round"
          size="small"
          data-book-id={item.id}>
          Read Book
        </Button>
        <Button
          type="primary"
          shape="round"
          size="small"
          data-book-id={item.id}>
          Reserve book
        </Button>
      </Card>
    </>
  );
}

export default BookCard;
