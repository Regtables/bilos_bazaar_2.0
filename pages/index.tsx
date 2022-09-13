import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import ItemCard from '../components/ItemCard/ItemCard'
import Hero from '../components/Hero/Hero'

const Home: NextPage = () => {
  return (
    <div className={`${styles.container}`}>
      <Hero />
    </div>
  )
}

export default Home
