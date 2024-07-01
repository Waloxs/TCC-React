import React from 'react'

const Input = ({tipo, id, ...props}) => {
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
            boxSizing: 'border-box'
          }}
        />
    </div>
  )
}

export default Input
