import Href from "../components/atoms/href";
import React, { useState, useEffect } from 'react';
import PlusButton from "../components/atoms/PlusBtn";
import HeaderEmployees from "../components/organismos/HeaderEmployees";
import CardsUsers from "../components/molecules/CardsUsers";
import "../pages/Users.css"
import Button from "../components/atoms/Button";
import AddUser from "./AddUser";
import { data } from "autoprefixer";
import NavAdmin from "../components/molecules/navAdmin";

function getCurrentDateTime() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = today.toLocaleDateString('es-ES', options); 
    const time = today.toLocaleTimeString('es-ES'); 
    return `${date} ${time}`;
}


function ViewUsers(){

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
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/api/users`,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
        }).then(
            response => {
                if(response.ok){
                    return response.json()
                }
            }
        ).then(
            data => {
                
                setUser(data)
                setBandera(true)
                console.log(data)
            }
        ).catch(error =>{
            console.log(error)
        })
        
    },[bandera])
    


    return (
        <>
        <div className="employees-all">
        <NavAdmin></NavAdmin>
            <h1>Users</h1>

            <div className="view-Employes">
                <div className="view-Employes-1">
                    <div className="sub-viewEmployes1">
                        <p>Usuarios existentes</p>
                    </div>
                   
                    
                </div>
                
            </div>
            <div className="view-EmployesCards">
                {
                    user.map(element=><CardsUsers nombre={element.first_name}>myg</CardsUsers>)
                }
            </div>

        </div>   
        </>
    )

}

export default ViewUsers;