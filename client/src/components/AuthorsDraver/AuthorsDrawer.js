import { useState, useEffect } from "react";
import { Drawer, Button } from "antd";

import getTopAuthors from "../../services/getTopAuthors";

const AuthorsDrawer = () => {
  const [visible, setVisible] = useState(false);
  const [topAuthors, setTopAuthors] = useState([]);

  useEffect(() => {
    (async () => setTopAuthors(await getTopAuthors(3)))();
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Chose Author
      </Button>
      <Drawer
        title="Chose Author"
        placement="right"
        onClose={onClose}
        visible={visible}>
        {topAuthors.length !== 0
          ? topAuthors.map(({ booksTotal, username, authorId }) => {
              return (
                <div
                  key={authorId}
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}>
                  <a className="ant-dropdown-link">{username}</a>
                  <span>Books total: {booksTotal}</span>
                </div>
              );
            })
          : null}
      </Drawer>
    </>
  );
};

export default AuthorsDrawer;
