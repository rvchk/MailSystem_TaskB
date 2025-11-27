import { Modal } from "react-bootstrap";
import { sendTransaction } from "../../utils/api";
import CustomForm from "../CustomForm";
import { createParcelFormConfig } from "../../utils/formConfigs";

export default function CreateParcelModal({ show, onHide, postOffices, users }) {

  const handleSendParcel = async (formData) => {
    await sendTransaction("initiateSendParcel", {
      login: localStorage.getItem("login"),
      ...formData,
      currentDate: new Date().toLocaleDateString().split(".").join(""),
      dailyCount: "1"
    })

    alert("Создаем...")
  };

  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header>
        <Modal.Title className="mx-auto">Создать посылку</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomForm
          {...createParcelFormConfig(Object.entries(postOffices), users)}
          onSubmit={handleSendParcel}
        />
      </Modal.Body>
    </Modal>
  );
}
