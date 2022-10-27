import React, { useState } from 'react'
import { Button } from '@mui/material'
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs'

import styles from './Sort.module.scss'

const SortButton = ({order, handleClick, icon} : {order: string, handleClick: any, icon: any}) => {
  return (
    <Button 
      className= {styles.option} 
      fullWidth
      onClick = {handleClick}
      sx = {{
        fontSize: '12px',
        color: 'var(--color-primary)',

        "&:hover": {
          backgroundColor: 'rgb(230, 238, 246)',
          color: 'black',
          borderRadius: '0px'
        }
      }}
    >
      {order}{icon}
    </Button>
  )
}

const Sort = ({sortOrder, setSortOrder} : {sortOrder: string, setSortOrder: any}) => {
  const [toggle, setToggle] = useState(false)
  return (
    <div className= {styles.container}>
      <div onClick={() => setToggle((prev) => !prev) }>Sort</div>
      {toggle && (
        <div className= {styles.options}>
          <SortButton 
            order = 'price' 
            handleClick={() => setSortOrder('acc')}
            icon = {<BsArrowDownShort />}
            />

          <SortButton 
            order = 'price' 
            handleClick={() => setSortOrder('dec')}
            icon = {<BsArrowUpShort />}
          />
  
          {/* <Button className= {styles.option} onClick = {() => setSortOrder('acc')}>
            <p>price acc</p>
          </Button>
          <Button className = {styles.option} onClick = {() => setSortOrder('dec')}>
            <p>price dec</p>
          </Button> */}
        </div>
      )}
    </div>
  )
}

export default Sort