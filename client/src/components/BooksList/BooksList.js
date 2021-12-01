import { useEffect, useState } from "react";
import { List, Card } from "antd";

const { Meta } = Card;

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
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 4,
        xxl: 3,
      }}
      dataSource={booksData}
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
            <Meta
              description={`Author: ${item.authorName}`}
              title={item.title}
            />
          </Card>
        </List.Item>
      )}
    />
  );
}

export default BooksList;
