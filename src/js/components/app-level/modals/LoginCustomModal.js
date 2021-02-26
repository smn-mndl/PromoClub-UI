import React from "react";
import Modal from "antd/lib/modal/Modal";
import "./LoginCustomModal.scss";

const LoginModal = (props) => {
  return (
    <div className="login-modal-cont">
      <Modal
        className="login-modal"
        visible={true}
        onCancel={() => {
          props.closeModal(false);
        }}
        footer={null}
      >
        Please <span onClick={() => props.history.push("/login")}>Login</span>{" "}
        to your account or{" "}
        <span onClick={() => props.history.push("/signup")}>Register</span> to
        add to cart!
      </Modal>
    </div>
  );
};

export default LoginModal;
