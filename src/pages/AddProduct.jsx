import React, { useState } from "react";
import Button from "../components/atoms/Button";
import "../pages/AddEmployees.css";
import Input from "../components/atoms/input";
import { useNavigate } from "react-router-dom";
import ComboBox from "../components/molecules/ComboBox";
import ComboBoxProduct from "../components/molecules/ComboBoxProduct";

function AddProduct() {

    

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [cant, setCant] = useState("");
    const [category, setCategory] = useState("");
    const [data, setData] = useState([]);
    const [bandera, setBandera] = useState(false);

    const SalirEmployees = () => {
        console.log("Salir");
        navigate("/ProductsAdd");
    };

    const AddProducts = () => {
        const token = localStorage.getItem('token');
        

        if (!token) {
            console.log('No hay token almacenado');
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
                stock: cant,
                created_by:"Admin",
                category_id_fk: category,
            })
        })
        .then(response => { 
            if (response.ok)
                return response.json();
            throw new Error('Error en la solicitud: ' + response.statusText);
        })
        .then(datos => {
            setData(datos);
            setBandera(true);
            console.log("Datos recibidos:", datos);
        })
        .catch(error => {
            console.error('Error al agregar producto:', error);
        });
    };

    return (
        <>
            <div className="caja2" id="top">
                <p>Bienvenido Empleado</p>
            </div>
            <div className="all-addemployees">
                <div className="img-employees">
                    <div className="input-imgemployees">
                        <Input type="file" />
                    </div>
                </div>
                <div className="datosemployees">
                    <div className="dato1">
                        <input
                            type="text"
                            placeholder="Ingrese nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="dato1">
                        <input
                            type="text"
                            placeholder="Descripcion"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="dato1">
                        <input
                            type="text"
                            placeholder="Precio"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="dato1">
                        <input
                            type="text"
                            placeholder="Cantidad"
                            value={cant}
                            onChange={(e) => setCant(e.target.value)}
                        />
                    </div>
                    <div className="dato1">
                    <input
                            type="text"
                            placeholder="Categoria"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                    <div className="btn-addemployees">
                        <Button text="Agregar" onClick={AddProducts} />
                        <Button text="Salir" onClick={SalirEmployees} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddProduct;
