import { Modal } from "antd";

import { useContext } from "react";
import { AuthModalContext } from "../../hoc/AppContext";

import LoginForm from "./LoginForm/LoginForm";
import RegistrationForm from "./RegistrationForm/RegistrationForm";

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
        {state.modalType === "signin" ? <LoginForm /> : <RegistrationForm />}
      </Modal>
    </>
  );
}

export default AuthModal;
