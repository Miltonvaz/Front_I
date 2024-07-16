import React, { useState } from "react";
import Button from "../components/atoms/Button";
import TableOrder from "../components/molecules/TableOrder";
import HeaderEmployees from "../components/organismos/HeaderEmployees";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import NavAdmin from "../components/molecules/navAdmin";

function OrderAdmin() {
    const [data, setData] = useState([]);
    const [bandera, setBandera] = useState(false);

    const AddOrder = () => {
        const productIdInput = document.getElementById("productIdOrder").value;
        const city = document.getElementById("cityOrder").value;
        const street = document.getElementById("streetOrder").value;
        const userId = document.getElementById("userIdOrder").value;

        const productIds = productIdInput.split(',').map(id => parseInt(id.trim()));

        fetch(`${import.meta.env.VITE_API_URL}/api/purchaseOrders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                products: productIds,
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
        .then(datos => {
            setData(datos);
            setBandera(true);
            console.log(datos);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/api/purchaseOrders`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(
            response => {
                if(response.ok){
                    return response.json()
                }
            }
        ).then(
            data => {
                setData(data);
                setBandera(true);
                console.log(data);
            }
        ).catch(error =>{
            console.log(error);
        });
        
    }, [bandera]);

    return (
        <>
            <NavAdmin />
            <h1>Orden</h1>
            <div className="all-Order">
                <div className="inputOrder">
                    <input type="text" placeholder="Product IDs (comma separated)" id="productIdOrder" />
                </div>
                <div className="inputOrder">
                    <input type="text" placeholder="City" id="cityOrder" />
                </div>
                <div className="inputOrder">
                    <input type="text" placeholder="Street" id="streetOrder" />
                </div>
                <div className="inputOrder">
                    <input type="text" placeholder="User ID" id="userIdOrder" />
                </div>
            </div>
            <Button text="Agregar" onClick={AddOrder} />
            <div className="tablaOrder">
                <TableOrder data={data} />
            </div>
        </>
    );
}

export default OrderAdmin;
