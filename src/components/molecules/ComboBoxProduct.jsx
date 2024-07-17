import React, { useState } from "react";
import Href from "../atoms/href";

function ComboBoxProduct(){
    
        const [selectedOption, setSelectedOption] = useState(null);

const handleDropdownItemClick = (value) => {
  setSelectedOption(value);
  // Aquí puedes realizar cualquier acción adicional según el valor seleccionado
  if (value === '/ToolsManuals') {
    console.log('Seleccionó Productos Manuales');
    return 1
  } else if (value === '/ToolsElectric') {
    console.log('Seleccionó Productos Eléctricos');
    return 2
  }
};

return (
    <>
  <div className="Nav_elements">
    <Href text="Inicio" referencia="/Start" />
    <Href text="Nosotros" referencia="/About" />
    <div className="dropdown">
      <button className="dropdown-button">
        Productos
      </button>
      <div className="dropdown-content">
        <Href text="Productos Manuales"  onClick={() => handleDropdownItemClick('/ToolsManuals')} />
        <Href text="Productos Electricos"  onClick={() => handleDropdownItemClick('/ToolsElectric')} />
        <Href text="Materiales de construccion"  onClick={() => handleDropdownItemClick('/Materials')} />
        <Href text="Otras cosas más" onClick={() => handleDropdownItemClick('/OtherMore')} />
      </div>
    </div>
    <Href text="Contacto" referencia="/Contacto" />
    <Href text="Salir" referencia="/" />
  </div>






        </>
    )
}
export default ComboBoxProduct;