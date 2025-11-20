import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { sendTransaction } from "../../utils/api";
import CustomForm from "../CustomForm";
import { registerFormConfig } from "../../utils/formConfigs";

export default function RegisterModal({ show, onHide }) {
  const navigate = useNavigate();

  const handleRegister = async (e, formData) => {
    e.preventDefault();
    const userLogin = formData.login.split(" ").slice(-1).join("")

    await sendTransaction("register", {
      ...formData,
      userAddress: parseInt(formData.userAddress.split(" ")[0])
    })
    localStorage.setItem("login", userLogin)
    navigate("/profile")
  };

  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header>
        <Modal.Title className="mx-auto">Регистрация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomForm
          {...registerFormConfig}
          onSubmit={handleRegister}
        />
      </Modal.Body>
    </Modal>
  );
}
