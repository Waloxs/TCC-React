import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BtnPrincipal = ({ hoverColor, class: className, width, back, border, click, color, texto, borderRadius, padding, size, weig, font, height, showIcon }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = (e) => {
        if (hoverColor) {
            e.currentTarget.style.backgroundColor = hoverColor;
            e.currentTarget.style.color = hoverColor === back ? color : '#fff';
        }
        setIsHovered(true);
    };

    const handleMouseOut = (e) => {
        if (hoverColor) {
            e.currentTarget.style.backgroundColor = back;
            e.currentTarget.style.color = color;
        }
        setIsHovered(false);
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
                transition: 'background-color 0.3s, color 0.3s',
                height: '45px',
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={click}
        >
            <div className='flex justify-center gap-2'>
                {texto}
                {showIcon && (
                    <img
                        src={isHovered ? "icons/iconWhite-block.svg" : "icons/icon-block.svg"}
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
    click: PropTypes.func,
    color: PropTypes.string.isRequired,
    texto: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    borderRadius: PropTypes.string,
    padding: PropTypes.string,
    size: PropTypes.string,
    weig: PropTypes.string,
    font: PropTypes.string,
    height: PropTypes.string,
    showIcon: PropTypes.bool, // Adicionando nova prop
};

export default BtnPrincipal;
