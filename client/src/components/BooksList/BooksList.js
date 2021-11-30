import { useEffect, useState } from "react";
import { List, Avatar } from "antd";

function BooksList() {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.173:8080/book/getAll")
      .then((res) => {
        return res.json();
      })
      .then((booksList) => {
        setBooksData(booksList);
      });
  }, []);

  return (
    <List
      itemLayout="horizontal"
      dataSource={booksData}
      renderItem={({ title, content }) => (
        <List.Item>
          <List.Item.Meta
            title={<a href="https://ant.design">{title}</a>}
            description={content}
          />
        </List.Item>
      )}
    />
  );
}

export default BooksList;
