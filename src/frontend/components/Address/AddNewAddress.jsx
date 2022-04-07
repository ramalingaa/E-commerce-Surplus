import React from 'react'

const AddNewAddress = ({setFormDisplay}) => {
  
    const openAddressForm = ()=> {
      setFormDisplay((prev)=>!prev)
      }
  return (
    <div className="add-new-button">
      <button className="btn primary" onClick={openAddressForm}><i className="fas fa-plus addNewAddress-icon"></i>Add New Address</button >
    </div>
  )
};

export default AddNewAddress;
