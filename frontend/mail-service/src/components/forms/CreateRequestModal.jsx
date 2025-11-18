import { getDepartments } from "../../utils/helpers";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { sendRealisationRequest } from "../../utils/api/requests";
import { Modal } from "react-bootstrap";
import { useData } from "../../utils/DataProvider";
import { useFormState } from "../../utils/hooks/useFormState";
import { sendTransaction } from "../../utils/api/sendTransaction";

export default function CreateRequestModal({ show, onHide }) {
  const { startup } = useData();
  const {
    formData,
    loading,
    setLoading,
    error,
    setError,
    success,
    handleInputChange,
    resetForm
  } = useFormState({
    department: "",
    purpose: "",
    percentage: "",
    fromStartBalance: false,
  });

  const departments = getDepartments(startup);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (!startup?.address) {
        throw new Error("Адрес стартапа не найден");
      }
      await sendTransaction("sendRealisationRequest", formData)

      await sendRealisationRequest(
        startup.address,
        formData.department,
        formData.purpose,
        formData.percentage.toString(),
        formData.fromStartBalance.toString(),
      );

      resetForm()

    } catch (err) {
      setError(err.message || "Ошибка при отправке запроса");
    } finally {
      setLoading(false);
    }
  };

  const calculateAmount = () => {
    if (!formData.department || !formData.percentage) return 0;

    const selectedDept = departments.find(
      (dept) => dept.value === formData.department,
    );
    if (!selectedDept) return 0;

    const percentage = parseFloat(formData.percentage);
    if (isNaN(percentage)) return 0;

    return ((selectedDept.budget * percentage) / 100).toFixed(2);
  };

  const isFormValid =
    formData.department && formData.purpose && formData.percentage;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title className="mx-auto">Создание запроса</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Департамент *</Form.Label>
            <Form.Select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required
            >
              <option value="">Выберите департамент</option>
              {departments.map((dept) => (
                <option key={dept.value} value={dept.value}>
                  {dept.label} (Бюджет: {dept.budget} USD)
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Причина/цель использования средств</Form.Label>
            <Form.Select
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              required
            >
              <option value="" hidden>
                Выберите цель
              </option>
              <option value="realise">Реализация</option>
              <option value="getFinance">Дофинансирование</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Процент от бюджета</Form.Label>
            <Form.Control
              type="number"
              name="percentage"
              value={formData.percentage}
              onChange={handleInputChange}
              min="0"
              max="100"
              step="0.1"
              placeholder="Введите процент (0-100)"
              required
            />
            <Form.Text className="text-muted">
              Введите процент от бюджета департамента
            </Form.Text>
          </Form.Group>

          {formData.department && formData.percentage && (
            <Alert variant="info" className="mb-3">
              <strong>Расчетная сумма:</strong> {calculateAmount()} USD
              <br />
              <small>
                ({formData.percentage}% от{" "}
                {
                  departments.find((d) => d.value === formData.department)
                    ?.budget
                }{" "}
                USD)
              </small>
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="fromStartBalance"
              label="Списать со стартового баланса"
              checked={formData.fromStartBalance}
              onChange={handleInputChange}
            />
            <Form.Text className="text-muted">
              Если отмечено, средства будут списаны со стартового баланса вместо
              департаментского бюджета
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
          className="w-100"
        >
          {loading ? "Отправка..." : "Отправить запрос"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
