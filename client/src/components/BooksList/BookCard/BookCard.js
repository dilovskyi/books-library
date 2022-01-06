import { useContext, useState, useEffect } from "react";
import { Card, Button, Result } from "antd";

import styled from "./BookCard.module.scss";

import { BooksContext, UserInfoContext } from "../../../hoc/AppContext";

import { getAuthorAllBooksData } from "../../../services/getBooks";
import { reserveBook } from "../../../services/reserveBook";
import { subscribeOnBook } from "../../../services/subscribeOnBook";

function BookCard({ item }) {
  const { booksState, booksDispatch } = useContext(BooksContext);
  const { userInfoState } = useContext(UserInfoContext);

  const [bookIdFromHistory, setBookIdFromHistory] = useState();
  const [resultStatus, setResultStatus] = useState();
  const [resultText, setResultText] = useState(" ");
  const [buttonText, setButtonText] = useState(" ");

  //FIXME:
  useEffect(() => {
    const { currentPageDataReadingStatus } = booksState;

    const bookInHistory = currentPageDataReadingStatus.find(
      (bookOnThePage) => bookOnThePage?.bookId === item.id
    );

    if (bookInHistory) {
      setBookIdFromHistory(bookInHistory.bookId);

      setResultStatus(
        bookInHistory.readerId === userInfoState.id ? "success" : "info"
      );

      setResultText(
        bookInHistory.readerId === userInfoState.id
          ? "You redding this book now"
          : "This book already in use"
      );
      setButtonText(
        bookInHistory.readerId === userInfoState.id
          ? "Return"
          : "Inform when appear"
      );
    }
  }, [booksState]);

  const getAllAuthorBooksHandler = async (e) => {
    const authorId = e.target.getAttribute("data-author-id");
    if (authorId) {
      const authorName = e.target.lastChild.textContent;

      booksDispatch({
        type: "chosenAuthorBooksData",
        payload: await getAuthorAllBooksData(authorId),
      });
      booksDispatch({ type: "chosenAuthor", payload: authorName });
    }
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
          setResultText(data.message);
          setResultStatus("error");
        } else {
          setBookIdFromHistory(item.id);
          setResultText("You successfully took the book");
          setResultStatus("success");
          setButtonText("Return");
        }
      });
  }

  async function subscribeOnBookHandler(event) {
    let button = null;

    if (event.target.tagName !== "BUTTON") {
      button = event.target.parentNode;
    } else {
      button = event.target;
    }

    const reservedBookId = button.getAttribute("data-book-id");

    subscribeOnBook(reservedBookId, userInfoState.id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          setResultText(data.message);
          setResultStatus("error");
        } else {
          setResultText("You successfully subscribe");
          setResultStatus("info");
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
        <div label="Title">
          <h3>{item.title}</h3>
        </div>
        <div
          onClick={(e) => getAllAuthorBooksHandler(e)}
          label="Author"
          data-author-id={item.authorId}>
          Author: {item.authorName}
        </div>
        <br />

        <Button
          onClick={reserveBookHandler}
          type="primary"
          shape="round"
          size="small"
          data-book-id={item.id}>
          Read
        </Button>

        {bookIdFromHistory === item.id ? (
          <Result
            className={styled.resultBanner}
            status={resultStatus}
            title={resultText}
            extra={
              <>
                <div label="Title">
                  <h3>{item.title}</h3>
                </div>
                <div
                  data-author-id={item.authorId}
                  label="Author"
                  onClick={(e) => getAllAuthorBooksHandler(e)}>
                  Author: {item.authorName}
                </div>
                <Button
                  onClick={subscribeOnBookHandler}
                  type="primary"
                  block
                  className={styled.resultDescription}>
                  {buttonText}
                </Button>
              </>
            }
          />
        ) : null}
      </Card>
    </>
  );
}

export default BookCard;
