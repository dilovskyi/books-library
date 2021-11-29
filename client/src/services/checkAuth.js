async function checkAuth(endpoint) {
  const url = process.env.REACT_APP_BOOKS_LIBRARY_API_URL + endpoint;
  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("Authorization"),
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export default checkAuth;
