import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { sendTransaction } from "../../utils/api";
import CustomForm from "../CustomForm";
import { registerFormConfig } from "../../utils/formConfigs";
import { postOffices } from "../../utils/helpers";

export default function RegisterModal({ show, onHide }) {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {

    await sendTransaction("register", {
      ...formData,
      userAddress: parseInt(formData.userAddress.split(" ")[0])
    })
    localStorage.setItem("login", formData.middleName)
    navigate("/profile")
  };

  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header>
        <Modal.Title className="mx-auto">Регистрация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomForm
          {...registerFormConfig(Object.entries(postOffices))}
          onSubmit={handleRegister}
        />
      </Modal.Body>
    </Modal>
  );
}
