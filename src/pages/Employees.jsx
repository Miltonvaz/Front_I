import React, { useState, useEffect } from 'react';
import "../pages/Employees.css";
import PlusButton from "../components/atoms/PlusBtn";
import NavAdmin from "../components/molecules/navAdmin";
import CardsEmployees from "../components/molecules/CardsEmployees";
import Button from "../components/atoms/Button";
import Swal from "sweetalert2";

function Employees() {
    const [datos, setDatos] = useState([]);
    const [fetchError, setFetchError] = useState(null); 
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState(''); 

    useEffect(() => {
        console.log('Fetching data...');
        fetch('http://localhost:3002/api/users/empleados', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched:', data);
            data.forEach(employee => {
                console.log('Employee:', employee);
                console.log('Image URL:', employee.image_url); 
            });
            setDatos(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            setFetchError(error.message);
        });
    }, []);
    
    const deleteEmployee = () => {
        if (!employeeIdToDelete) {
            Swal.fire({
                title: "Error",
                text: "Por favor, ingrese un ID de empleado.",
                icon: "error",
            });
            return;
        }

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
                fetch(`${import.meta.env.VITE_API_URL}/api/users/${employeeIdToDelete}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete user.');
                    }
                    setDatos(datos.filter(employee => employee.id !== parseInt(employeeIdToDelete)));
                    setEmployeeIdToDelete(''); 
                    Swal.fire({
                        title: "Eliminado!",
                        text: "El usuario ha sido eliminado.",
                        icon: "success"
                    });
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
                <NavAdmin />
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
                                <input 
                                    placeholder="id Empleado" 
                                    value={employeeIdToDelete} 
                                    onChange={(e) => setEmployeeIdToDelete(e.target.value)}
                                />
                            </div>
                            <div className="espaciadoEmployees">
                                <Button text="Eliminar" onClick={deleteEmployee} />
                            </div>
                            <div className="espaciadoEmployees">
                                <PlusButton to="/AddEmployees" />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="view-EmployesCards">
                    {datos.map(element => (
                    <CardsEmployees key={element.id} text={element.first_name} imageUrl={element.url} />
                    ))}
                    </div>

                </div>
            </div>
        </>
    );
}

export default Employees;
