export async function getAllBooksData(readerId) {
  const data = await fetch(
    `http://192.168.0.173:8080/book/getAll?reader=${readerId}`
  )
    .then((res) => {
      return res.json();
    })
    .then((booksList) => {
      return booksList;
    });
  return data;
}

export async function getAuthorAllBooksData(authorId) {
  const data = await fetch(
    `http://192.168.0.173:8080/book/getByAuthor?authorId=${authorId}`
  )
    .then((res) => {
      return res.json();
    })
    .then((authorBooksData) => {
      return authorBooksData;
    });
  return data;
}

export async function getBooksDataByPage(readerId, currentPage) {
  const data = await fetch(
    `http://192.168.0.173:8080/book/getByPage?reader=${readerId}&page=${currentPage}`
  )
    .then((res) => {
      return res.json();
    })
    .then((booksList) => {
      return booksList;
    });
  return data;
}
