import GenericValidationMessages from "../resources/genericValidationMessages";

export  const createFormValidation = (errorStateSetter, errorMessage = GenericValidationMessages.required, validationExpression = (v) => v != null && v.length > 0) => (value, setState = true) => {
    if (validationExpression(value)) {
        setState && errorStateSetter("");
        return true;
    } else {
        setState && errorStateSetter(errorMessage);
        return false;
    }
}