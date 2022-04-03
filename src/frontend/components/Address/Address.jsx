import { useState } from "react";
import "./Address.css";
import { Form, SavedAddress, AddNewAddress, OrderSummary} from "../index-components";
import { Link } from "react-router-dom"
import { useAddress } from "../../context/context-index"


export default function Address() {
  const { addressState } = useAddress()
  const [formDisplay, setFormDisplay] = useState(false);
  const [edit, setEdit] = useState(false)
  const [editElement, setEditElement] = useState({});
  const formObject = {
    name: "",
    mobile: "",
    pincode: "",
    address: "",
    locality: "",
    district:"",
    state:""
  };

  return (
    <div className="address-wrapper-main">
      <AddNewAddress setFormDisplay = {setFormDisplay}/>
      <div className = "address-card-wrapper">
            <div className="saved-address-wrapper">
                <SavedAddress
                  setEditElement={setEditElement}
                  setEdit = {setEdit}
                />
            </div>
            <div className="order-continue-btn">
            {addressState.coupon === "cb20" ?<OrderSummary discount = {20}/> :<OrderSummary discount = {0}/> }
              
              {!(addressState.address.length < 1) ? <Link to = "/" className = "btn primary order-btn">Continue with ORDER</Link> : <button className = "btn primary disabled">Continue with ORDER</button>}
            </div>
          
      </div>
      <div>
              {edit && (
                  <Form
                  setFormDisplay={setFormDisplay}
                    formObject={editElement}
                    edit = {edit}
                    setEdit = {setEdit}
                  />
                )}
      </div>
      {formDisplay && (
            <Form
            setFormDisplay={setFormDisplay}
              formObject={formObject}
            />
          )}
        
        
    </div>
  );
}
