import React from 'react'
import { BsSearch } from 'react-icons/bs'

import styles from './GlobalSearch.module.scss'

const GlobalSearch = ({term, setTerm} : { term: string, setTerm: any}) => {
  return (
    <div className= {styles.container}>
      {/* <BsSearch /> */}
      <input 
        value = {term}
        onChange = {(e) => setTerm(e.target.value)}
        placeholder = 'What are you looking for?'
      />
    </div>
  )
}

export default GlobalSearch