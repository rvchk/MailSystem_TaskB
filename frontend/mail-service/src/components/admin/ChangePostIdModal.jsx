import { Modal } from "react-bootstrap";
import CustomForm from "../CustomForm";
import { changeEmployeePostFormConfig } from "../../utils/formConfigs";
import { postOffices } from "../../utils/helpers";
import { getUsers } from "../../utils/api/requests/user/getUsers";
import { useEffect, useState } from "react";

export default function ChangePostIdModal({ show, onHide }) {
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
