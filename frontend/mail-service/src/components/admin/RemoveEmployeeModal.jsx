import { Modal } from "react-bootstrap";
import CustomForm from "../CustomForm";
import { deleteEmployeeFormConfig } from "../../utils/formConfigs";
import { useData } from "../../context/DataProvider";

export default function RemoveEmployeeModal({ show, onHide }) {
  const { users } = useData()
  const employees = users?.filter(user => user.userRole == "POST_OFFICE_EMPLOYEE")

  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header>
        <Modal.Title className="mx-auto">Удаление сотрудника</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomForm
          {...deleteEmployeeFormConfig(employees)}
          transactionMethod={"deleteEmployee"}
        />
      </Modal.Body>
    </Modal>
  );
}
