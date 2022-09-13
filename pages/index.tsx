import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import ItemCard from '../components/ItemCard/ItemCard'
import Hero from '../components/Hero/Hero'

import { client } from '../utils/client'

const Home: NextPage = ({ hero }) => {
  console.log(hero)
  return (
    <div className={`${styles.container}`}>
      <Hero data = { hero } />
    </div>
  )
}

export const getStaticProps = async () => {
  const heroQuery = '*[_type == "heroImages"]'
  const heroData = await client.fetch(heroQuery)

  return {
    props: {
      hero: heroData
    },
    revalidate: 1
  }
}

export default Home
