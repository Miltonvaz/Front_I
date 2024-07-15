import Href from "../components/atoms/href";
import React, { useState, useEffect } from 'react';
import PlusButton from "../components/atoms/PlusBtn";
import HeaderEmployees from "../components/organismos/HeaderEmployees";
import CardsUsers from "../components/molecules/CardsUsers";
import "../pages/Users.css"
import Button from "../components/atoms/Button";
import AddUser from "./AddUser";

function getCurrentDateTime() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = today.toLocaleDateString('es-ES', options); 
    const time = today.toLocaleTimeString('es-ES'); 
    return `${date} ${time}`;
}


function Users(){

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

    return (
        <>
        <div className="employees-all">
        <HeaderEmployees></HeaderEmployees>
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
                        <Button text="Eliminar"></Button>
                    </div>
                </div>
                
            </div>
            <div className="view-EmployesCards">
                <CardsUsers text="text1"> </CardsUsers>
                <CardsUsers text="text2"> </CardsUsers>
                <CardsUsers text="text3"> </CardsUsers>
                <CardsUsers text="text4"> </CardsUsers>
                <CardsUsers text="text5"> </CardsUsers>
                <CardsUsers text="tex6"> </CardsUsers>
                <CardsUsers text="text7"> </CardsUsers>
                <CardsUsers text="text8"> </CardsUsers>
            </div>

        </div>   
        </>
    )

}

export default Users;