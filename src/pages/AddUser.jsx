import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import "../pages/AddEmployees.css";
function AddUser() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const addUser = async () => {
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
        formData.append('userImage', selectedFile);

        try {
            const response = await fetch('http://localhost:3002/api/users', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User added:', data);
                setBandera(!bandera);
            } else {
                const errorData = await response.json();
                console.error('Error adding user:', errorData.message);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div>
            <h1>Add User</h1>
            <form onSubmit={addUser}>
                <input type="text" value={name} onChange={handleChange(setName)} placeholder="First Name" />
                <input type="text" value={lastName} onChange={handleChange(setLastName)} placeholder="Last Name" />
                <input type="email" value={email} onChange={handleChange(setEmail)} placeholder="Email" />
                <input type="password" value={password} onChange={handleChange(setPassword)} placeholder="Password" />
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
}

export default AddUser;
