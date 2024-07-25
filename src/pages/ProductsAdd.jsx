import React, { useState, useEffect } from 'react';
import HeaderEmployees from "../components/organismos/HeaderEmployees";
import PlusButton from "../components/atoms/PlusBtn";
import CardsProduct from "../components/molecules/CardsProduct";
import Button from '../components/atoms/Button';
import Swal from 'sweetalert2';
import "../pages/ProductsAdd.css";

function ProductsAdd() {
    const [datos, setDatos] = useState([]);
    const [productIdDelete, setProductIdDelete] = useState('');

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
        .then(response => response.ok ? response.json() : Promise.reject('Error en la solicitud: ' + response.statusText))
        .then(data => {
            console.log('Datos obtenidos:', data);
            setDatos(data);
        })
        .catch(error => console.error('Error al obtener productos:', error));

    }, []);

    const handleProductIdChange = (e) => {
        setProductIdDelete(e.target.value);
    };

    const deleteProduct = () => {
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
                fetch(`${import.meta.env.VITE_API_URL}/api/products/logic/${productIdDelete}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                })
                .then(response => response.ok ? response.json() : Promise.reject('Failed to delete product.'))
                .then(() => {
                    setDatos(datos.filter(dato => dato.id !== parseInt(productIdDelete)));
                    Swal.fire({
                        title: "Eliminado!",
                        text: "El producto ha sido eliminado.",
                        icon: "success"
                    });
                })
                .catch(error => console.error('Error:', error));
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
                    <input
                        placeholder='product Id'
                        value={productIdDelete}
                        onChange={handleProductIdChange}
                    />
                </div>
                <div className='subBtnProducAdd'>
                    <Button text="Eliminar" onClick={deleteProduct} />
                </div>
            </div>
            <div className="view-EmployesCards">
                {datos.map(element => (
                    <CardsProduct key={element.id} text={element.name} imageUrl={element.url} />
                ))}
            </div>
        </>
    );
}

export default ProductsAdd;
