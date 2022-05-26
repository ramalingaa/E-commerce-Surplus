import axios from "axios";
import "./Address.css";
import { useAuthContext, useAddress } from "../../context/context-index";


const AddressCard = ({ ele,setEditElement,setEdit}) => {
  
    const { jwtToken } = useAuthContext()
    const { dispatch } = useAddress()

    const editClickHandler = () => {
        setEdit(true)        
        setEditElement(ele);
    };
    const deleteAddress = async() => {
      try{
        const response = await axios.delete(`/api/user/address/${ele._id}`, {
          headers: {
            authorization: jwtToken,
          }
        })
        dispatch({type:"SET_ADDRESS_DATA", payload:response.data.address})

      }
      catch (e) {
        console.log(e)
      }
    };
  
    return (
      <div className = "address-card-container">
        <input type="radio" name = "address"/>
         <strong>{ele.name}</strong>
        <p>{ele.address}, {ele.locality}</p>
        <p>{ele.district}, {ele.state.toUpperCase()}- {ele.pincode}</p>
        <p>Mobile: {ele.mobile}</p>
        <div className="form-card-btnWrapper">
            <button onClick={editClickHandler} className = "btn outlined">Edit</button>
            <button onClick={deleteAddress} className = "btn outlined">Delete</button>
        </div>
       
      </div>
    );
  };

export default AddressCard;
  