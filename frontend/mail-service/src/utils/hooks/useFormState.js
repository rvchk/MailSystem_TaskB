import { useState } from 'react';

export const useFormState = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData(initialState);
    setError("");
  };

  return {
    formData,
    setFormData,
    loading,
    setLoading,
    error,
    setError,
    handleInputChange,
    resetForm
  };
};