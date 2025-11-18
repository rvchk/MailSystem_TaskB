import { useState } from "react";
import { transferFromManagement } from "../../utils/api/requests";
import { Button, Form, Modal } from "react-bootstrap";
import { getDepartments } from "../../utils/helpers";

export default function FundTransferModal({ startup, show, onHide }) {
  const [formData, setFormData] = useState({
    department: "",
    percentage: "",
  });

  const departments = getDepartments(startup);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const transferToDepartment = async () => {
    await transferFromManagement(
      startup.address,
      formData.department,
      formData.percentage,
    );
    location.reload();
  };

  const isFormValid = formData.department && formData.percentage;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title className="mx-auto">Передача средств</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Департамент</Form.Label>
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
            <Form.Label>Процент от бюджета</Form.Label>
            <Form.Control
              type="number"
              name="percentage"
              value={formData.percentage}
              onChange={handleInputChange}
              min="0"
              max="100"
              placeholder="Введите процент (0-100)"
              required
            />
            <Form.Text className="text-muted">
              Введите процент от бюджета департамента
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={transferToDepartment}
          variant="primary"
          type="submit"
          disabled={!isFormValid}
          className="w-100"
        >
          Выдать
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
