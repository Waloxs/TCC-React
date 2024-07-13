import React from 'react';
import { motion } from "framer-motion";

const BtnPrincipal = (props) => {
  return (
    <motion.button 
      whileHover={{ backgroundColor: props.hover, color: props.hoverColor }}
      transition={{ duration: 0.3 }} 
      className='flex justify-center items-center' 
      style={{
        width: props.width, 
        height: '42px', 
        borderRadius: '1.25rem', 
        background: props.back, 
        border: props.border, 
        transition: '0.3s ease' 
      }}
    >
      <button 
        href={props.href} 
        style={{
          fontFamily: 'Lexend', 
          color: props.color, 
          fontSize: '1rem'
        }}
      >
        {props.texto}
      </button>
    </motion.button>
  )
}

export default BtnPrincipal;
