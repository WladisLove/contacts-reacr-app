import React from 'react'
import IFieldConfig from './IFieldConfig'

const FormField: React.FC<IFieldConfig & React.HTMLProps<HTMLInputElement>> = ({
  label, type, errorMessage, ...restProps
}) => {
  return (
    <div>
      <label>
        <div style={{ display: 'inline-block', minWidth: 100 }}>
          {label}{restProps.required && '*'}:&nbsp;
        </div>
        <input type={type ?? 'text'} {...restProps} />
      </label>
    </div>
  )
}

export default FormField
