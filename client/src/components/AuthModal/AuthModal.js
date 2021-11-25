import { Modal } from "antd";

import { useContext } from "react";
import { AuthModalContext } from "../../hoc/AppContext";

import SingInForm from "./AuthForm/AuthForm";

function AuthModal() {
  const { state, dispatch } = useContext(AuthModalContext);

  const closeHandler = () => dispatch({ type: "closeModal" });

  return (
    <>
      <Modal
        title={state.modalType}
        visible={state.isOpen}
        onOk={closeHandler}
        okText="Submit"
        onCancel={closeHandler}
        footer={null}
        destroyOnClose>
        <SingInForm />
      </Modal>
    </>
  );
}

export default AuthModal;
