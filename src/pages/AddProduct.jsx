import React, { useEffect, useState } from "react";
import Button from "../components/atoms/Button";
import "../pages/AddEmployees.css";
import Input from "../components/atoms/input";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [bandera, setBandera] = useState(false);
    let name;
    let price;
    let description;
    let cant;

    const SalirEmployees = () => {
        console.log("Salir");
        navigate("/ProductsAdd");
    }

    const AddProducts = () =>{
       name = document.getElementById("nameAddProducts").value
       description = document.getElementById("descriptionProducts").value
       price = document.getElementById("priceProducts").value
       cant = document.getElementById("cantProducts").value
       console.log("Name:", name);
       console.log("Description:", description);
       console.log("Price:", price);
       console.log("Cant:", cant);

      fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        
        method : "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({
            "name": name,
	        "description": description,
            "price": price,
            "stock": cant,
            
        })

        })
            .then(response => { 
                if (response.ok)
                    return response.json()
            })
            .then(datos => {
                setData(datos);
                setBandera(true);
                console.log(datos);
            })
            .catch(error => {
                console.log(error);
            })
    }


    
    useEffect(() => {
       

        fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
        
        })
            .then(response => { 
                if (response.ok)
                    return response.json()
            })
            .then(datos => {
                setData(datos);
                setBandera(true);
                console.log(datos);
            })
            .catch(error => {
                console.log(error);
            })
    }, [bandera]);

    return (
        <>
            <div className="caja2" id="top">
                <p>Bienvenido Empleado</p>
            </div>
            <div className="all-addemployees">
                <div className="img-employees">
                    <div className="input-imgemployees">
                        <Input type="file" />
                    </div>
                </div>
                <div className="datosemployees">
                    <div className="dato1">
                        <input type="text" placeholder="Ingrese nombre" id="nameAddProducts" />
                    </div>
                    <div className="dato1">
                        <input type="text" placeholder="Descripcion" id="descriptionProducts" />
                    </div>
                    <div className="dato1">
                        <input type="text" placeholder="Precio" id="priceProducts" />
                    </div>
                    <div className="dato1">
                        <input type="text" placeholder="Cantidad" id="cantProducts"/>
                    </div>
                    <div className="btn-addemployees">
                        <Button text="Agregar" onClick={AddProducts}/>
                        <Button text="Salir" onClick={SalirEmployees} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddProduct;
