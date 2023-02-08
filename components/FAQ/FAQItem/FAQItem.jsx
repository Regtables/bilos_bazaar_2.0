import React, { useState, useRef } from 'react'
import { ButtonBase } from '@mui/material'
import { motion } from 'framer-motion'
import { HiPlus, HiMinus } from 'react-icons/hi'

import styles from './FAQItem.module.scss'

const FAQItem = ({ question }) => {
  const { question: ques, answer } = question
  const [active, setActive] = useState(false)
  const [height, setHeight] = useState('0px')
  const content = useRef(null)

  const toggle = () => {
    setActive((prev) => !prev)

    if(!active){
      setHeight(`${content.current.scrollHeight}px`)
      console.log(height)
    } else {
      setHeight('0px')
    }
  }


  return (
    <div
      className= {styles.container} 
      onClick = {toggle}
    >
      <div className= {styles.top}>
        <div 
          className= {styles.icon} 
          style = {active ? { borderRadius: '30px 0 0 0'} : {borderRadius: '30px 0 0 30px'}}
        >
          {active ? (
            <HiMinus/>
          ) : (
            <HiPlus />
          )}
        </div>
        <div className= {styles.question}>
          <h4>{ques}</h4>
        </div>
      </div>

      <div className= {styles.answer} ref = {content} style = {{maxHeight: height}}>
        <p>{answer}</p>
      </div>
      
    </div>
  )
}

export default FAQItem