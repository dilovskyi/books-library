export default async function getTopAuthors(from, limit) {
  let path = `http://192.168.0.173:8080/author/getTopAuthorsId?from=${
    from || 0
  }&limit=${limit || 3}`;

  return await fetch(path).then((data) => data.json());
}
