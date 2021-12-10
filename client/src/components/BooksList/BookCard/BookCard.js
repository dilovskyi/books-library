import { useContext, useState } from "react";
import { Card, Button, Alert } from "antd";

import styled from "./BookCard.module.scss";

import { BooksContext, UserInfoContext } from "../../../hoc/AppContext";

import { getAllAuthorBooksData } from "../../../services/getBooks";
import { reserveBook } from "../../../services/reserveBook";

function BookCard({ item }) {
  const { booksDispatch } = useContext(BooksContext);
  const { userInfoState } = useContext(UserInfoContext);

  const [alertType, setAlertType] = useState();
  const [userAlertText, setUserAlertText] = useState("");

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
      .then((data) => {
        if (data.message) {
          setUserAlertText(data.message);
          setAlertType("error");
        } else {
          setUserAlertText("You successfully took the book");
          setAlertType("info");
        }
      });
  }

  return (
    <>
      <Card
        hoverable
        className={styled.card}
        cover={
          <img
            alt="book card"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }>
        {userAlertText && (
          <Alert
            showIcon
            description={userAlertText}
            type={alertType}
            className={styled.alert}
          />
        )}
        <div label="Title">
          <h3>{item.title}</h3>
        </div>
        <div label="Author" onClick={(e) => getAllAuthorBooksHandler(e)}>
          Author: {item.authorName}
        </div>
        <br />
        {alertType === "error" ? (
          <a href="#">Notify when it appears</a>
        ) : (
          <Button
            onClick={reserveBookHandler}
            type="primary"
            shape="round"
            size="small"
            data-book-id={item.id}>
            Read Book
          </Button>
        )}
      </Card>
    </>
  );
}

export default BookCard;
