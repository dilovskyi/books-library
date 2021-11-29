import { Modal } from "antd";

import { useContext } from "react";
import { AuthModalContext } from "../../hoc/AppContext";

import LoginForm from "./LoginForm/LoginForm";
import RegistrationForm from "./RegistrationForm/RegistrationForm";

function AuthModal() {
  const { authModalState, authModalDispatch } = useContext(AuthModalContext);

  const closeHandler = () => authModalDispatch({ type: "closeModal" });

  return (
    <>
      <Modal
        title={authModalState.modalType}
        visible={authModalState.isOpen}
        onOk={closeHandler}
        okText="Submit"
        onCancel={closeHandler}
        footer={null}
        destroyOnClose>
        {authModalState.modalType === "signin" ? (
          <LoginForm />
        ) : (
          <RegistrationForm />
        )}
      </Modal>
    </>
  );
}

export default AuthModal;
