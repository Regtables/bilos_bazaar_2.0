import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useNextSanityImage } from 'next-sanity-image'

import styles from './About.module.scss'
import { AboutType } from '../../types'
import { client } from '../../utils/client'
import { Button } from '@mui/material'


const About = ({ data } : { data: AboutType}) => {
  const { image, text, heading } = data
  const imageProps: any = useNextSanityImage(client, image)

  return (
    <div className= {styles.container}>
      <div className= {styles.overlay} />
      <Image 
        { ...imageProps }
        layout='fill'
        objectFit='cover'
        objectPosition= 'center'
      />
      <div className= {styles.text}>
        <h3>{heading}</h3>
        {text.map((para: any, i: number) => (
          <p key = {i}>{para.children[0].text}</p>
        ))}
        <div className = {styles.button}>
          <Link href = '/products'>
            <Button 
              variant = 'contained'
              sx = {{
                borderRadius: '20px',
                fontSize: '12px',
                fontFamily: 'var(--font-family)',
                padding: '0.6rem 2rem',
                backgroundColor: 'var(--color-primary)',
                border: '1px solid var(--color-primary)',

                "&:hover": {
                  backgroundColor: 'white',
                  color: 'var(--color-primary)'
                }
              }}
            >
              View our products
            </Button>
          </Link>
        </div>
      </div>

    </div>
  ) 
}

export default About