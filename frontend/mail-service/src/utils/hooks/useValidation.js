export const useValidation = (formData, fields, setError) => {
  const missingFields = fields
    .filter(field => field.required && !formData[field.name])
    .map(field => field.label);

  if (missingFields.length > 0) {
    setError("Заполните все поля");
  } else {
    setError('');
  }
};