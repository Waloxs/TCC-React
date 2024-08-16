import PropTypes from 'prop-types';

const BtnPrincipal = ({ hoverColor, class: className, width, back, border, click, color, texto, borderRadius, padding, size, weig, font, height }) => {
    const handleMouseOver = (e) => {
        if(hoverColor){
        e.currentTarget.style.backgroundColor = hoverColor;
        e.currentTarget.style.color = back;
        }
    };

    const handleMouseOut = (e) => {
        if(hoverColor){
        e.currentTarget.style.backgroundColor = back;
        e.currentTarget.style.color = color;
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
                transition: 'background-color 0.3s, color 0.3s',
                height: height,
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={click}
        >
            {texto}
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
};

export default BtnPrincipal;
