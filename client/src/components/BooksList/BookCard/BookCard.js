import { useContext, useState } from "react";
import { Card, Button, Result } from "antd";

import styled from "./BookCard.module.scss";

import { BooksContext, UserInfoContext } from "../../../hoc/AppContext";

import { getAllAuthorBooksData } from "../../../services/getBooks";
import { reserveBook } from "../../../services/reserveBook";
import { subscribeOnBook } from "../../../services/subscribeOnBook";

function BookCard({ item }) {
  const { booksDispatch } = useContext(BooksContext);
  const { userInfoState } = useContext(UserInfoContext);

  const [readingStatus, setReadingStatus] = useState(item.readingStatus);
  const [userReadingStatus, setUserReadingStatus] = useState(
    item.userReadingStatus || false
  );

  const [resultStatus, setResultStatus] = useState("");
  const [resultText, setResultText] = useState("");

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
          setResultText(data.message);
          setResultStatus("error");
        } else {
          setResultText("You successfully took the book");
          setResultStatus("success");
          setReadingStatus("inRead");
          setUserReadingStatus("inRead");
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
          setReadingStatus("waitingForRead");
        }
      });
  }

  const cardButtonHandler =
    readingStatus === "inRead" ? subscribeOnBookHandler : reserveBookHandler;

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
        <div label="Author" onClick={(e) => getAllAuthorBooksHandler(e)}>
          Author: {item.authorName}
        </div>
        <br />

        <Button
          onClick={(e) => {
            cardButtonHandler(e);
          }}
          type="primary"
          shape="round"
          size="small"
          data-book-id={item.id}>
          {!readingStatus || readingStatus === "readyForRead"
            ? "Read"
            : "Inform when appear"}
        </Button>

        {resultStatus && (
          <Result
            className={styled.resultBanner}
            status={resultStatus}
            title={resultText}
            // extra={
            //   <Button type="primary" key="console">
            //     Go Console
            //   </Button>
            // }
          />
        )}

        {userReadingStatus ? (
          <Result
            className={styled.resultBanner}
            status="info"
            title="You redding this book now"
            extra={
              <>
                <div label="Title">
                  <h3>{item.title}</h3>
                </div>
                <div
                  label="Author"
                  onClick={(e) => getAllAuthorBooksHandler(e)}>
                  Author: {item.authorName}
                </div>
                <Button
                  type="primary"
                  block
                  className={styled.resultDescription}>
                  Primary
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
