import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useFormState } from "../../utils/hooks/useFormState"

export default function ChangeUserInfoModal({ show, onHide, user }) {

  const {
    formData,
    error,
    setError,
    handleInputChange,
  } = useFormState({
    name: user.name,
    surname: user.surname,
    middleName: user.middleName,
    password: user.password,
    adress: user.userAddress,
  });
  console.log(formData)

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

  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header>
        <Modal.Title className="mx-auto">Изменить данные</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="name">Имя</Form.Label>
            <Form.Control
              className="w-100"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={validate}
              required
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="password">Фамилия</Form.Label>
            <Form.Control
              className="w-100"
              type="text"
              name="password"
              onChange={handleInputChange}
              onBlur={validate}
              required
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="password">Отчество</Form.Label>
            <Form.Control
              className="w-100"
              type="text"
              name="password"
              onChange={handleInputChange}
              onBlur={validate}
              required
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="password">Адрес</Form.Label>
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
          className="w-100"
        >
          Задать пароль
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
