import { useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useFormState } from "../utils/hooks";
import { useValidation } from "../utils/hooks";
import { sendTransaction } from "../utils/api";

export default function CustomForm({
  fields,
  onSubmit,
  transactionMethod,
  submitText = "Отправить",
  loadingText = "Отправка...",
  initialData = {}
}) {
  const {
    formData,
    error,
    setError,
    loading,
    setLoading,
    handleInputChange,
    resetForm
  } = useFormState(initialData);

  // Валидация при изменении формы
  useEffect(() => {
    useValidation(formData, fields, setError);
  }, [formData, fields, setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
        resetForm();

      }
      else if (transactionMethod) {
        await sendTransaction(transactionMethod, formData)
        resetForm();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    const commonProps = {
      name: field.name,
      value: formData[field.name] || '',
      onChange: handleInputChange,
      required: field.required,
      placeholder: field.placeholder,
      className: "w-100"
    };

    switch (field.type) {
      case 'select':
        return (
          <Form.Select {...commonProps}>
            <option value="" disabled>{field.placeholder || `Выберите ${field.label}`}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        );

      case 'textarea':
        return (
          <Form.Control as="textarea" rows={3} {...commonProps} />
        );

      case 'checkbox':
        return (
          <Form.Check
            type="checkbox"
            label={field.placeholder}
            checked={formData[field.name] || false}
            onChange={handleInputChange}
            name={field.name}
          />
        );

      case 'number':
        return (
          <Form.Control
            type="number"
            min={field.min}
            max={field.max}
            step={field.step}
            {...commonProps}
          />
        );

      default:
        return (
          <Form.Control type={field.type || "text"} {...commonProps} />
        );
    }
  };
  const isFormValid = fields.every(field =>
    !field.required || formData[field.name]
  );

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map(field => (
        <Form.Group key={field.name} className="mt-3">
          <Form.Label>
            {field.label} {field.required}
          </Form.Label>
          {renderField(field)}
          {field.helpText && (
            <Form.Text className="text-muted">{field.helpText}</Form.Text>
          )}
        </Form.Group>
      ))}

      {error && (
        <Alert className="mt-4" variant="danger">
          {error}
        </Alert>
      )}

      <Button
        variant="primary"
        type="submit"
        disabled={!!error || loading || !isFormValid}
        className="w-100 mt-3"
      >
        {loading ? loadingText : submitText}
      </Button>
    </Form>
  );
}