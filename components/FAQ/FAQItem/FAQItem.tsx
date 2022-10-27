import React, { useState } from 'react'
import { ButtonBase } from '@mui/material'
import { motion } from 'framer-motion'
import { HiPlus, HiMinus } from 'react-icons/hi'

import styles from './FAQItem.module.scss'
import { Question } from '../../../types'

const FAQItem = ({ question }: { question: Question }) => {
  const { question: ques, answer } = question

  const [toggleBottom, setToggleBottom] = useState(false)
  const [animateBottom, setAnimateBottom] = useState({})

  const handleToggle = () => {
   
    if(!toggleBottom){
      setToggleBottom(true)
      setAnimateBottom({height: [ '0px', '150px'], opacity: [0, 1]})
    } else {
      setAnimateBottom({height: ['150px', '0px'], opacity: [1,0], padding: ['1rem', '1rem', '0rem']})
      
      setTimeout(() => {
        setToggleBottom(false)
      }, 350);
    }

  }

  return (
    <div
      className= {styles.container} 
    >
      <div className= {styles.top}  onClick = {handleToggle}>
        <div 
          className= {styles.icon} 
          style = {toggleBottom ? { borderRadius: '30px 0 0 0'} : {borderRadius: '30px 0 0 30px'}}
        >
          {toggleBottom ? (
            <HiMinus/>
          ) : (
            <HiPlus />
          )}
        </div>
        <div className= {styles.question}>
          <h4>{ques}</h4>
        </div>
      </div>
      {toggleBottom && (
        <motion.div
          className= {styles.bottom}
          animate = {animateBottom}
          transition = {{duration: 0.3}}
        >
          <div className= {styles.answer}>
            <p>{answer}</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default FAQItem