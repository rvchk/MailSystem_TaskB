import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { getUserRole } from "../../utils/helpers";
import { loginFormConfig } from "../../utils/formConfigs";
import CustomForm from "../CustomForm";
import { useData } from "../../context/DataProvider";

export default function AuthModal({ show, onHide }) {
  const { users } = useData()
  const navigate = useNavigate();

  const handleAuth = async (formData) => {
    const userLogin = formData.login.split(" ").slice(-1).join("")
    const user = users.find(user => user.surname == userLogin)
    if (user.password == formData.password) {
      alert("Вы вошли в аккаунт")
      localStorage.setItem("currentRole", getUserRole(user.userRole))
      localStorage.setItem("login", userLogin)
      navigate("/profile")
      location.reload()
    } else alert("Неправильный пароль")
  };

  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header>
        <Modal.Title className="mx-auto">Вход в систему</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustomForm
          {...loginFormConfig(users)}
          onSubmit={handleAuth}
        />
      </Modal.Body>
    </Modal>
  );
}
