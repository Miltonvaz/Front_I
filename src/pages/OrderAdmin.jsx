import React, { useState, useEffect } from "react";
import Button from "../components/atoms/Button";
import TableOrder from "../components/molecules/TableOrder";
import NavAdmin from "../components/molecules/navAdmin";
import "../pages/OrderAdmin.css";

function OrderAdmin() {
    const [data, setData] = useState([]);
    const [bandera, setBandera] = useState(false);

    const AddOrder = () => {
        const productIdInput = document.getElementById("productIdOrder").value;
        const city = document.getElementById("cityOrder").value;
        const street = document.getElementById("streetOrder").value;
        const userId = document.getElementById("userIdOrder").value;
        const cant = document.getElementById("cantdOrder").value;

        const productIds = productIdInput.split(',').map(id => parseInt(id.trim()));

        const products = productIds.map(id => ({
            id: id,
            cantidad: parseInt(cant.trim())
        }));

        fetch(`http://localhost:3002/api/purchaseOrders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                products: products,
                user_id_fk: parseInt(userId),
                street: street,
                city: city,
                status_id_fk: 1,
                created_by: 'API'
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(() => {
            // Limpiar los campos después de agregar
            document.getElementById("productIdOrder").value = '';
            document.getElementById("cityOrder").value = '';
            document.getElementById("streetOrder").value = '';
            document.getElementById("userIdOrder").value = '';
            document.getElementById("cantdOrder").value = '';

            // Cambiar el valor de `bandera` para recargar los datos
            setBandera(prev => !prev);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        fetch(`http://localhost:3002/api/purchaseOrders`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            setData(data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [bandera]);

    return (
        <>
            <NavAdmin />
            <div className="titleOrderAdmin">
                <h1>Orden</h1>
            </div>
            <div className="all-Order">
                <div className="inputOrder">
                    <input
                        type="text"
                        placeholder="Product IDs (comma separated)"
                        id="productIdOrder"
                    />
                </div>
                <div className="inputOrder">
                    <input
                        type="text"
                        placeholder="City"
                        id="cityOrder"
                    />
                </div>
                <div className="inputOrder">
                    <input
                        type="text"
                        placeholder="Street"
                        id="streetOrder"
                    />
                </div>
                <div className="inputOrder">
                    <input
                        type="text"
                        placeholder="User ID"
                        id="userIdOrder"
                    />
                </div>
                <div className="inputOrder">
                    <input
                        type="text"
                        placeholder="Cantidad"
                        id="cantdOrder"
                    />
                </div>
                <div className="inputOrder">
                    <Button text="Agregar" onClick={AddOrder} />
                </div>
            </div>
            <div className="tablaOrder">
                <TableOrder data={data} />
            </div>
        </>
    );
}

export default OrderAdmin;
