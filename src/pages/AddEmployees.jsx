import Label  from "../components/atoms/label";
import Button from "../components/atoms/Button";
import "../pages/AddEmployees.css"
import  Input  from "../components/atoms/input";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function AddEmployees(){

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [bandera, setBandera] = useState(false);
    let nameEmployees;
    let lastNameEmployes;
    let emailEmployees;
    let passwordEmployees;
   
    const Salir = () =>{
        console.log("Salir");
        navigate("/Employees");

    }
    const AddEmployees = () =>{
        nameEmployees = document.getElementById("nameEmployees").value
        lastNameEmployes = document.getElementById("lastNameEmployees").value
        emailEmployees = document.getElementById("emailEmployees").value
        passwordEmployees = document.getElementById("passwordEmployees").value
       
       fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
         
         method : "POST",
         headers: {
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin':'*'
         },
         body: JSON.stringify({
            "first_name": nameEmployees,
            "last_name": lastNameEmployes,
            "email": emailEmployees,
            "password": passwordEmployees,
            "role_id_fk": 2,
            "created_by": "admin_user"
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
       

        fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        
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
                        <input type="text" placeholder="Ingrese nombre"  id="nameEmployees"></input>
                    </div>
                    <div className="dato1">
                        <input type="text" placeholder="Ingrese apellido" id="lastNameEmployees"></input>
                    </div>
                    <div className="dato1">
                        <input type="text" placeholder="Email" id="emailEmployees"></input>
                    </div>
                    <div className="dato1">
                        <input type="password" placeholder="Password" id="passwordEmployees"></input>
                    </div>
                    <div className="btn-addemployees">
                        <Button text="Agregar" onClick={AddEmployees}></Button>
                        <Button text="Salir" onClick={Salir}></Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddEmployees;