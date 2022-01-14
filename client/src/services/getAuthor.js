export async function getAuthor(authorId) {
  const data = await fetch(
    `http://192.168.0.173:8080/author/getAuthor?authorId=${authorId}`
  );

  return data;
}
