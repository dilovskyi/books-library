import { useContext } from "react";
import { AuthModalContext } from "../../../hoc/AppContext";

import styles from "./AuthForm.module.scss";
import { Form, Input, Button, Select } from "antd";
const { Option } = Select;

function SingInForm() {
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
      {state.modalType === "signup" ? (
        <>
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
          </Form.Item>
        </>
      ) : null}
      {state.modalType === "signup" && (
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>
      )}
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
      {state.modalType === "signup" && (
        <Form.Item
          label="Confirm password"
          name="confirm-password"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
          ]}>
          <Input.Password />
        </Form.Item>
      )}
      <Form.Item>
        <div className={styles.confirmAuth}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button">
            {state.modalType === "signin" ? "Log in" : "Register"}
          </Button>
          <span>
            Or{" "}
            <a
              href="!"
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: "toggleModalType" });
              }}>
              {state.modalType === "signin" ? "register now!" : "log in!"}
            </a>
          </span>
        </div>
      </Form.Item>
    </Form>
  );
}

export default SingInForm;
