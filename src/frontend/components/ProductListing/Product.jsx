import { ProductCard } from "../index-components";
import { useProductContext } from "../../context/context-index"


const Product = () => {
 const { filterProductsData } = useProductContext()
  return (
    <div >
      <ProductCard serverData = {filterProductsData}/>
    </div>
    
  );
};

export default Product;

