import { useEffect, useContext } from "react";
import { List, Spin } from "antd";

import { BooksContext, UserInfoContext } from "../../hoc/AppContext";

import BookCard from "./BookCard/BookCard";
import PagePagination from "../PagePagination/PagePagination";

import { getBooksDataByPage } from "../../services/getBooks";
import { getBooksReadingStatus } from "../../services/getBooksReadingStatus";

import { getAuthor } from "../../services/getAuthor";

import { defer, of, interval } from "rxjs";
import { forkJoin, timer, from, merge, zip, combineLatestAll, tap } from "rxjs";
import {
  mergeMap,
  map,
  take,
  toArray,
  dematerialize,
  switchMap,
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";

function BooksList() {
  const { booksState, booksDispatch } = useContext(BooksContext);
  const { userInfoState } = useContext(UserInfoContext);

  const {
    isLoaded,
    chosenAuthorBooksData,
    currentPageData,
    dataLengthLimit,
    currentListPage,
  } = booksState;

  // ----------------------------------------------------------------
  useEffect(() => {
    const authorData$ = (authorId) =>
      ajax.getJSON(
        `http://192.168.0.173:8080/author/getAuthor?authorId=${authorId}`
      );

    const currentPageData$ = ajax.getJSON(
      `http://192.168.0.173:8080/book/getByPage?page=${currentListPage}&limit=${dataLengthLimit}`
    );

    const subscription = currentPageData.map((bookData) => {
      return zip(of(bookData), authorData$(bookData.authorId))
        .pipe(
          map(([bookData, auhtorData]) => {
            return { bookData, auhtorData };
          })
        )
        .subscribe((data) => {
          console.log(data);
        });
    });

    return () => subscription.map((item) => item.unsubscribe());
  }, [currentPageData]);

  // ----------------------------------------------------------------

  useEffect(() => {
    // ----------------------------------------------------------------

    // const booksData$ = ajax.getJSON(
    //   `http://192.168.0.173:8080/book/getByPage?page=${currentListPage}&limit=${dataLengthLimit}`
    // );

    // const authorData$ = (authorId) =>
    //   ajax.getJSON(
    //     `http://192.168.0.173:8080/author/getAuthor?authorId=${authorId}`
    //   );

    // booksData$.pipe(map((item) => item)).subscribe((data) => {
    //   console.log(data);
    // });

    // authorData$(2).subscribe((data) => {
    //   // console.log(data);
    // });

    // currentPageData$
    //   .pipe(
    //     switchMap((booksArray) => {
    //       console.log(booksArray[0]);
    //       return booksArray.map((bookData) => {
    //         return authorData$(bookData.authorId).subscribe((data) => {});
    //       });
    //     })
    //   )
    //   .subscribe((data) => {
    //     console.log(data);
    //   });

    // ----------------------------------------------------------------

    // const booksData$ = ajax.getJSON(
    //   `http://192.168.0.173:8080/book/getByPage?page=${currentListPage}&limit=${dataLengthLimit}`
    // );
    // const bookAuthorIdArr = booksData$.pipe(
    //   map((book) => book.map((bookData) => bookData.authorId))
    // );

    // zip(
    //   ajax.getJSON(
    //     `http://192.168.0.173:8080/book/getByPage?page=${currentListPage}&limit=${dataLengthLimit}`
    //   ),
    //   ajax.getJSON(`http://192.168.0.173:8080/author/getAuthor?authorId=${2}`)
    // )
    //   .pipe(
    //     map(([booksArray, authorData]) => {
    //       return booksArray.map((bookData) => ({ bookData, authorData }));
    //     })
    //   )
    //   .subscribe((data) => console.log(data));

    // ----------------------------------------------------------------

    // const observ = ajax
    //   .getJSON(
    //     `http://192.168.0.173:8080/book/getByPage?page=${currentListPage}&limit=${dataLengthLimit}`
    //   )
    //   .pipe(
    //     mergeMap((booksArr) => {
    //       return booksArr.map((bookItem) => {
    //         const authorData = ajax.getJSON(
    //           `http://192.168.0.173:8080/author/getAuthor?authorId=${bookItem.authorId}`
    //         );
    //         return forkJoin({
    //           bookData: of(bookItem),
    //           auhtorData: authorData,
    //         });
    //       });
    //     })
    //   );

    // observ.subscribe((data) => {
    //   data.subscribe((data) => console.log(data));
    // });

    if (userInfoState.id) {
      (async () => {
        const data = await getBooksDataByPage(currentListPage, dataLengthLimit);
        booksDispatch({
          type: "currentPageData",
          payload: await data,
        });

        booksDispatch({
          type: "isLoaded",
          payload: true,
        });
      })();
    }
  }, [booksDispatch, currentListPage, userInfoState, dataLengthLimit]);

  useEffect(() => {
    if (currentPageData.length) {
      (async () => {
        const booksId = currentPageData.map((book) => book.id);
        booksDispatch({
          type: "currentPageDataReadingStatus",
          payload: await getBooksReadingStatus(booksId),
        });
      })();
    }
  }, [booksDispatch, currentPageData]);

  const actualData = chosenAuthorBooksData || currentPageData;

  return (
    <>
      {isLoaded ? (
        <>
          <PagePagination />
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
