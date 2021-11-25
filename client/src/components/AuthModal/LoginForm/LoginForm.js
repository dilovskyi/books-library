import { useContext } from "react";
import { AuthModalContext } from "../../../hoc/AppContext";

import { Form, Input, Button } from "antd";

import styles from "./LoginForm.module.scss";

function LoginForm() {
  // Set modal state.isOpen = false on click Cencel button
  const { state, dispatch } = useContext(AuthModalContext);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      layout="vertical"
      name="authForm"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your mail!",
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

      <Form.Item>
        <div className={styles.confirmLogIn}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button">
            Log in
          </Button>
          <span>
            Or{" "}
            <a
              href="!"
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: "toggleModalType" });
              }}>
              "register now!"
            </a>
          </span>
        </div>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
