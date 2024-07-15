import Href from "../components/atoms/href";
import React, { useState, useEffect } from 'react';
import "../pages/Employees.css";
import PlusButton from "../components/atoms/PlusBtn";

function getCurrentDateTime() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = today.toLocaleDateString('es-ES', options); 
    const time = today.toLocaleTimeString('es-ES'); 
    return `${date} ${time}`;
}


function Employees(){

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(getCurrentDateTime());
        }, 1000);

        return () => clearInterval(timer); 
    }, []);

    return (
        <>
        <div className="employees-all">
            <div className="barra">
                    <div className="caja2" id="top">
                        <p>Bienvenido administrador</p>
                    </div>
                    <div className="caja2" id="top2">

                        <div className="text-report">
                            <p id="reporte-text">Reporte general</p>
                        </div>

                        <div className="text-hour">
                        <p id="hour-admin">Fecha y hora actuales: {currentDateTime}</p>
                        </div>

                        <div className="dropdown">
                                <button onClick={toggleDropdown} className="dropdown-button">
                                    Funcionalidades
                                </button>
                            {isDropdownOpen && (
                                <div className="dropdown-content">
                                    <Href text="Inicio" referencia="/Admin" />
                                    <Href text="Empleados" referencia="/Employees" />
                                    <Href text="Delivery" referencia="/Delivery" />
                                    <Href text="VerUser" referencia="/ViewUsers" />
                                    <Href text="Order" referencia="/Order" />
                                    <Href text="Salir" referencia="/" />
                                </div>
                            )}
                        </div>
                        
                    </div>
            </div>
            <h1>EMPLEADOS</h1>

            <div className="view-Employes">
                <div className="view-Employes-1">
                    <div className="sub-viewEmployes1">
                        <p>Empleados existentes</p>
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