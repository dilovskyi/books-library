import { useContext } from "react";
import { AuthModalContext } from "../../../hoc/AppContext";
import { UserInfoContext } from "../../../hoc/AppContext";

import styles from "./RegistrationForm.module.scss";
import { Form, Input, Button } from "antd";

import createReader from "../../../services/createReader";

function RegistrationForm() {
  // Set modal state.isOpen = false on click Cencel button
  const { dispatch } = useContext(AuthModalContext);
  const { userInfoDispatch } = useContext(UserInfoContext);

  const onFinish = (values) => {
    new Promise(async (resolve, reject) => {
      resolve(await createReader(values));
    }).then((data) => {
      const { username, login } = data;
      userInfoDispatch({ type: "setUserInfo", username, login });
      userInfoDispatch({ type: "isUserLogged", isAuthenticated: true });
      dispatch({ type: "closeModal" });
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
      {/*TODO: 
      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
          },
        ]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={(e) => console.log(e.target.value)}
          allowClear>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.gender !== currentValues.gender
        }>
        {({ getFieldValue }) =>
          getFieldValue("gender") === "other" ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[
                {
                  required: true,
                },
              ]}>
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item> */}

      <Form.Item
        label="Login"
        name="login"
        rules={[{ required: true, message: "Please input your login!" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}>
        <Input />
      </Form.Item>

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

      <Form.Item
        label="Confirm password"
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
        ]}>
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <div className={styles.confirmRegistration}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button">
            Register
          </Button>
          <span>
            Or{" "}
            <a
              href="!"
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: "toggleModalType" });
              }}>
              log in!
            </a>
          </span>
        </div>
      </Form.Item>
    </Form>
  );
}

export default RegistrationForm;
