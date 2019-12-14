import { useState, useEffect } from "react";

import useDebounce from "./debounce";
import {
  createOrRecoverInitFormVals,
  saveUnsubmittedFormVals
} from "../utils/forms";

export default function useFormik({
  formId,
  initialValues,
  validate,
  onSubmit
}) {
  const [values, setValues] = useState(
    createOrRecoverInitFormVals(formId, initialValues)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedValue = useDebounce(values, 1000);

  useEffect(() => {
    saveUnsubmittedFormVals(formId, debouncedValue);
  }, [formId, debouncedValue]);

  function setFieldValues(newValues) {
    setValues(Object.assign({}, values, newValues));
  }

  function reset() {
    setFieldValues(initialValues);
  }

  function handleChange(e) {
    const fieldName = e.target.name;
    const value = e.target.value;
    setFieldValues({ [fieldName]: value });
  }

  function setFieldValue(fieldName, value) {
    setFieldValues({ [fieldName]: value });
  }

  async function handleSubmit(e) {
    e && e.preventDefault();
    const errors = validate && validate(values);
    await onSubmit(values, { setSubmitting: setIsSubmitting, errors, reset });
    saveUnsubmittedFormVals(formId, {});
  }

  return {
    handleChange,
    setFieldValue,
    setFieldValues,
    handleSubmit,
    isSubmitting,
    values
  };
}
