import Href from "../components/atoms/href";
import React, { useState, useEffect } from 'react';
import "../pages/Employees.css";
import PlusButton from "../components/atoms/PlusBtn";
import NavAdmin from "../components/molecules/navAdmin";
import CardsUsers from "../components/molecules/CardsUsers";
import { useNavigate } from "react-router-dom";
import CardsEmployees from "../components/molecules/CardsEmployees";
import Button from "../components/atoms/Button";
import Swal from "sweetalert2";
function Employees(){
        const[bandera, setBandera] = useState(false);
        const[datos, setDatos] = useState([]);
    
        useEffect(()=>{
            fetch(`${import.meta.env.VITE_API_URL}/api/users/empleados`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*'
                },
            }).then(
                response => {
                    if(response.ok){
                        return response.json()
                    }
                }
            ).then(
                data => {
                    
                    setDatos(data)
                    setBandera(true)
                }
            ).catch(error =>{
                console.log(error)
            })
            
        },[bandera])
        console.log(datos)
        
        const deleteEmployees = () => {
            const employeesIdDeletes = document.getElementById("idEmployeesDelete").value;
    
            Swal.fire({
                title: "¿Está seguro de eliminar?",
                text: "No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, eliminarlo!"
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`${import.meta.env.VITE_API_URL}/api/users/empleados${employeesIdDeletes}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                    })
                    .then(response => {
                        if (response.ok) {
                            setDatos(datos.filter(datos => datos.id !== parseInt(employeesIdDeletes)));
                            Swal.fire({
                                title: "Eliminado!",
                                text: "El usuario ha sido eliminado.",
                                icon: "success"
                            });
                        } else {
                            throw new Error('Failed to delete user.');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
            });
        };
   

    return (
        <>
        <div className="employees-all">
            <NavAdmin></NavAdmin>
            <div className="h1empleados">
                <h1>EMPLEADOS</h1>
            </div>
            
            <div className="view-Employes">
                <div className="view-Employes-1">
                    <div className="sub-viewEmployes1">
                        <p>Empleados existentes</p>
                        
                    </div>
                    <div className="sub-viewEmployes1">
                        <div className="espaciadoEmployees">
                        <input placeholder="id Empleado" id="idEmployeesDelete"></input> 
                        </div>
                        <div className="espaciadoEmployees">
                        <Button text= "Eliminar" onClick={deleteEmployees}></Button>
                        </div>
                        <div className="espaciadoEmployees">  
                        <PlusButton to="/AddEmployees" />
                        
                        </div> 
                        
                    </div> 
                </div>
                <br></br>
                <div className="view-EmployesCards">
                        {
                            datos.map(element=><CardsEmployees nombre={element.first_name}>myg</CardsEmployees>)

                        }
                </div>
            </div>

        </div>   
        </>
    )

}

export default Employees;