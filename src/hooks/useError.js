import { useState } from "react";

function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({field, message}) {

    const errosAlreadyExists = errors.find((obj => obj.field === field));

    if (errosAlreadyExists) return;

    setErrors((prevState) => [
      ...prevState, {
        field,
        message
      }
    ]);
  }

  function removeError(fieldName) {
    setErrors((prevState) => prevState.filter(error => error.field !== fieldName));
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((obj) => obj.field === fieldName)?.message;
  }

  return { errors, setError, removeError, getErrorMessageByFieldName};
}

export {useErrors};
