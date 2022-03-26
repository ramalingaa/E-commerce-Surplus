import { ProductCard } from "../index-components";
import { useProductContext } from "../../context/context-index"


export default function Product() {
 const {filterProductsData} = useProductContext()
  return (
    <div >
      <ProductCard serverData = {filterProductsData}/>
    </div>
    
  );
}

