async function createReader(data = {}) {
  const url = "http://192.168.0.173:8080/api/createReader";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export default createReader;
