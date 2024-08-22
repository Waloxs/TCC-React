import PropTypes from 'prop-types';

const Input = ({ type, id, border, size, ...props }) => {
  return (
    <div>
      <input 
        type={type} 
        id={id} 
        {...props} 
        style={{
          height: '40px', 
          width: '100%', 
          paddingTop: '0px', 
          paddingBottom: '0px', 
          boxSizing: 'border-box',
          border: `2px solid ${border}`,
          outline: 'none',
          fontFamily: 'Lexend',
          fontSize: size,
        }}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  border: PropTypes.string,
  size: PropTypes.string,
};

export default Input;
