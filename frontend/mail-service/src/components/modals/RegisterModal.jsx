import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useFormState } from "../../utils/hooks/useFormState"
import { sendTransaction } from "../../utils/api";

export default function RegisterModal({ show, onHide }) {
  const navigate = useNavigate();

  const {
    formData,
    error,
    setError,
    loading,
    setLoading,
    handleInputChange,
    resetForm
  } = useFormState({
    name: "",
    surname: "",
    middleName: "",
    password: "",
    userAddress: 0,
    userBalance: 0
  });

  const validate = () => {
    console.log(!formData.name
      || !formData.surname
      || !formData.middleName
      || !formData.password
      || !formData.userAddress
      || !formData.userBalance)
    if (
      !formData.name
      || !formData.surname
      || !formData.middleName
      || !formData.password
      || !formData.userAddress
      || !formData.userBalance
    ) {
      setError("Заполните все поля");
    } else setError('')
    return true;
  };

  useEffect(() => {
    validate()
  }, [])

  const register = async (e) => {
    e.preventDefault();
    setLoading(true)
    const userLogin = formData.login.split(" ").slice(-1).join("")
    try {
      await sendTransaction("register", formData)
      resetForm()
      localStorage.setItem("login", userLogin)
      setLoading(false)
      navigate("/profile")
    } catch (err) {
      alert("Такая фамилия уже есть", err)
      setLoading(false)
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header>
        <Modal.Title className="mx-auto">Регистрация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="password">Имя</Form.Label>
            <Form.Control
              className="w-100"
              type="text"
              name="name"
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
              name="surname"
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
              name="middleName"
              onChange={handleInputChange}
              onBlur={validate}
              required
            />
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
          <Form.Group>
            <Form.Label htmlFor="address">Адрес проживания</Form.Label>
            <Form.Control
              className="w-100"
              type="number"
              name="userAddress"
              onChange={handleInputChange}
              onBlur={validate}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="address">Баланс</Form.Label>
            <Form.Control
              className="w-100"
              type="number"
              name="userBalance"
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
          disabled={error || loading}
          onClick={register}
          className="w-100"
        >
          Зарегестрироваться
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
