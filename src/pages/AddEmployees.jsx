import NavAdmin from "../components/molecules/navAdmin";
import Label from "../components/atoms/label";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/input";
import "../pages/AddEmployees.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CardsEmployees from "../components/molecules/CardsEmployees";

function AddEmployees() {
     
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [bandera, setBandera] = useState(false);

    const Salir = () => {
        console.log("Salir");
        navigate("/Employees");
    }

    const AddEmployees = () => {
        const token = localStorage.getItem('token');
    
        if (!token) {
            console.log('No hay token almacenado');
            return;
        }
    
        let nameEmployees = document.getElementById("nameEmployees").value;
        let lastNameEmployes = document.getElementById("lastNameEmployees").value;
        let emailEmployees = document.getElementById("emailEmployees").value;
        let passwordEmployees = document.getElementById("passwordEmployees").value;
        let imgemployees = document.getElementById("fileEmployees").files[0];
    
        const formData = new FormData();
        formData.append("first_name", nameEmployees);
        formData.append("last_name", lastNameEmployes);
        formData.append("email", emailEmployees);
        formData.append("password", passwordEmployees);
        formData.append("role_id_fk", '2');
        formData.append("created_by", "admin_user");
        if (imgemployees) {
            formData.append("image", imgemployees);
        }
        
        fetch(`${import.meta.env.VITE_API_URL}/api/users/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Network response was not ok.');
        })
        .then(newEmployee => {
            setEmployees([...employees, newEmployee]);
            setBandera(true);
            console.log(newEmployee);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/users/empleados`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
               'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
        })
            .then(response => { 
                if (response.ok)
                    return response.json()
            })
            .then(datos => {
                setEmployees(datos);
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
                <p>Bienvenido Administrador</p>
            </div>
            <div className="all-addemployees">
                <div className="img-employees">
                    <div className="input-imgemployees">
                        <input type="file" id="fileEmployees" accept="image/*"></input>
                    </div>
                </div>
                <div className="datosemployees">
                    <div className="dato1">
                        <input type="text" placeholder="Ingrese nombre" id="nameEmployees"></input>
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
            {bandera && <CardsEmployees employees={employees} />}
        </>
    )
}

export default AddEmployees;
