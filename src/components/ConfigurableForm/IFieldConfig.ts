export type FieldType = 'text' | 'tel' | 'date' | 'email'
export type ErrorsType = string

/* IFieldConfig describes settings and their possible values for a form field */

export default interface IFieldConfig {
  /* (required) text label, which is shown before input field */
  label: string
  /* (required) name of form's input and 
    field's name in returned object with form values after form submittion */
  name: string
  /* type of input element (matches the types of input elements in HTML5).
    Supported types are listed in FieldType */
  type?: FieldType
  /* boolean value to mark an input field as required */
  required?: boolean
  /* text error message shown after failed validation */
  errorMessage?: string
}