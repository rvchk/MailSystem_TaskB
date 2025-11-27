import { Modal } from "react-bootstrap";
import CustomForm from "../CustomForm";
import { addEmployeeFormConfig } from "../../utils/formConfigs";
import { sendTransaction } from "../../utils/api";

export default function RegisterEmployeeModal({ show, onHide, users, postOffices }) {
  
  const notEmployess = users?.filter(user => user.userRole == "USER")

  const handleRegisterEmployee = async (formData) => {
      await sendTransaction("registerEmployee", {
        ...formData,
        login: formData.login.split(" ")[0],
      })
    };
 
  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header>
        <Modal.Title className="mx-auto">Регистрация сотрудника</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomForm
          {...addEmployeeFormConfig(notEmployess, Object.entries(postOffices))}
          onSubmit={handleRegisterEmployee}
        />
      </Modal.Body>
    </Modal>
  );
}
