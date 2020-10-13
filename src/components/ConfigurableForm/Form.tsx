import React from 'react'
import FormField from './FormField'
import { findFieldError, isEmailValid, isTelValid, updateErrorState } from './helpers'
import IFieldConfig, { ErrorsType } from './IFieldConfig'
import './styles.css'

/*
  To use ConfigurableForm in app:

    <ConfigurableForm
      fields={arrayWithFieldsConfigs}
      onSubmit={submitHandler}
      submitLabel="Text of submit button"/>
*/

interface Props {
  /* (required) array of fields' configurations */
  fields: IFieldConfig[]
  /* (required) action to get an object with all fields values (in format: fieldName-fieldValue)
      is called when form is submitted */
  onSubmit: (a: object) => void
  /* string value to set custom submit button's label */
  submitLabel?: string
}

interface State {
  /* array with errors */
  errors: ErrorsType[]
  /* number of unfilled required fields */
  unfilledRequiredFieldsNum: number
  /* object for storing fields values (form state) */
  fields: {
    [key: string]: string
  }
}

function getInitialState(fieldsConfig: IFieldConfig[]): State {
  // count number of required fields
  const unfilledRequiredFieldsNum = fieldsConfig.reduce((val, { required }) => required ? val + 1 : val, 0)
  return {
    errors: [],
    unfilledRequiredFieldsNum,
    fields: {}
  }
}

// due to complex manipulations with state in changeHandler 
// it was decided to leave ConfigurableForm as class component
  class ConfigurableForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = getInitialState(props.fields)
  }

  resetForm = () => {
    this.setState(getInitialState(this.props.fields))
  }

  submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.onSubmit(this.state.fields)
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

export default ConfigurableForm
