async function getReader(readerId) {
  const url = `http://192.168.0.173:8080/api/getReader/${readerId}`;
  return await fetch(url).then((res) => res.json());
}

export default getReader;
