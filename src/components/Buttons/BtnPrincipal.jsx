import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BtnPrincipal = ({
  hoverColor,
  class: className,
  width,
  back,
  border,
  click,
  color,
  texto,
  borderRadius,
  padding,
  size,
  weig,
  font,
  borderLeft,
  showIcon
}) => {
  const [isClicked, setIsClicked] = useState(true);

  const handleClick = (e) => {
    setIsClicked(true);
    if (click) {
      click(e);
    }
  };

  return (
    <button
      className={className}
      style={{
        width: width,
        backgroundColor: back,
        border: `2px solid ${border}`,
        color: color,
        padding: padding,
        borderRadius: borderRadius,
        fontSize: size,
        fontWeight: weig,
        fontFamily: font,
        transition: 'background-color 0.3s, color 0.3s, border-left 0.5s',
        height: '45px',
        borderLeft: isClicked ? `5px solid ${borderLeft}` : `5px solid transparent`, // Animação ao clicar
      }}
      onClick={handleClick}
    >
      <div className='flex justify-center gap-2'>
        {texto}
        {showIcon && (
          <img
            src={isClicked ? "icons/iconWhite-block.svg" : "icons/icon-block.svg"}
            alt="Icone"
          />
        )}
      </div>
    </button>
  );
};

BtnPrincipal.propTypes = {
  hoverColor: PropTypes.string.isRequired,
  class: PropTypes.string,
  width: PropTypes.string,
  back: PropTypes.string.isRequired,
  border: PropTypes.string,
  borderLeft: PropTypes.string,
  click: PropTypes.func,
  color: PropTypes.string.isRequired,
  texto: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  borderRadius: PropTypes.string,
  padding: PropTypes.string,
  size: PropTypes.string,
  weig: PropTypes.string,
  font: PropTypes.string,
  height: PropTypes.string,
  showIcon: PropTypes.bool,
};

export default BtnPrincipal;
