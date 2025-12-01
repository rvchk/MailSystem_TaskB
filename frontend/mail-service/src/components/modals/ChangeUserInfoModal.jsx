import { Modal } from "react-bootstrap";
import CustomForm from "../CustomForm";
import { sendTransaction } from "../../utils/api";
import { useData } from "../../context/DataProvider";
import { editProfileFormConfig } from "../../utils/formConfigs";
import { postOffices } from "../../utils/helpers";

export default function ChangeUserInfoModal({ show, onHide }) {
  const { user } = useData()

  const handleSubmit = async (data) => {
    const mergedData = {
      name: data.name || user?.name,
      surname: data.surname || user?.surname,
      middleName: data.middleName || user?.middleName,
      adress: data.adress || String(user?.userAddress),
      password: data.password || user?.password,
    };
    await sendTransaction("updatePersonalData", mergedData);

    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header closeButton>
        <Modal.Title className="mx-auto">Изменить данные</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomForm
          fields={editProfileFormConfig(Object.entries(postOffices))}
          onSubmit={handleSubmit}
          submitText={"Изменить"}
        />
      </Modal.Body>
    </Modal>
  );
}