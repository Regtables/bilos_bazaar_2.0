import React from 'react'
import { Grid } from '@mui/material'
import { FaQuestion } from 'react-icons/fa'

import { Question } from '../../types'
import styles from './FAQ.module.scss'

import FAQItem from './FAQItem/FAQItem'

const FAQ = ({ questions } : { questions: Question[] }) => {
  return (
    <div className= {`${styles.container} section__margin`}>
      <header className= {styles.heading}>
        <p><FaQuestion /></p>
        <h3>Frequently Asked Questions</h3>
      </header>
      <Grid 
        container 
        className= {styles.content}
        spacing = {2}
      >
        {questions.map((question: Question, i) => (
          <Grid item sm = {6} xs = {12} key = {i}>
            <FAQItem question = {question} key = {i}/>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default FAQ