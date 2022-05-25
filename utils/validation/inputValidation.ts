import * as yup from 'yup';
import { IInputValidationItems } from '../../types';

export const inputValidation = (
  validationItems: IInputValidationItems,
  value: string | number
) => {
  if (!validationItems) {
    return { status: true, message: '' };
  }
  let message: string | null | undefined = null;
  let isValid = true;
  if (validationItems.number) {
    isValid = yup.number().isValidSync(value);
    message = validationItems?.messages?.number;
    if (validationItems.require && isValid) {
      message = validationItems?.messages?.require;
      isValid = yup.number().required().isValidSync(value);
    }
    if (validationItems.min && isValid) {
      message = validationItems?.messages?.min;
      isValid = yup.number().min(validationItems.min).isValidSync(value);
    }
    if (validationItems.max && isValid) {
      message = validationItems?.messages?.max;
      isValid = yup.number().max(validationItems.max).isValidSync(value);
    }
  } else {
    if (validationItems.require) {
      message = validationItems?.messages?.require;
      isValid = yup.string().required().isValidSync(value);
    }
    if (validationItems.min && isValid) {
      message = validationItems?.messages?.min;
      isValid = yup.string().min(validationItems.min).isValidSync(value);
    }
    if (validationItems.max && isValid) {
      message = validationItems?.messages?.max;
      isValid = yup.string().max(validationItems.max).isValidSync(value);
    }
  }

  if (!isValid) {
    return { status: false, message };
  }
  return { status: true, message: '' };
};
