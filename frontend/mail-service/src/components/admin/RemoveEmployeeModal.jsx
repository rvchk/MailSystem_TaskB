import { Modal } from "react-bootstrap";
import CustomForm from "../CustomForm";
import { deleteEmployeeFormConfig } from "../../utils/formConfigs";
import { getUsers } from "../../utils/api/requests/user/getUsers";
import { useEffect, useState } from "react";

export default function RemoveEmployeeModal({ show, onHide }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsersArray()
  }, [])

  const getUsersArray = async () => {
    const currentUsers = await getUsers(localStorage.getItem("confidentContractId"))
    setUsers(currentUsers)
  }

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
