import React, { useState, useEffect } from 'react';
import Href from "../atoms/href"; // Asegúrate de que la ruta y el nombre del archivo son correctos

// Función para obtener la fecha y hora actual
function getCurrentDateTime() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = today.toLocaleDateString('es-ES', options); 
    const time = today.toLocaleTimeString('es-ES'); 
    return `${date} ${time}`;
}

function NavEmployees() {
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
        <div className="All-admin">
            <div className="barra">
                <div className="caja2" id="top">
                    <p>Bienvenido Empleado</p>
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
                                <Href text="Inicio" referencia="/ViewEmployees" />
                                <Href text="Users" referencia="/Users"/> 
                                <Href text="ProductsAdd" referencia="/ProductsAdd" />
                                <Href text="Delivery" referencia="/Delivery" />
                                <Href text="Order" referencia="/Order" />
                                <Href text="Salir" referencia="/" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavEmployees;
