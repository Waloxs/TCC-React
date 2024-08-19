import PropTypes from 'prop-types';

const Input = ({tipo, id, border, ...props}) => {
  return (
    <div>
      <input 
        type={tipo} 
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
          fontFamily: 'Lexend'
        }}
      />
    </div>
  )
}

Input.propTypes = {
  tipo: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Input;
