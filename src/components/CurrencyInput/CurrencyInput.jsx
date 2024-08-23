import React from 'react';

const CurrencyInput = ({ value, onChange }) => {
  const formatValue = (value) => {
    // Remove qualquer caractere não numérico
    let numericValue = value.replace(/[^\d]/g, '');

    // Se a string for vazia, retorna um valor padrão
    if (numericValue.length === 0) {
      return '0,00';
    }

    // Define a parte inteira e decimal
    const integerPart = numericValue.slice(0, -2) || '0';
    const decimalPart = numericValue.slice(-2).padEnd(2, '0');

    // Adiciona os pontos de milhar
    const formattedIntegerPart = integerPart
      .split('')
      .reverse()
      .reduce((acc, char, index) => {
        return char + (index && index % 3 === 0 ? '.' : '') + acc;
      }, '');

    // Remove zeros à esquerda na parte inteira
    const finalIntegerPart = formattedIntegerPart.replace(/^0+/, '') || '0';

    // Garante que a parte inteira não fique vazia e a parte decimal tenha dois dígitos
    return `${finalIntegerPart},${decimalPart}`;
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^\d]/g, '');
    const formattedValue = formatValue(numericValue);
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
