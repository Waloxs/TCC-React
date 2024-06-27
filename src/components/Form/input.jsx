import React from 'react'

const Input = ({tipo, id, ...props}) => {
  return (
    <div>
        <input type={tipo} id={id} {...props}></input>
    </div>
  )
}

export default Input
