import React, { Component } from 'react'
import { motion } from 'framer-motion'

function MotionWrapper(props){
  return (
    <motion.div 
      whileInView={{opacity: [0,1], y: [50, 0]}} 
      transition = {{duration: 0.7}}
      initial = {{y: 50, opacity: 0}}
    >
      {props.children}
    </motion.div>
  )
}

export default MotionWrapper