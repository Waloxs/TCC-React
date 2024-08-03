import PropTypes from 'prop-types';

const BtnPrincipal = ({ hover, hoverColor, class: className, width, back, border, click, color, texto, borderRadius, padding }) => {
    return (
        <button
            className={className}
            style={{
                width: width,
                backgroundColor: back,
                borderColor: border,
                color: color,
                padding: padding,
                borderRadius: borderRadius,
            }}
            onMouseOver={hover ? () => hover(hoverColor) : null}
            onClick={click}
        >
            {texto}
        </button>
    );
};

BtnPrincipal.propTypes = {
    hover: PropTypes.string,
    hoverColor: PropTypes.string,
    class: PropTypes.string,
    width: PropTypes.string,
    back: PropTypes.string,
    border: PropTypes.string,
    click: PropTypes.func,
    color: PropTypes.string,
    texto: PropTypes.string.isRequired,
    borderRadius: PropTypes.string,
    padding: PropTypes.string,
};

export default BtnPrincipal;
