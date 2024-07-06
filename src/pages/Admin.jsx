import Href from "../components/atoms/href";
import "../pages/Admin.css";
import SimpleBarCharts from "../components/atoms/SimpleBarCharts";

import React, { useState, useEffect } from 'react';


function getCurrentDateTime() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = today.toLocaleDateString('es-ES', options); 
    const time = today.toLocaleTimeString('es-ES'); 
    return `${date} ${time}`;
}

function Admin(){
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

    return(
        <>

            <div className="All-admin">
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
                                    <Href text="Clientes" referencia="/Employees" />
                                    <Href text="Delivery" referencia="/Delivery" />
                                    <Href text="User" referencia="/Users" />
                                    <Href text="Order" referencia="/Order" />
                                    <Href text="Salir" referencia="/Start" />
                                </div>
                            )}
                        </div>
                        
                    </div>
                   
                </div>

                <div className="page">
                    <div className="all-boxAmin">
                        <div className="cajas-admin">

                        </div>
                        <div className="cajas-admin" id="caja2-simpleCharts">
                        <SimpleBarCharts></SimpleBarCharts>
                        </div>

                        <div className="cajas-admin">

                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;