import { v4 as uuid } from "uuid";

import "./Address.css";
import {  useState } from "react";
import axios from "axios";
import { useAuthContext, useAddress } from "../../context/context-index";

export default function Form({
  setFormDisplay,
  formObject,
  setEdit,
  edit = false,
}) {
  const { jwtToken } = useAuthContext()
  const { dispatch } = useAddress()


 
  const [error, setError] = useState({})
  const [formData, setFormData] = useState(formObject)

  const updateFormData = (e) => {
    const {name} = e.target
    setFormData((prev) => ({...prev, [name]: e.target.value}))
  }
 const cancelForm = ()  => {
    edit ? setEdit(false) : setFormDisplay(false)
 }
 const validate = () => {
  const err = {};
  if (!formData.name) {
    err["name"] = "name is needed*";
  }
  if (!formData.mobile ||!Number(formData.mobile)) {
    err["mobile"] = "Enter valid mobile number*";
  }
  if (!formData.pincode || !Number(formData.pincode)) {
    err["pincode"] = "Enter valid pincode number*";
  }
  if (!formData.address) {
    err["address"] = "address is needed*";
  }
  if (!formData.locality) {
    err["locality"] = "locality is needed*";
  }
  if (!formData.district) {
    err["district"] = "district is needed*";
  }
  if (!formData.state) {
    err["state"] = "state is needed*";
  }
  return err;
};
 const formSubmit = (e) => {
   
  e.preventDefault()
  const errorObject = validate()
  if (Object.keys(errorObject).length > 0) {
    setError(errorObject)
  }
   else {
        if(edit){
          (async ()=>{
            try {          
                 
                  const serverResponse = await axios.post(`/api/user/address/${formObject._id}`,{action:{type:"update",payload:formData}}, {
                    headers: {
                      authorization: jwtToken,
                    }
                  })
                  dispatch({type:"SET_ADDRESS_DATA", payload:serverResponse.data.address})
                  setEdit((prev) => !prev)
                  
            }
            catch(e){
                    console.log("data update failed",e)
                    
            }
          })()
        }
        else {
              (async ()=>{
                
                try {   
                      const serverResponse = await axios.post("/api/user/address",{product:{...formData, _id:uuid()}}, {
                        headers: {
                          authorization: jwtToken,
                        }
                      })
                      dispatch({type:"SET_ADDRESS_DATA", payload:serverResponse.data.address})
                      setFormDisplay((prev) => !prev)
                    }
                catch(e){
                        console.log("data uploading failed")
                }
              })()
        }
   }
  
 }
  return (
    <form onSubmit={formSubmit} className={`form-wrapper form-flex edit-form`}>
      <div className="form-flex">
          <strong>Contact Details</strong>
          <div className="form-input">
            <label htmlFor="name" className = "input-label">
            <input
              className="i-text input-name"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={updateFormData}
              placeholder = " "
            />
              <span className = "input-placeholder">Name</span>
              </label>
            
            <p className="error-message">{error.name}</p>
          </div>
          <div className="form-input">
            <label htmlFor="mobile" className = "input-label">
              <input
            className="i-text input-name"
              type="text"
              minLength = "10"
              maxLength="10" 
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={updateFormData}
              placeholder = " "
            />
              <span className = "input-placeholder">Mobile</span>
            </label>
            
            <p className="error-message">{error.mobile}</p>
          </div>
      </div>
      <div className="form-flex">
          <strong>Address</strong>
          <div className="form-input">
            <label htmlFor="pincode" className = "input-label">
              <input
              className="i-text input-name"
              type="text"
              minLength="6"
              maxLength="6"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={updateFormData}
              placeholder = " "
            />
            <span className = "input-placeholder">Pin Code</span>

            </label>
            
            <p className="error-message">{error.pincode}</p>
          </div>
          <div className="form-input">
            <label htmlFor="address" className = "input-label">
              <input
              className="i-text input-name"
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={updateFormData}
              placeholder = " "
            />
            <span className = "input-placeholder">Address(H.No, Street & Landmark)</span>
            </label>
            
            <p className="error-message">{error.address}</p>
          </div>
          <div className="form-input">
            <label htmlFor="locality" className = "input-label">
              <input
              className="i-text input-name"
              type="text"
              id="locality"
              name="locality"
              value={formData.locality}
              onChange={updateFormData}
              placeholder = " "

            />
            <span className = "input-placeholder">Locality</span>
            </label>
            
            <p className="error-message">{error.locality}</p>
          </div>
          <div className="form-input">
            <label htmlFor="district" className = "input-label">
            <input
              className="i-text input-name"
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={updateFormData}
              placeholder = " "

            />
              <span className = "input-placeholder">District</span>

              </label>
            
            <p className="error-message">{error.district}</p>
          </div>
          <div className="form-input">
            <label htmlFor="state" className = "input-label">
            <input
              className="i-text input-name"
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={updateFormData}
              placeholder = " "
            />
            <span className = "input-placeholder">State</span>
              </label>
           
            <p className="error-message">{error.state}</p>
          </div>

      </div>
      <button type="submit" className="btn primary">{ edit ? "Update Address" : "Save Address"}</button>
      <button className="cancel-btn" onClick={cancelForm}><i class="fas fa-times"></i></button>
    </form>
  );

}