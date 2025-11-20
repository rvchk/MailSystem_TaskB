import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { getUsers } from "../../utils/api/requests";
import { getUserRole } from "../../utils/helpers";
import { loginFormConfig } from "../../utils/formConfigs";
import CustomForm from "../CustomForm";

export default function AuthModal({ show, onHide }) {
  const [users, setUsers] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getUsersArray()
  }, [])

  const getUsersArray = async () => {
    const currentUsers = await getUsers(localStorage.getItem("confidentContractId"))
    setUsers(currentUsers)
  }

  const handleAuth = async (formData) => {
    const userLogin = formData.login.split(" ").slice(-1).join("")
    console.log(userLogin)
    const user = users.find(user => user.surname == userLogin)
    // if (user.password == formData.password) {
    alert("Вы вошли в аккаунт")
    localStorage.setItem("currentRole", getUserRole(user.userRole))
    localStorage.setItem("login", userLogin)
    navigate("/profile")

    // } else {
    //   setError("Неправильный пароль");
    // }
  };

  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header>
        <Modal.Title className="mx-auto">Вход в систему</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomForm
          {...loginFormConfig}
          onSubmit={handleAuth}
        />
      </Modal.Body>
    </Modal>
  );
}
