import React, { useState, useRef } from 'react'
import { BsChevronCompactDown } from 'react-icons/bs'
import { motion } from 'framer-motion'

import styles from './CategoryAccordion.module.scss'

const CategoryAccordion = ({ product, icon, handleClick }) => {
  const { product: name, categories } = product
  const [active, setActive] = useState(false)
  const [height, setHeight] = useState('0px')
  const content = useRef(null)
  const [animateIcon, setAnimateIcon] = useState({})

  const toggle = () => {
    setActive((prev) => !prev)

    if(!active){
      setHeight(`${content.current.scrollHeight}px`)
      setAnimateIcon({rotate: '180deg'})
    } else {
      setHeight('0px')
      setAnimateIcon({rotate: '0deg'})
    }
  }

  return (
    <div className = {styles.container}>
      <div className= {styles.product} onClick = {toggle}>
        <p>{icon}</p>
        <h4>{name}</h4>
        <motion.p animate = {animateIcon} transition = {{duration: 0.3}}><BsChevronCompactDown /></motion.p>
      </div>
      <div className= {styles.categories} ref = {content} style = {{maxHeight: height}}>
        <div className= {styles.category} onClick = {() => handleClick('all', product )}>
          <p>all</p>
        </div>
        {categories.map((category, i) => (
          <div className= {styles.category} key = {i} onClick = {() => handleClick(category)}>
            <p>{category.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryAccordion