import Href from "../components/atoms/href";
import React, { useState, useEffect } from 'react';
import PlusButton from "../components/atoms/PlusBtn";
import HeaderEmployees from "../components/organismos/HeaderEmployees";
import CardsUsers from "../components/molecules/CardsUsers";
import "../pages/Users.css";
import Button from "../components/atoms/Button";
import AddUser from "./AddUser";
import { data } from "autoprefixer";
import NavAdmin from "../components/molecules/navAdmin";
import "../pages/ViewUsers.css";

function getCurrentDateTime() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = today.toLocaleDateString('es-ES', options); 
    const time = today.toLocaleTimeString('es-ES'); 
    return `${date} ${time}`;
}

function ViewUsers() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(getCurrentDateTime());
        }, 1000);
        return () => clearInterval(timer); 
    }, []);

    const [user, setUser] = useState([]);
    const [bandera, setBandera] = useState(false);
    useEffect(() => {
        fetch(`http://localhost:3002/api/users/clientes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(data => {
            setUser(data);
            setBandera(true);
            console.log(data);
        }).catch(error => {
            console.log(error);
        });
    }, [bandera]);

    return (
        <>
            <div className="employees-all">
                <NavAdmin />
                <div className="titleViewUser">
                    <h1>Users</h1>
                </div>
                <div className="view-Employees">
                    <div className="view-Employees-1">
                        <div className="sub-viewEmployees1">
                            {/* Add any other elements if needed */}
                        </div>
                    </div>
                </div>
                <div className="view-EmployeesCards">
                    {user.map(element => (
                        <CardsUsers 
                            key={element.id} 
                            text={`${element.first_name} ${element.last_name}`} 
                            imageUrl={element.url} 
                        />
                    ))}
                </div>
            </div>   
        </>
    );
}

export default ViewUsers;
