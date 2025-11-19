import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { getUsers } from "../../utils/api/requests";
import { getUserRole } from "../../utils/helpers";
import { useFormState } from "../../utils/hooks/useFormState"

export default function AuthModal({ show, onHide }) {
  const [users, setUsers] = useState([])
  const navigate = useNavigate();

  const {
    formData,
    error,
    setError,
    handleInputChange,
    resetForm
  } = useFormState({
    login: "",
    password: ""
  });

  const validate = () => {
    if (!formData.login) {
      setError("Выберите логин");
      return formData.login;
    }
    if (!formData.password) {
      setError("Напишите пароль");
      return formData.password;
    }
    setError("");
    return true;
  };

  useEffect(() => {
    validate()
    getUsersArray()
  }, [])

  const getUsersArray = async () => {
    const currentUsers = await getUsers(localStorage.getItem("confidentContractId"))
    setUsers(currentUsers)
  }

  const auth = async (e) => {
    e.preventDefault();
    const userLogin = formData.login.split(" ").slice(-1).join("")
    const user = users.find(user => user.surname == userLogin)
    // if (user.password == formData.password) {
    alert("Вы вошли в аккаунт")
    localStorage.setItem("currentRole", getUserRole(user.userRole))
    localStorage.setItem("login", userLogin)
    navigate("/profile")

    resetForm()
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
        <Form>
          <Form.Group>
            <Form.Label htmlFor="address">Логин</Form.Label>
            <Form.Select
              onChange={handleInputChange}
              onBlur={validate}
              name="login"
            >
              <option value="" selected disabled>Выберите адрес</option>
              {users.map((user) => (
                <option key={user.userBlockchain}>
                  {getUserRole(user.userRole)} - {user.name} {user.surname}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="password">Пароль</Form.Label>
            <Form.Control
              className="w-100"
              type="text"
              name="password"
              onChange={handleInputChange}
              onBlur={validate}
              required
            />
          </Form.Group>
        </Form>
        {error && (
          <Alert className="mt-4" variant="danger">
            {error}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          disabled={error}
          onClick={auth}
          className="w-100"
        >
          Задать пароль
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
