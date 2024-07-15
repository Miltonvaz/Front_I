import Href from "../components/atoms/href";
import SalesGraph from "../components/atoms/SalesGraph";
import SimpleBarCharts from "../components/atoms/SimpleBarCharts";
import StackedAreaCharts from "../components/atoms/StackedAreaCharts";
import React, { useState, useEffect } from 'react';
import "../pages/ViewEmployees.css"
import Calendar from "../components/atoms/calendar";
import HeaderEmployees from "../components/organismos/HeaderEmployees";

function getCurrentDateTime() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = today.toLocaleDateString('es-ES', options); 
    const time = today.toLocaleTimeString('es-ES'); 
    return `${date} ${time}`;
}

function ViewEmployees(){
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

    return(
        <>

                
            <HeaderEmployees></HeaderEmployees>
            <div className="father-elementsEmployees">
                <div className="left-employees">
                    <div className="graph-viewEmployees" >
                        <StackedAreaCharts></StackedAreaCharts>
                    </div>
                    <div className="graph-viewEmployees"id="graph-stack">
                        <SalesGraph></SalesGraph>
                    </div>
                </div>
                <div className="right-employees">
                    <div className="graph-viewEmployees">
                        <Calendar></Calendar>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default ViewEmployees;