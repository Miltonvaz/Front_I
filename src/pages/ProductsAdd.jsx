import HeaderEmployees from "../components/organismos/HeaderEmployees";
import PlusButton from "../components/atoms/PlusBtn";

function ProductsAdd(){
    return(
        <>
            <HeaderEmployees></HeaderEmployees>
            <h1>Productos a agregar</h1>
            <PlusButton to="/AddProduct" />
        </>
    )
}
export default ProductsAdd;