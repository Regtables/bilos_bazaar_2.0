import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import ItemCard from '../components/ItemCard/ItemCard'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import FeaturedCategories from '../components/FeaturedCategories/FeaturedCategories'

import { client } from '../utils/client'

const Home: NextPage = ({ hero, categories }) => {
  console.log(hero)
  return (
    <div className={`${styles.container}`}>
      <Hero data = { hero } />
      <About />
      <FeaturedCategories categories = {categories} />
    </div>
  )
}

export const getStaticProps = async () => {
  const heroQuery = '*[_type == "heroImages"]'
  const heroData = await client.fetch(heroQuery)

  const categoriesQuery = '*[_type == "category"]'
  const categoriesData = await client.fetch(categoriesQuery)

  return {
    props: {
      hero: heroData,
      categories: categoriesData
    },
    revalidate: 1
  }
}

export default Home
