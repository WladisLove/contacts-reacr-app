import React from 'react'
import './styles.css'

interface Props {
  visible?: boolean
  onClose: () => void
}

const Modal: React.FC<Props> = ({ visible = false, onClose, children }) => {
  if (!visible) return null

  return (
    <div className="wrapper">
      <div className="content">
        <button onClick={onClose} className="closeBtn">
          Close
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
