import HeaderEmployees from "../components/organismos/HeaderEmployees";
import PlusButton from "../components/atoms/PlusBtn";
import CardsUsers from "../components/molecules/CardsUsers";
import CardsProduct from "../components/molecules/CardsProduct";

function ProductsAdd(){
    return(
        <>
            <HeaderEmployees></HeaderEmployees>
            <h1>Productos a agregar</h1>
            <PlusButton to="/AddProduct" />
            <CardsProduct></CardsProduct>
        </>
    )
}
export default ProductsAdd;