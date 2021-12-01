import { useEffect, useState } from "react";
import { List, Card } from "antd";

function BooksList() {
  const [booksData, setBooksData] = useState([]);
  const [activeAuthor, setActiveAuthor] = useState();
  const [authorBooks, setAuthorBooks] = useState();

  useEffect(() => {
    fetch("http://192.168.0.173:8080/book/getAll")
      .then((res) => {
        return res.json();
      })
      .then((booksList) => {
        setBooksData(booksList);
      });
  }, []);

  const getAllAuthorBooksHandler = (e) => {
    const authorName = e.target.lastChild.textContent;
    const authorQueryName = authorName.replace(" ", "_");
    setActiveAuthor(authorName);
    fetch(`http://192.168.0.173:8080/book/getByAuthor?name=${authorQueryName}`)
      .then((res) => {
        return res.json();
      })
      .then((authorBooksData) => {
        setAuthorBooks(authorBooksData);
      });
  };

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 4,
        xxl: 3,
      }}
      dataSource={authorBooks ? authorBooks : booksData}
      renderItem={(item) => (
        <List.Item>
          <Card
            hoverable
            style={{ width: 350 }}
            cover={
              <img
                alt="book card"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }>
            <div label="Title">{item.title}</div>
            <div label="Author" onClick={(e) => getAllAuthorBooksHandler(e)}>
              Author: {activeAuthor || item.authorName}
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
}

export default BooksList;
