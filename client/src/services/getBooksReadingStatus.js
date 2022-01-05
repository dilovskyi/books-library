export async function getBooksReadingStatus(booksIdArray) {
  const url = `http://192.168.0.173:8080/book/getBooksReadingStatus`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booksIdArray),
  });
  return await response.json();
}
