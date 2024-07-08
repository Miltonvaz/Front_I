import Label  from "../components/atoms/label";
import Button from "../components/atoms/Button";
import "../pages/AddEmployees.css"
import  Input  from "../components/atoms/input";
import { useNavigate } from "react-router-dom";

function AddEmployees(){

    const navigate = useNavigate();
    const Salir = () =>{
        console.log("Salir");
        navigate("/Employees");

    }
    return(
        <>
            <div className="caja2" id="top">
                <p>Bienvenido Administrador</p>
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
                        <Input text="Edad"></Input>
                    </div>
                    <div className="dato1">
                        <Input text="Dirección"></Input>
                    </div>
                    <div className="dato1">
                        <Input text="Numero telefonico"></Input>
                    </div>
                    <div className="btn-addemployees">
                        <Button text="Agregar"></Button>
                        <Button text="Salir" onClick={Salir}></Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddEmployees;