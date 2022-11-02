import React, { useEffect} from 'react'
import { useDispatch } from 'react-redux'
import type { GetStaticProps } from 'next'
import Head from 'next/head'

import styles from '../styles/Home.module.scss'
import { client } from '../utils/client'
import { HeroImage, Category, Item, Product, Question } from '../types'
import { featuredItemsQuery, productsQuery } from '../utils/queries'
import { setProducts } from '../redux/items'

import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import FeaturedCategories from '../components/FeaturedCategories/FeaturedCategories'
import FeaturedItems from '../components/FeaturedItems/FeaturedItems'
import FAQ from '../components/FAQ/FAQ'

import MotionWrapper from '../wrappers/MotionWrapper'


const Home = ({ hero, categories, featuredItems, products, faq } : { hero: [HeroImage], categories: [Category], featuredItems: [Item], products: Product[], faq: Question[] }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setProducts(products))
  }, [products, dispatch])

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
      <section>
        <FAQ 
          questions={faq}
        />
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

  const faqData = await client.fetch('*[_type == "faq"]')

  console.log(popularItemsData)

  return {
    props: {
      hero: heroData,
      categories: categoriesData,
      featuredItems: popularItemsData[0].items,
      products: productsData,
      faq: faqData
    },
    revalidate: 1
  }
}

export default Home
