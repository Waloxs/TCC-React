import React from 'react'

const BtnPrincipal = (props) => {
  return (
    <div className='flex justify-center items-center' style={{width: props.width, height: '45px', borderRadius: '1.25rem', background: props.back, border: props.border}}>
        <a href={props.hrefJ} style={{fontFamily: 'Lexend', color: props.color, fontSize: '1rem'}} 
        className="">{props.texto}
        </a>
    </div>
  )
}

export default BtnPrincipal
