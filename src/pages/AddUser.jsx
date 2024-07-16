import Label  from "../components/atoms/label";
import Button from "../components/atoms/Button";
import  Input  from "../components/atoms/input";
import { useNavigate } from "react-router-dom";
import { xgcd } from "mathjs";
import React, { useEffect, useState } from "react";

function AddUser(){
    const navigate = useNavigate();
    const Salir2 = () =>{
        console.log("Salir");
        navigate("/Users");

    }
    
    const [user, setUser] = useState([]);
    const [bandera, setBandera] = useState(false);

    const AddUser = () =>{
        let nameUser = document.getElementById("nameUser").value
        let emailUser = document.getElementById("emailUser").value
        let passwordUser = document.getElementById("passwordUser").value
        let lastNameUser = document.getElementById("lastNameUser").value
    

        
        fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                "first_name": nameUser,
                "last_name": lastNameUser,
                "email": emailUser,
                "password": passwordUser,
                "role_id_fk": 2,
                "created_by": "admin_user"
            })
        })
            .then(response => { 
                if (response.ok)
                    return response.json()
            })
            .then(newUser => {
                setUser([...user, newUser]);
                setBandera(true);
                console.log(newUser);
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/users`, {})
            .then(response => { 
                if (response.ok)
                    return response.json()
            })
            .then(datos => {
                setUser(datos);
                setBandera(true);
                console.log(datos);
            })
            .catch(error => {
                console.log(error);
            })
    }, [bandera]);
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
                        <input type="Ingrese nombre" text="Ingrese nombre" id="nameUser"></input>
                    </div>
                    <div className="dato1">
                        <input text="APELLIDO" id="lastNameUser" ></input>
                    </div>
                    <div className="dato1">
                        <input text="Dirección" id="emailUser"></input>
                    </div>
                    <div className="dato1">
                        <input text="Numero telefonico" id="passwordUser"></input>
                    </div>
                    <div className="btn-addemployees">
                        <Button text="Agregar" onClick={AddUser}></Button>
                        <Button text="Salir" onClick={Salir2}></Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddUser;