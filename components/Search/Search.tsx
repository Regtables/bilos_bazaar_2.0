import React from 'react'
import { TextField } from '@mui/material'
import { BsSearch } from 'react-icons/bs'

import styles from './Search.module.scss'

const Search = ({ term, setTerm } : { term: string, setTerm: any }) => {
  return (
    <div className= {styles.container}>
      <BsSearch />
      <input
        placeholder='Search'
        value = {term}
        onChange = {(e) => setTerm(e.target.value)}
      />
    </div>
  )
}

export default Search