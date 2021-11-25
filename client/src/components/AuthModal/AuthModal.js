import { Modal } from "antd";

import { useContext } from "react";
import { AuthModalContext } from "../../hoc/AppContext";

import AuthForm from "./AuthForm/AuthForm";

function AuthModal() {
  const { state, dispatch } = useContext(AuthModalContext);

  const closeHandler = () => dispatch({ type: "close" });

  return (
    <>
      <Modal
        title="Basic Modal"
        visible={state.isOpen}
        onOk={closeHandler}
        okText="Submit"
        onCancel={closeHandler}
        footer={null}
        //TODO:
        destroyOnClose>
        <AuthForm />
      </Modal>
    </>
  );
}

export default AuthModal;
