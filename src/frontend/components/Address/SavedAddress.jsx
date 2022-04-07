import AddressCard from "./AddressCard";
import { useAddress } from "../../context/context-index";

const SavedAddress = ({ setEditElement, setEdit }) => {

  const { addressState } = useAddress()
  const { address } = addressState
  return (
    <div className="saved-address">
        <h3 className="saved-address-title">Your Address</h3>
        {address.map((ele) => {
          return (
            <AddressCard
              key = {ele._id}
              ele={ele}
              setEditElement={setEditElement}
              setEdit = {setEdit}
            />
          );
        })}
        {
          address.length < 1 && <p>Add Address to place your order</p>
        }
    </div>
  );
};

export default SavedAddress;
