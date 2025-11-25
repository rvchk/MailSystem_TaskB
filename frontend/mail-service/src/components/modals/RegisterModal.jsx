import { Modal } from "react-bootstrap";
import { sendTransaction } from "../../utils/api";
import CustomForm from "../CustomForm";
import { registerFormConfig } from "../../utils/formConfigs";
import { postOffices } from "../../utils/helpers";
import { useData } from "../../context/DataProvider";

export default function RegisterModal({ show, onHide }) {

  const { user } = useData();

  const handleRegister = async (formData) => {
    await sendTransaction("register", {
      ...formData,
      userAddress: formData.userAddress.split(" ")[0],
    })
    localStorage.setItem("login", formData.middleName)

    alert("Регистрация идет, ждите...")
    
    setInterval(async () => {
      if (user) location.reload()
    }, 2000);
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
