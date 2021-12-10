import React, { useState, useEffect, useContext } from "react";
import { Drawer, Button, Space, List } from "antd";

import { getReaderHistory } from "../../services/getReaderHistory";

import { UserInfoContext } from "../../hoc/AppContext";

function ReaderProfile() {
  const [visible, setVisible] = useState(false);
  const { userInfoState, userInfoDispatch } = useContext(UserInfoContext);

  useEffect(() => {
    if (visible) {
      getReaderHistory(userInfoState.id)
        .then((res) => res.json())
        .then((data) => {
          userInfoDispatch({ type: "initUserHistory", payload: data });
        });
    }
  }, [visible]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          Profile
        </Button>
      </Space>
      <Drawer
        title="History"
        width={500}
        onClose={onClose}
        visible={visible}
        destroyOnClose
        extra={
          <Space>
            <Button
              onClick={() => {
                onClose();
                localStorage.removeItem("Authorization");
                userInfoDispatch({
                  type: "isUserLogged",
                  isLogged: false,
                });
              }}>
              Logout
            </Button>
          </Space>
        }>
        <List
          itemLayout="horizontal"
          dataSource={userInfoState.userHistory}
          renderItem={(
            { title, readingStatus, createdAt, updatedAt, bookId },
            index
          ) => {
            let timeArr = createdAt.split(" ");
            return (
              <List.Item>
                <List.Item.Meta
                  title={<a href="https://ant.design">Title:{title}</a>}
                  description={`Get Time: ${timeArr[0]}`}
                />

                <Button>
                  {readingStatus === "inRead"
                    ? "Return book"
                    : "Get One More Time"}
                </Button>
              </List.Item>
            );
          }}
        />
      </Drawer>
    </>
  );
}

export default ReaderProfile;
