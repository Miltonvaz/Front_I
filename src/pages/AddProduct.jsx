import React, { useState } from 'react';
import Swal from 'sweetalert2';
import "../pages/AddEmployees.css";

function ProductsAdd() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('category_id_fk', categoryId);
        formData.append('created_by', "admin");
        if (file) {
            formData.append('productImage', file);
        }

        try {
            const response = await fetch(`http://localhost:3002/api/products`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const result = await response.json();
            Swal.fire({
                title: "Producto subido!",
                text: "El producto ha sido agregado.",
                icon: "success"
            });
            console.log('Producto agregado:', result);
        } catch (error) {
            console.error('Error al agregar producto:', error);
            Swal.fire({
                title: "Error",
                text: "No se pudo agregar el producto.",
                icon: "error"
            });
        }
    };

    return (
        <div className="all-addemployees">
            <div className="datosemployees">
                <h1>Agregar Nuevo Producto</h1>
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="dato1">
                        <label htmlFor="name">Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder='Nombre'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="dato1">
                        <label htmlFor="description">Descripción</label>
                        <input
                            id="description"
                            type="text"
                            placeholder='Descripción'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="dato1">
                        <label htmlFor="price">Precio</label>
                        <input
                            id="price"
                            type="number"
                            placeholder='Precio'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="dato1">
                        <label htmlFor="stock">Stock</label>
                        <input
                            id="stock"
                            type="number"
                            placeholder='Stock'
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                        />
                    </div>
                    <div className="dato1">
                        <label htmlFor="categoryId">ID Categoría</label>
                        <input
                            id="categoryId"
                            type="number"
                            placeholder='ID Categoría'
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="dato1">
                        <label htmlFor="productImage">Imagen del Producto</label>
                        <input
                            id="productImage"
                            type="file"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <div className="btn-addemployees">
                        <button type="submit">Subir Producto</button>
                    </div>
                </form>
            </div>
            <div className="img-employees">
            </div>
        </div>
    );
}

export default ProductsAdd;
