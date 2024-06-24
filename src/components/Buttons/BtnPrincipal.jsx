import React from 'react'

const BtnPrincipal = (props) => {
  return (
    <div className='flex justify-center items-center' style={{width: props.width, height: '50px', borderRadius: '1rem', background: 'var(--primary-500, #3B82F6)'}}>
        <a href="" style={{fontFamily: 'Lexend', color: props.color, fontSize: '1rem'}} 
        className="">{props.texto}
        </a>
    </div>
  )
}

export default BtnPrincipal
