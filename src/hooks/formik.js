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

  function handleChange(e) {
    const fieldName = e.target.name;
    const value = e.target.value;
    setFieldValues({ [fieldName]: value });
  }

  function setFieldValue(fieldName, value) {
    setFieldValues({ [fieldName]: value });
  }

  function handleSubmit() {
    const errors = validate && validate(values);
    onSubmit(values, { setSubmitting: setIsSubmitting, errors });
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
