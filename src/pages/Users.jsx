import Href from "../components/atoms/href";
import React, { useState, useEffect } from 'react';
import PlusButton from "../components/atoms/PlusBtn";
import HeaderEmployees from "../components/organismos/HeaderEmployees";
import CardsUsers from "../components/molecules/CardsUsers";
import "../pages/Users.css";
import Button from "../components/atoms/Button";
import Swal from 'sweetalert2';

function getCurrentDateTime() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = today.toLocaleDateString('es-ES', options);
    const time = today.toLocaleTimeString('es-ES');
    return `${date} ${time}`;
}

const Users = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());
    const [user, setUser] = useState([]);
    const [bandera, setBandera] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(getCurrentDateTime());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(data => {
            setUser(data);
            setBandera(true);
        })
        .catch(error => {
            console.error(error);
        });
    }, [bandera]);

    const deleteUser = () => {
        const userIdUsersdelete = document.getElementById("userIdUsersdelete").value;

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
                fetch(`${import.meta.env.VITE_API_URL}/api/users/${userIdUsersdelete}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                })
                .then(response => {
                    if (response.ok) {
                        setUser(user.filter(user => user.id !== parseInt(userIdUsersdelete)));
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
        <div className="employees-all">
            <HeaderEmployees />
            <h1>Users</h1>
            <div className="view-Employes">
                <div className="view-Employes-1">
                    <div className="sub-viewEmployes1">
                        <p>Usuarios existentes</p>
                    </div>
                    <div className="sub-viewEmployes1">
                        <PlusButton to="/AddUser" />
                    </div>
                    <div className="sub-viewEmployes1">
                        <input placeholder="User ID" id="userIdUsersdelete" />
                    </div>
                    <div className="sub-viewEmployes1">
                        <Button text="Eliminar" onClick={deleteUser} />
                    </div>
                </div>
            </div>
            <div className="view-EmployesCards">
                {
                    user.map(element => <CardsUsers key={element.id} nombre={element.first_name}>myg</CardsUsers>)
                }
            </div>
        </div>
    );
};

export default Users;
