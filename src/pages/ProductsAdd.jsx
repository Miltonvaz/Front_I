import React, { useState, useEffect } from 'react';
import HeaderEmployees from "../components/organismos/HeaderEmployees";
import PlusButton from "../components/atoms/PlusBtn";
import CardsProduct from "../components/molecules/CardsProduct";

function ProductsAdd() {
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No hay token almacenado');
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                 'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
        })
        .then(data => {
            setDatos(data); 
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });

    }, []); 

    console.log(datos);

    return (
        <>
            <HeaderEmployees />
            <h1>Productos a agregar</h1>
            <PlusButton to="/AddProduct" />
            
            <div className="view-EmployesCards">
                {datos.map(element => (
                    <CardsProduct key={element.id} text={element.name} />
                ))}
            </div>
        </>
    );
}

export default ProductsAdd;
