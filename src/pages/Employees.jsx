import Href from "../components/atoms/href";
import React, { useState, useEffect } from 'react';
import "../pages/Employees.css";
import PlusButton from "../components/atoms/PlusBtn";
import NavAdmin from "../components/molecules/navAdmin";
import CardsUsers from "../components/molecules/CardsUsers";
import { useNavigate } from "react-router-dom";
import CardsEmployees from "../components/molecules/CardsEmployees";

function Employees(){
        const[bandera, setBandera] = useState(false);
        const[datos, setDatos] = useState([]);
    
        useEffect(()=>{
            fetch(`${import.meta.env.VITE_API_URL}/api/users`,{
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
        
    

    return (
        <>
        <div className="employees-all">
            <NavAdmin></NavAdmin>
            <h1>EMPLEADOS</h1>

            <div className="view-Employes">
                <div className="view-Employes-1">
                    <div className="sub-viewEmployes1">
                        <p>Empleados existentes</p>
                        <div className="view-EmployesCards">
                        {
                            datos.map(element=><CardsEmployees nombre={element.first_name}>myg</CardsEmployees>)

                        }
                        </div>
                    </div>
                    <div className="sub-viewEmployes1">    
                        <PlusButton to="/AddEmployees" />
                    </div> 
                </div>
                
            </div>

        </div>   
        </>
    )

}

export default Employees;