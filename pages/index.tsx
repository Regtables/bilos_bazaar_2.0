import React, { useEffect} from 'react'
import { useDispatch } from 'react-redux'
import type { GetStaticProps } from 'next'
import Head from 'next/head'

import styles from '../styles/Home.module.scss'
import { client } from '../utils/client'
import { HeroImage, Category, Item, Product, Question, Contact, AboutType } from '../types'
import { aboutQuery, contactQuery, featuredItemsQuery, headQuery, itemsQuery, productsQuery } from '../utils/queries'
import { setAllItems, setProducts } from '../redux/items'

import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import FeaturedCategories from '../components/FeaturedCategories/FeaturedCategories'
import FeaturedItems from '../components/FeaturedItems/FeaturedItems'
import FAQ from '../components/FAQ/FAQ'

import MotionWrapper from '../wrappers/MotionWrapper'
import { setContact } from '../redux/info'
import Carousel from '../components/Carousel/Carousel'
import CarouselItem from '../components/Carousel/CarouselItem/CarouselItem'


const Home = ({ hero, categories, featuredItems, products, faq, items, head, contact, about } : { hero: [HeroImage], categories: [Category], featuredItems: Item[], items: Item[], products: Product[], faq: Question[], head: any, contact: Contact, about: AboutType }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setProducts(products))
    dispatch(setAllItems(items))
    dispatch(setContact(contact))
  }, [products, dispatch, items])

  return (
    <>
      <Head>
        <title>{head.title}</title>
        <meta name = 'description' content = {head.description} />
      </Head>
      <div className={`${styles.container}`}>
        <header className= {styles.hero}>
          <MotionWrapper>
            {/* <Hero data = { hero } /> */}
            {/* <Carousel items={hero}/> */}
            <Carousel activeIndex={0}>
              {hero.map((item, i) => (
                <div style = {{minWidth: '100%'}} key = {i}>
                  <CarouselItem item={item}  />
                </div>
              ))}
            </Carousel>
          </MotionWrapper>
        </header>
        <section className= {styles.about}>
          <MotionWrapper>
             <About data = {about} />
          </MotionWrapper>
        </section>
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
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const heroQuery = '*[_type == "heroImages"]{category->{category, product->}, product->, title, image}'
  const heroData = await client.fetch(heroQuery)

  const categoriesQuery = '*[_type == "category"]{category, image, product->}'
  const categoriesData = await client.fetch(categoriesQuery)

  // const productsQuery = '*[_type =="product"]{categories[]->, slug, product}'
  const productsData = await client.fetch(productsQuery())

  const itemsData = await client.fetch(itemsQuery())

  // const popularItemsQuery = '*[_type == "popularItems"]{items[]->}'
  const popularItemsData = await client.fetch(featuredItemsQuery())

  const faqData = await client.fetch('*[_type == "faq"]')

  const contactData = await client.fetch(contactQuery())

  const headData = await client.fetch(headQuery('home'))

  const aboutData = await client.fetch(aboutQuery())

  // console.log(popularItemsData)

  return {
    props: {
      hero: heroData,
      categories: categoriesData,
      featuredItems: popularItemsData[0].items,
      products: productsData,
      faq: faqData,
      items: itemsData,
      head: headData[0],
      contact: contactData[0],
      about: aboutData[0]
    },
    revalidate: 1
  }
}

export default Home
