import Label  from "../components/atoms/label";
import Button from "../components/atoms/Button";
import "../pages/AddEmployees.css"
import  Input  from "../components/atoms/input";
import { useNavigate } from "react-router-dom";

function AddProduct(){

    const navigate = useNavigate();
    const SalirEmployees = () =>{
        console.log("Salir");
        navigate("/ProductsAdd");

    }
    return(
        <>
            <div className="caja2" id="top">
                <p>Bienvenido Empleado</p>
            </div>
            <div className="all-addemployees">
                <div className="img-employees">
                    <div className="input-imgemployees">
                        <Input type="file"></Input>
                    </div>
                </div>
                <div className="datosemployees">
                    <div className="dato1">
                        <Input type="Ingrese nombre" text="Ingrese nombre"></Input>
                    </div>
                    <div className="dato1">
                        <Input text="Descripcion"></Input>
                    </div>
                    <div className="dato1">
                        <Input text="Precio"></Input>
                    </div>
                    <div className="dato1">
                        <Input text="Cantidad"></Input>
                    </div>
                    <div className="btn-addemployees">
                        <Button text="Agregar"></Button>
                        <Button text="Salir" onClick={SalirEmployees}></Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddProduct;