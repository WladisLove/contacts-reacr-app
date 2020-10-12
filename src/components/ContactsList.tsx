import React from 'react'

export interface ContactItem {
  id: string
  firstName: string
  lastName: string
  dob: string
  phone?: string
  email?: string
}

interface Props {
  items?: ContactItem[]
  onDeleteItem: (contactId: string) => void
}

const colNames: string[] = ['Name', 'Day of Birth', 'Phone', 'E-mail', 'Handle']

const ContactsList: React.FC<Props> = ({ items = [], onDeleteItem }) => {
  const deleteHandler = (id: string) => () => onDeleteItem(id)

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          {colNames.map(colName => <th scope="col" key={colName}>{colName}</th>)}
        </tr>
      </thead>
      <tbody>
        {items.length === 0
          ? (
            <tr>
              <td colSpan={colNames.length} style={{ textAlign: 'center' }}>Empty List</td>
            </tr>
          )
          : items.map(el => (
            <tr key={el.id}>
              <td>{`${el.firstName} ${el.lastName}`}</td>
              <td>{el.dob}</td>
              <td>{el.phone || '—'}</td>
              <td>{el.email || '—'}</td>
              <td><button onClick={deleteHandler(el.id)}>Delete</button></td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default ContactsList
