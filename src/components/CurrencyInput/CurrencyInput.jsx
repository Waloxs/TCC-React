// CurrencyInput.jsx
import React from 'react';

const CurrencyInput = ({ value, onChange }) => {
  const formatValue = (value) => {
    // Remove qualquer caractere não numérico
    let numericValue = value.replace(/[^\d]/g, '');

    // Adiciona os pontos de milhar e vírgula decimal
    if (numericValue.length > 2) {
      // Separa a parte inteira e a parte decimal
      const integerPart = numericValue.slice(0, -2);
      const decimalPart = numericValue.slice(-2);

      // Adiciona os pontos de milhar
      const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      return `${formattedIntegerPart},${decimalPart}`;
    }

    // Caso o valor tenha 2 ou menos dígitos
    return `0,${numericValue.padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    const formattedValue = formatValue(e.target.value);
    onChange(formattedValue);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="0,00"
      style={{ border: '1px solid #ddd', outline: 'none', height: '40px' }}
    />
  );
};

export default CurrencyInput;
