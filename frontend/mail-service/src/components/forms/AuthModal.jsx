import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setPassword } from "../../utils/api/requests";
import { Alert, Button, Form, Modal } from "react-bootstrap";

export default function AuthModal({ show, onHide }) {
  const [error, setError] = useState("Заполните все поля");
  const [isLoading, setLoading] = useState(false);
  const passwordRef = useRef();
  const startupRef = useRef();
  const navigate = useNavigate();

  const validate = () => {
    const startupAddress = startupRef.current.value;
    const managementPassword = passwordRef.current.value;

    if (!startupAddress) {
      setError("Заполните адрес");
      return startupAddress;
    }
    if (!managementPassword) {
      setError("Напишите пароль");
      return managementPassword;
    }
    setError("");
    return true;
  };

  const initStartup = async (e) => {
    e.preventDefault();

    const startupAddress = startupRef.current.value;
    const managementPassword = passwordRef.current.value;
    setLoading(true);

    await setPassword(startupAddress, managementPassword);

    localStorage.setItem("auth", true);

    setTimeout(async () => {
      setLoading(false);
      navigate("/profile");
      location.reload();
    }, 3000);
  };

  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header>
        <Modal.Title className="mx-auto">Авторизация стартапа</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label htmlFor="address">Адрес стартапа</Form.Label>
            <Form.Control
              type="text"
              id="address"
              ref={startupRef}
              onBlur={validate}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Пароль</Form.Label>
            <Form.Control
              type="text"
              id="password"
              ref={passwordRef}
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
          disabled={error || isLoading}
          onClick={initStartup}
          className="w-100"
        >
          {isLoading ? "Загрузка..." : "Задать пароль"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
