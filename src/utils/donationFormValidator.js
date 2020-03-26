import { validator } from "./helpers";

const formValidator = (fields) => {
  const { isEmail } = validator;
  const validatedFields = {
    email: {
      isValid: isEmail(fields.email),
      errorMessage: 'Please provide a valid email'
    },
    amount: {
      isValid: fields.amount >= 100,
      errorMessage: 'Amount must be at least 100'
    },
    ...(fields.purpose === 'purpose 2' && {
      purposeExtra: {
        isValid:
          (isFinite(fields.purposeExtra) && fields.purposeExtra > 0) ||
          fields.purposeExtra === 'None',
        errorMessage: 'Please provide a valid card number'
      }
    })
  };
  const isValid = Object.keys(validatedFields)
    .map(field => validatedFields[field].isValid)
    .every(Boolean);
  const fieldErrors = Object.entries(validatedFields).reduce(
    (errors, [fieldName, fieldValidation]) => {
      if (fieldValidation.isValid) return errors;
      return { ...errors, ...{ [fieldName]: fieldValidation.errorMessage } };
    },
    {}
  );
  return { isValid, fieldErrors };
};

export default formValidator;