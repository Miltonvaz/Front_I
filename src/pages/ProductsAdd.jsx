import React, { useState, useEffect } from 'react';
import HeaderEmployees from "../components/organismos/HeaderEmployees";
import PlusButton from '../components/atoms/PlusBtn';
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

        fetch(`http://localhost:3002/api/products`, {
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
                fetch(`http://localhost:3002/api/products/logic/${productIdDelete}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                })
                .then(response => response.ok ? response.json() : Promise.reject('Failed to delete product.'))
                .then(() => {
                    setDatos(datos.filter(dato => dato.product_id !== parseInt(productIdDelete)));
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

    const productAdd = async () => {
        Swal.fire({
            title: "Agregar producto",
            html: `
                <img src="/iconoUserMasculino.png" alt="Icono Usuario" class="swal-img" id="img">
                <div class="custom-file-input-container">   
                    <label class="custom-file-label" for="swal-input5">Seleccionar archivo...</label>
                    <input id="swal-input5" class="swal2-input custom-file-input" type="file" style="display:none;" placeholder="seleccionar archivo">
                    <span id="swal-file-name" class="swal-file-name">Ningún archivo seleccionado</span>
                </div>
                <input id="nameProducts" class="swal2-input" placeholder="Nombre">
                <input id="descriptionProducts" class="swal2-input" placeholder="Descripción">
                <input id="priceProducts" class="swal2-input" placeholder="Precio">
                <input id="stock" class="swal2-input" placeholder="Cantidad">
                <input id="categoryId" class="swal2-input" placeholder="Categoría">
            `,
            customClass: {
                popup: 'custom-swal-popup'
            },
            showCancelButton: true,
            confirmButtonText: 'Agregar',
            cancelButtonText: 'Cancelar',
            didOpen: () => {
                const fileInput = document.getElementById('swal-input5');
                const fileLabel = document.querySelector('.custom-file-label');
                
                fileLabel.addEventListener('click', () => {
                    fileInput.click();
                });

                fileInput.addEventListener('change', handleFileChange);
            },
            preConfirm: async () => {
                const name = document.getElementById('nameProducts').value;
                const description = document.getElementById('descriptionProducts').value;
                const price = document.getElementById('priceProducts').value;
                const stock = document.getElementById('stock').value;
                const categoryId = document.getElementById('categoryId').value;
                const file = document.getElementById('swal-input5').files[0];
                
                const formData = new FormData();
                formData.append('name', name);
                formData.append('description', description);
                formData.append('price', price);
                formData.append('stock', stock);
                formData.append('category_id_fk', categoryId);
                formData.append('created_by', "empleado");
                
                if (file) {
                    formData.append('productImage', file);
                }
                
                try {
                    const response = await fetch(`http://localhost:3002/api/products`, {
                        method: "POST",
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: formData,
                    });
              
                    if (response.ok) {
                        const data = await response.json();
                        setDatos([...datos, data]);
                        Swal.fire({
                            title: "Producto subido!",
                            text: "El producto ha sido agregado.",
                            icon: "success"
                        });
                        console.log('Producto agregado:', data);
                    } else {
                        throw new Error('Error en la solicitud: ' + response.statusText);
                    }
                } catch (error) {
                    console.error('Error al agregar producto:', error);
                    Swal.fire({
                        title: "Error",
                        text: "No se pudo agregar el producto.",
                        icon: "error"
                    });
                }
            }
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        document.getElementById('swal-file-name').innerText = file ? file.name : 'Ningún archivo seleccionado';
    };

    return (
        <>
            <HeaderEmployees />
            <div className='titleAddProduct'>
                <h1>Productos a agregar</h1>
            </div>
            <div className='btnProducAdd'>
                <div className='subBtnProducAdd'>
                    <Button text="Agregar" onClick={productAdd} />
                </div>
                <div className='subBtnProducAdd'>
                    <input
                        placeholder='Product ID'
                        value={productIdDelete}
                        onChange={handleProductIdChange}
                        id='inputIdEdit'
                    />
                </div>
                <div className='subBtnProducAdd'>
                    <Button text="Eliminar" onClick={deleteProduct} />
                </div>
            </div>
            <div className="view-EmployesCards">
                {datos.map(product => (
                    <CardsProduct 
                        key={product.product_id}
                        text={product.name} 
                        imageUrl={product.url} 
                        price={product.price} 
                        stock={product.stock} 
                        id={product.product_id} 
                    />
                ))}
            </div>
        </>
    );
}

export default ProductsAdd;
