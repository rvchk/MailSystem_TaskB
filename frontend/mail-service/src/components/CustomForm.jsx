import { Button, Form } from "react-bootstrap";
import { useRef, useState } from "react";

export default function CustomForm({
  fields,
  onSubmit,
  submitText = "Отправить",
}) {

  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formRef.current.checkValidity()) {
      return;
    }

    setLoading(true);

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    await onSubmit(data);
    formRef.current.reset();
    setLoading(false);
  };

  const renderField = (field) => {
    if (field.type == 'select') {
      return (
        <Form.Select name={field.name}>
          {field.options?.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Form.Select>
      );
    } else {
      return <Form.Control type="text" name={field.name} className="w-100" />;
    }
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      {fields.map(field => (
        <Form.Group key={field.name} className="mt-3">
          <Form.Label>{field.label}</Form.Label>
          {renderField(field)}
        </Form.Group>
      ))}

      <Button type="submit" disabled={loading} className="w-100 mt-3">
        {loading ? "Отправка..." : submitText}
      </Button>
    </Form>
  );
}