import IFieldConfig, { ErrorsType } from "./IFieldConfig"

// find an error in field-config or generate an error when field is required
export const findFieldError = (fieldName: string, fieldsSettings: IFieldConfig[]): string => {
  const { errorMessage = '', required, label } = fieldsSettings.find(el => el.name === fieldName) ?? {}
  return errorMessage
    ? `${errorMessage}${required ? ' (required)' : ''}`
    : required
      ? `The field '${label}' is required`
      : ''
}

export const isEmailValid = (val: string): boolean => !!val.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)

export const isTelValid = (val: string): boolean => !!val.match(/^\+?\d{5,}$/i)

// function for updating errors in form state
export const updateErrorState = (
  isFieldValid: boolean, errorMessage: string, errorsArr: string[]
): { errors: ErrorsType[] } | null =>
  isFieldValid
    // remove error from state when field becomes valid
    ? { errors: errorsArr.filter(errMsg => errMsg !== errorMessage) }
    // don't change state if error is already shown
    // or add an error
    : errorsArr.includes(errorMessage)
      ? null
      : { errors: [...errorsArr, errorMessage] }