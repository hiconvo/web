import { useState } from "react";

export default function useFormik({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const fieldName = e.target.name;
    const value = e.target.value;
    setFieldValues({ [fieldName]: value });
  }

  function setFieldValues(newValues) {
    setValues(Object.assign({}, values, newValues));
  }

  function handleSubmit() {
    setIsSubmitting(true);

    const errors = validate && validate(values);

    onSubmit(values, { setSubmitting: setIsSubmitting, errors });
  }

  return {
    handleChange,
    setFieldValues,
    handleSubmit,
    isSubmitting,
    values
  };
}
