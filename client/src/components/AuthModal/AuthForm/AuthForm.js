import { Form, Input, Button, Checkbox, Space } from "antd";

import { useContext } from "react";
import { AuthModalContext } from "../../../hoc/AppContext";

function AuthForm() {
  // Set modal state.isOpen = false on click Cencel button
  const { dispatch } = useContext(AuthModalContext);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={() => dispatch({ type: "close" })}>
            Cencel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default AuthForm;
