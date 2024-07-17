import React, { useState, useEffect } from 'react';
import HeaderEmployees from "../components/organismos/HeaderEmployees";
import PlusButton from "../components/atoms/PlusBtn";
import CardsProduct from "../components/molecules/CardsProduct";
import Button from '../components/atoms/Button';
import Swal from 'sweetalert2';
import "../pages/ProductsAdd.css"

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
    const deleteProduct = () => {
        const productIdDeletes = document.getElementById("productIdDelete").value;

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
                fetch(`${import.meta.env.VITE_API_URL}/api/products/${productIdDeletes}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                })
                .then(response => {
                    if (response.ok) {
                        setDatos(datos.filter(datos => datos.id !== parseInt(productIdDeletes)));
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
            <HeaderEmployees />
            <div className='titleAddProduct'>
                <h1>Productos a agregar</h1>
            </div>
            <div className='btnProducAdd'>
                <div className='subBtnProducAdd'>
                    <PlusButton to="/AddProduct" />
                </div>
                <div className='subBtnProducAdd'>
                    <input placeholder='product Id' id='productIdDelete'></input>
                </div>
                <div className='subBtnProducAdd'>
                    <Button text="Eliminar" onClick={deleteProduct} />
                </div>
            </div>
            <div className="view-EmployesCards">
                {datos.map(element => (
                    <CardsProduct key={element.id} text={element.name} />
                ))}
            </div>
        </>
    );
}

export default ProductsAdd;
