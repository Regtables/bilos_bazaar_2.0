import React, { Component } from 'react'
import { motion } from 'framer-motion'

function MotionWrapper(props){
  return (
    <motion.div 
      whileInView={{opacity: [0,1], y: [20, 0]}} 
      transition = {{duration: 0.7}}
      initial = {{y: 20, opacity: 0}}
      viewport = {{once: true}}
      style = {{width: '100%', height: '100%'}}
     
    >
      {props.children}
    </motion.div>
  )
}

export default MotionWrapper