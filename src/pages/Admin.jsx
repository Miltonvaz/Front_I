import Href from "../components/atoms/href";
import "../pages/Admin.css";
import SimpleBarCharts from "../components/atoms/SimpleBarCharts";

import React, { useState, useEffect } from 'react';
import { Graph } from "../components/atoms/Graph";
import NavAdmin from "../components/molecules/navAdmin";



function getCurrentDateTime() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = today.toLocaleDateString('es-ES', options); 
    const time = today.toLocaleTimeString('es-ES'); 
    return `${date} ${time}`;
}


function Admin(){
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

            <div className="All-admin">
                <NavAdmin></NavAdmin>

                <div className="page">
                    <div className="all-boxAmin">
                        
                        <div className="cajas-admin" id="caja2-simpleCharts">
                        <SimpleBarCharts></SimpleBarCharts>
                        </div>

                        <div className="cajas-admin" id="caja3-graphAdmin">
                            <Graph></Graph>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;