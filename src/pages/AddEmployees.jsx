import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import "../pages/AddEmployees.css";
import CardsEmployees from "../components/molecules/CardsEmployees";

function AddEmployees() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [employees, setEmployees] = useState([]);
    const [bandera, setBandera] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const addEmployee = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const token = localStorage.getItem('token');

        if (!token) {
            console.log('No hay token almacenado');
            return;
        }

        const formData = new FormData();
        formData.append('first_name', name);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role_id_fk', 2);
        formData.append('created_by', 'admin_user');
        if (selectedFile) {
            formData.append('userImage', selectedFile);
        }

        try {
            const response = await fetch(`http://localhost:3002/api/users/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Employee added:', data);
                setEmployees([...employees, data]);
                setBandera(!bandera);
                navigate('/Employees'); 
            } else {
                const errorData = await response.json();
                console.error('Error adding employee:', errorData.message);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`http://localhost:3002/api/users/empleados`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setEmployees(data);
                    setBandera(false);
                } else {
                    console.error('Error fetching employees:', await response.json());
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        };

        fetchEmployees();
    }, [bandera]);

    return (
        <>
            <div className="caja2" id="top">
                <p>Bienvenido Administrador</p>
            </div>
            <div className="all-addemployees">
                <form onSubmit={addEmployee}>
                    <div className="img-employees">
                        <div className="input-imgemployees">
                            <input type="file" onChange={handleFileChange} accept="image/*" />
                        </div>
                    </div>
                    <div className="datosemployees">
                        <div className="dato1">
                            <input type="text" value={name} onChange={handleChange(setName)} placeholder="Ingrese nombre" />
                        </div>
                        <div className="dato1">
                            <input type="text" value={lastName} onChange={handleChange(setLastName)} placeholder="Ingrese apellido" />
                        </div>
                        <div className="dato1">
                            <input type="text" value={email} onChange={handleChange(setEmail)} placeholder="Email" />
                        </div>
                        <div className="dato1">
                            <input type="password" value={password} onChange={handleChange(setPassword)} placeholder="Password" />
                        </div>
                        <div className="btn-addemployees">
                            <Button text="Agregar" type="submit" />
                            <Button text="Salir" onClick={() => navigate("/Employees")} />
                        </div>
                    </div>
                </form>
            </div>
            {employees.length > 0 && <CardsEmployees employees={employees} />}
        </>
    );
}

export default AddEmployees;
