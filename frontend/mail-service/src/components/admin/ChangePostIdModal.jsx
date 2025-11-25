import { Modal } from "react-bootstrap";
import CustomForm from "../CustomForm";
import { changeEmployeePostFormConfig } from "../../utils/formConfigs";

export default function ChangePostIdModal({ show, onHide, employees, postOffices }) {

  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header>
        <Modal.Title className="mx-auto">Изменить Адрес</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomForm
          {...changeEmployeePostFormConfig(employees, Object.entries(postOffices))}
          transactionMethod={"changeEmployeePostId"}
        />
      </Modal.Body>
    </Modal>
  );
}
