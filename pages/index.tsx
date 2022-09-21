import type { GetStaticProps } from 'next'
import Head from 'next/head'

import styles from '../styles/Home.module.scss'
import { client } from '../utils/client'
import { HeroImage, Category, Item } from '../types'


import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import FeaturedCategories from '../components/FeaturedCategories/FeaturedCategories'
import FeaturedItems from '../components/FeaturedItems/FeaturedItems'


const Home = ({ hero, categories, featuredItems } : { hero: [HeroImage], categories: [Category], featuredItems: [Item]}) => {
  return (
    <div className={`${styles.container}`}>
      <Hero data = { hero } />
      <About />
      <FeaturedCategories categories = {categories} />
      <FeaturedItems items= {featuredItems} />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const heroQuery = '*[_type == "heroImages"]'
  const heroData = await client.fetch(heroQuery)

  const categoriesQuery = '*[_type == "category"]'
  const categoriesData = await client.fetch(categoriesQuery)

  const popularItemsQuery = '*[_type == "popularItems"]{items[]->}'
  const popularItemsData = await client.fetch(popularItemsQuery)

  return {
    props: {
      hero: heroData,
      categories: categoriesData,
      featuredItems: popularItemsData[0].items
    },
    revalidate: 1
  }
}

export default Home
