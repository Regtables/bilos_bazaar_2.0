import React from 'react'
import { Backdrop } from '@mui/material'
import { TailSpin } from 'react-loader-spinner'

const Loader = ({ isLoading } : { isLoading: boolean}) => {
  return (
    <Backdrop
      open = {isLoading}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <TailSpin 
        height='80'
				width='80'
				color='#F5F5F5'
				ariaLabel='bars-loading'
				wrapperStyle={{}}
				wrapperClass=''
				visible={true}
      />
    </Backdrop>
  )
}

export default Loader