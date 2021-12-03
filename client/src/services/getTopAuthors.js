export default async function getTopAuthors(authorsCount) {
  let path = "http://192.168.0.173:8080/book/getTopAuthors";

  if (authorsCount) {
    path += `?count=${authorsCount}`;
  }

  return await fetch(path).then((data) => data.json());
}
