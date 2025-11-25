import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useFormState } from "../../utils/hooks/useFormState";
import { useData } from "../../context/DataProvider";
import { useEffect, useState } from "react";

export default function ChangeUserInfoModal({ show, onHide }) {
  const { user } = useData();
  const [isLoading, setIsLoading] = useState(true);

  const {
    formData,
    error,
    setError,
    handleInputChange,
    setFormData,
  } = useFormState({
    name: "",
    surname: "",
    middleName: "",
    password: "",
    adress: "",
  });

  useEffect(() => {
    if (show) {
      getUserInfo();
    }
  }, [show]);

  const getUserInfo = async () => {
    try {
      setIsLoading(true);
      // Обновляем форму данными пользователя
      setFormData({
        name: user.name || "",
        surname: user.surname || "",
        middleName: user.middleName || "",
        password: user.password || "",
        adress: user.userAddress || "",
      });
    } catch (error) {
      console.error("Error loading user:", error);
      setError("Ошибка загрузки данных пользователя");
    } finally {
      setIsLoading(false);
    }
  };

  const validate = () => {
    if (!formData.name?.trim()) {
      setError("Введите имя");
      return false;
    }
    if (!formData.surname?.trim()) {
      setError("Введите фамилию");
      return false;
    }
    if (!formData.password?.trim()) {
      setError("Введите пароль");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onHide();
    }
  };

  if (isLoading) {
    return (
      <Modal show={show} onHide={onHide} size="sm">
        <Modal.Body className="text-center">
          <div>Загрузка данных...</div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header closeButton>
        <Modal.Title className="mx-auto">Изменить данные</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="name">Имя</Form.Label>
            <Form.Control
              className="w-100"
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              onBlur={validate}
              required
            />
          </Form.Group>
          
          <Form.Group className="mt-3">
            <Form.Label htmlFor="surname">Фамилия</Form.Label>
            <Form.Control
              className="w-100"
              type="text"
              name="surname"
              value={formData.surname || ""}
              onChange={handleInputChange}
              onBlur={validate}
              required
            />
          </Form.Group>
          
          <Form.Group className="mt-3">
            <Form.Label htmlFor="middleName">Отчество</Form.Label>
            <Form.Control
              className="w-100"
              type="text"
              name="middleName"
              value={formData.middleName || ""}
              onChange={handleInputChange}
              onBlur={validate}
            />
          </Form.Group>
          
          <Form.Group className="mt-3">
            <Form.Label htmlFor="adress">Адрес</Form.Label>
            <Form.Control
              className="w-100"
              type="text"
              name="adress"
              value={formData.adress || ""}
              onChange={handleInputChange}
              onBlur={validate}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label htmlFor="password">Пароль</Form.Label>
            <Form.Control
              className="w-100"
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              onBlur={validate}
              required
            />
          </Form.Group>

          {error && (
            <Alert className="mt-4" variant="danger">
              {error}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            disabled={!!error || isLoading}
            className="w-100"
          >
            Сохранить изменения
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}