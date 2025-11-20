import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useFormState } from "../../utils/hooks/useFormState"
import { sendTransaction } from "../../utils/api";
import { getOffice, postOffices } from "../../utils/helpers/getOffice";

export default function CreateParcelModal({ show, onHide }) {
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
    parcelTo: 0,
    parcelType: "",
    parcelClass: "",
    parcelWeight: 0,
    parcelBlockchainTo: "",
    currentDate: "",
    dailyCount: "",
  });

  const validate = () => {
    if (
      !formData.parcelTo
      || !formData.parcelType
      || !formData.parcelClass
      || !formData.parcelWeight
      || !formData.parcelBlockchainTo
      || !formData.currentDate
      || !formData.dailyCount
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
      await sendTransaction("initiateSendParcel", formData)
      resetForm()
      setLoading(false)
      onHide()
    } catch (err) {
      alert("Такая фамилия уже есть", err)
      setLoading(false)
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="sm">
      <Modal.Header>
        <Modal.Title className="mx-auto">Отправка посылки</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="password">Получатель</Form.Label>
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
            <Form.Select
              onChange={handleInputChange}
              onBlur={validate}
              name="userAddress"
            >
              <option value="" selected disabled>Выберите адрес</option>
              {Object.entries(postOffices).map((office) => (
                <option key={getOffice(office)}>
                  {office[0]} {office[1]}
                </option>
              ))}
            </Form.Select>
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
