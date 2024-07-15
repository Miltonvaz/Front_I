import React, { useState } from 'react';
import Href from "../atoms/href";
import "../molecules/nav.css";
import ToolsManuals from '../../pages/ToolsManuals';
import ToolsElectric from '../../pages/ToolsElectric';
import Materials from '../../pages/Materials';

function Nav(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="Nav_elements">
            <Href text="Inicio" referencia="/Start" />
            <Href text="Nosotros"  referencia="/About"/>
            <div className="dropdown">
                <button onClick={toggleDropdown} className="dropdown-button">
                    Productos
                </button>
                {isDropdownOpen && (
                    <div className="dropdown-content">
                        <Href text="Productos Manuales" referencia="/ToolsManuals" />
                        <Href text="Productos Electricos" referencia="/ToolsElectric" />
                        <Href text="Materiales de construccion" referencia="/Materials" />
                        <Href text="Otras cosas más" referencia="/OtherMore" />
                    </div>
                )}
            </div>
           
            <Href text="Contacto" referencia="/Contacto" />
            <Href text ="Apartado" referencia="/ShoppingCart"></Href>
        </div>
    );
}

export default Nav;
