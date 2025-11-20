import { Modal } from "react-bootstrap";
import CustomForm from "../CustomForm";
import { addEmployeeFormConfig } from "../../utils/formConfigs";
import { postOffices } from "../../utils/helpers";
import { getUsers } from "../../utils/api/requests/user/getUsers";
import { useEffect, useState } from "react";

export default function RegisterEmployeeModal({ show, onHide }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsersArray()
  }, [])

  const getUsersArray = async () => {
    const currentUsers = await getUsers(localStorage.getItem("confidentContractId"))
    setUsers(currentUsers)
  }

  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header>
        <Modal.Title className="mx-auto">Регистрация сотрудника</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomForm
          {...addEmployeeFormConfig(users, Object.entries(postOffices))}
          transactionMethod={"changeEmployeePostId"}
        />
      </Modal.Body>
    </Modal>
  );
}
