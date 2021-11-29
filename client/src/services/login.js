async function login(data, endpoint) {
  const url = process.env.REACT_APP_BOOKS_LIBRARY_API_URL + endpoint;
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export default login;
