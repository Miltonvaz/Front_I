import React, { useState } from 'react';

const ComboBox = ({ onOptionChange }) => {
  
  const [selectedOption, setSelectedOption] = useState('');

  const options = ['Productos manuales', 'Productos electricos', 'Materiales de construccion', 'otras cosas mas'];

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onOptionChange(value); 
  };

  return (
    <div>
      <label htmlFor="comboBox">Categoria:</label>
      <select id="comboBox" value={selectedOption} onChange={handleChange}>
        <option value="" disabled>Selecciona una opción</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p>Selected option: {selectedOption}</p>
    </div>
  );
};

export default ComboBox;
