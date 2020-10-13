import { IField } from './components/ConfigurableForm/index';

/*
  Form config is represented by an array of ojects,
  where each object is configuration for a separate field.

  Such JS-structures as array and object are very common and popular
  in many libraries to set a certain configuration to a component
  and use it functionality

  To find out what settings for the form field are supported
  you can import 'IField' interface
*/

export const formConfig: IField[] = [{
  label: 'First Name',
  name: 'firstName',
  required: true,
  errorMessage: 'Enter correct First Name'
}, {
  label: 'Last Name',
  name: 'lastName',
  required: true,
  errorMessage: 'Enter correct Last Name'
}, {
  label: 'Date of Birth',
  name: 'dob',
  type: 'date',
  required: true,
  errorMessage: 'Enter correct Date of Birth'
}, {
  label: 'Phone Number',
  name: 'phone',
  type: 'tel',
  required: true,
  errorMessage: 'Enter correct Phone Number'
}, {
  label: 'E-mail',
  name: 'email',
  type: 'email',
  errorMessage: 'Enter correct E-mail'
}]
