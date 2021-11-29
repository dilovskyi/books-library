async function registration(data = {}, endpoint) {
  const url = process.env.REACT_APP_BOOKS_LIBRARY_API_URL + endpoint;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export default registration;
