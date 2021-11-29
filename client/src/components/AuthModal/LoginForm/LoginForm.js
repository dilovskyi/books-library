import { useContext, useState } from "react";

import { AuthModalContext } from "../../../hoc/AppContext";
import { UserInfoContext } from "../../../hoc/AppContext";

import { Form, Input, Button, Alert } from "antd";
import styles from "./LoginForm.module.scss";

import login from "../../../services/login";
import jwt_decode from "jwt-decode";

function LoginForm() {
  // Set modal state.isOpen = false on click Cencel button
  const { authModalDispatch } = useContext(AuthModalContext);
  const { userInfoDispatch } = useContext(UserInfoContext);
  const [errorMessage, setErrorMessage] = useState();

  const onFinish = (values) => {
    new Promise(async (resolve, reject) => {
      resolve(await login(values, "reader/login"));
    }).then((res) => {
      if (res.message) {
        setErrorMessage(res.message);
      } else {
        //TODO: DRY
        localStorage.setItem("Authorization", res.token);
        const decoded = jwt_decode(res.token);
        const { username, login, id, email } = decoded;

        userInfoDispatch({
          type: "setUserInfo",
          payload: { username, login, id, email },
        });

        userInfoDispatch({ type: "isUserLogged", isLogged: true });
        authModalDispatch({ type: "closeModal" });
      }
    });
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
                authModalDispatch({ type: "toggleModalType" });
              }}>
              "register now!"
            </a>
          </span>
        </div>
      </Form.Item>

      {errorMessage && <Alert message={errorMessage} type="error" />}
    </Form>
  );
}

export default LoginForm;
