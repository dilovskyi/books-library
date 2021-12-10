export async function reserveBook(bookId, readerId) {
  const data = await fetch(
    `http://192.168.0.173:8080/reader/reserveBook?reader=${readerId}`,
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId, readerId }),
    }
  );
  return data;
}
