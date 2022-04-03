import React from 'react'

export default function AddNewAddress({setFormDisplay}) {
    const openAddressForm = ()=> {
      setFormDisplay((prev)=>!prev)
      }
  return (
    <div className="add-new-button">
              <button className="btn primary" onClick={openAddressForm}><i className="fas fa-plus addNewAddress-icon"></i>Add New Address</button >

    </div>
  )
}
