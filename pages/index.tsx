import React, { useEffect} from 'react'
import { useDispatch } from 'react-redux'
import type { GetStaticProps } from 'next'
import Head from 'next/head'

import styles from '../styles/Home.module.scss'
import { client } from '../utils/client'
import { HeroImage, Category, Item, Product } from '../types'
import { featuredItemsQuery, productsQuery } from '../utils/queries'
import { setProducts } from '../redux/items'

import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import FeaturedCategories from '../components/FeaturedCategories/FeaturedCategories'
import FeaturedItems from '../components/FeaturedItems/FeaturedItems'
import WithProps from '../components/WithProps/WithProps'
import { AppProps } from 'next/app'
import MotionWrapper from '../wrappers/MotionWrapper'


const Home = ({ hero, categories, featuredItems, products } : { hero: [HeroImage], categories: [Category], featuredItems: [Item], products: Product[] }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setProducts(products))
  }, [products])

  return (
    <div className={`${styles.container}`}>
      <header className= {styles.hero}>
        <MotionWrapper>
          <Hero data = { hero } />
        </MotionWrapper>
      </header>
      {/* <About /> */}
      <section className= {styles.categories}>
        <MotionWrapper>
          <FeaturedCategories categories={categories} />
        </MotionWrapper>
      </section>
      <section className= {styles.items}>
        <MotionWrapper>
          <FeaturedItems items= {featuredItems} />
        </MotionWrapper>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const heroQuery = '*[_type == "heroImages"]'
  const heroData = await client.fetch(heroQuery)

  const categoriesQuery = '*[_type == "category"]{category, image, product->}'
  const categoriesData = await client.fetch(categoriesQuery)

  // const productsQuery = '*[_type =="product"]{categories[]->, slug, product}'
  const productsData = await client.fetch(productsQuery())

  // const popularItemsQuery = '*[_type == "popularItems"]{items[]->}'
  const popularItemsData = await client.fetch(featuredItemsQuery())

  console.log(popularItemsData)

  return {
    props: {
      hero: heroData,
      categories: categoriesData,
      featuredItems: popularItemsData[0].items,
      products: productsData
    },
    revalidate: 1
  }
}

export default Home
