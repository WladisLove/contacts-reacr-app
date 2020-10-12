import React from 'react'
import uniqid from 'uniqid'
import FormField from './FormField'
import { findFieldError, isEmailValid, isTelValid, updateErrorState } from './helpers'
import './styles.css'

export type FieldType = 'text' | 'tel' | 'date' | 'email'
export type ErrorsType = string

export interface FieldConfig {
  label: string
  name: string
  type?: FieldType
  required?: boolean
  errorMessage?: string
}

interface Props {
  fields: FieldConfig[]
  onSubmit: (a: object) => void
  submitLabel?: string
}

interface State {
  errors: ErrorsType[]
  unfilledRequiredFieldsNum: number
  fields: {
    [key: string]: string
  }
}

function getInitialState(fieldsConfig: FieldConfig[]): State {
  // count number of required fields
  const unfilledRequiredFieldsNum = fieldsConfig.reduce((val, { required }) => required ? val + 1 : val, 0)
  return {
    errors: [],
    unfilledRequiredFieldsNum,
    fields: {}
  }
}

class ContactForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = getInitialState(props.fields)
  }

  resetForm = () => {
    this.setState(getInitialState(this.props.fields))
  }

  submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    // create a new contact using form's fields and uniq ID
    const contact = { ...this.state.fields, id: uniqid.time() }
    this.props.onSubmit(contact)
    this.resetForm()
  }

  changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, required } = e.target;

    this.setState(
      prev => {
        let { unfilledRequiredFieldsNum } = prev
        // change number of unfilled required fields
        if (required) {
          const prevFieldVal = prev.fields[name];
          (value && !prevFieldVal) && unfilledRequiredFieldsNum--;
          (!value && prevFieldVal) && unfilledRequiredFieldsNum++;
        }
        // update fields's value and number of unfilled required fields
        return {
          fields: { ...prev.fields, [name]: value },
          unfilledRequiredFieldsNum
        }
      },
      // start field validation after updating state
      () => this.validateField(name, value, type)
    )
  }

  validateField = (fieldName: string, value: string, type: string) => {
    // searching error in fields' config
    const err = findFieldError(fieldName, this.props.fields)
    if (!err) return null

    // special validation for fields' types 'tel' and 'email'
    if (type === 'tel' || type === 'email') {
      this.setState(prevState => {
        const isValid = value
          ? (type === 'tel' ? isTelValid(value) : isEmailValid(value))
          : true; // remove an error when no field's value
        return updateErrorState(isValid, err, prevState.errors)
      })
    }
  }

  render() {
    const { fields, submitLabel = 'Add contact' } = this.props
    const { unfilledRequiredFieldsNum, errors } = this.state
    // disable submit btn while there are unfilled required fields or errors
    const disabled = Boolean(unfilledRequiredFieldsNum || errors.length)

    return (
      <form onSubmit={this.submitHandler}>
        {fields.map(el => (
          <FormField
            key={el.name}
            {...el}
            value={this.state.fields[el.name] || ''}
            onChange={this.changeHandler}
          />
        ))}
        <ul className="error-list">
          {errors.map(el => <li key={el}>{el}</li>)}
        </ul>
        <button type="submit" disabled={disabled}>{submitLabel}</button>
      </form>
    )
  }
}

export default ContactForm
