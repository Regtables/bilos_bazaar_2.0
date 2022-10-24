import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Paper } from '@mui/material'
import { client } from '../../../utils/client'
import { motion } from 'framer-motion'

import styles from './Product.module.scss'
import { Item, Product } from '../../../types'
import { productItemsQuery } from '../../../utils/queries'
import { selectActiveCategory } from '../../../redux/items'

import CategoryList from '../../../components/CategoryList/CategoryList'
import Breadcrums from '../../../components/Breadcrums/Breadcrums'
import ItemCard from '../../../components/ItemCard/ItemCard'
import Search from '../../../components/Search/Search'
import Sort from '../../../components/Sort/Sort'

const Product = ({ product, items } : { product: Product, items: Item[] } ) => {
  const { product: name, productImage: image, categories } = product
  const activeCategory = useSelector(selectActiveCategory)
  const [animateItems, setAnimateItems] = useState({})
  const [filteredItems, setFilteredItems] = useState(items)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setFilteredItems(items)
  }, [product])

  useEffect(() => {
    setAnimateItems({opacity: 0})

    setTimeout(() => {
      setAnimateItems({opacity: 1})
    }, 400);
  
    if(activeCategory === 'all'){
      setTimeout(() => {
        setFilteredItems(items)
      }, 300);
    } else{
      const filtered = items.filter((item: Item) => item.category.category === activeCategory)

      setTimeout(() => {
        setFilteredItems(filtered);
      }, 300)
    }
  }, [activeCategory])

  useEffect(() => {
    setFilteredItems((items.filter((item) => item.name.includes(searchTerm))))
  }, [searchTerm])

  const handleCategoryChange = (category: string) => {
    // setAnimateItems({opacity: 0})

    // setTimeout(() => {
    //   setAnimateItems({opacity: 1})
    // }, 400);
  
    // if(category === 'all'){
    //   setTimeout(() => {
    //     setFilteredItems(items)
    //   }, 300);
    // } else{
    //   const filtered = items.filter((item: Item) => item.category.category === category)

    //   setTimeout(() => {
    //     setFilteredItems(filtered);
    //   }, 300)
    // }
  }


  return (
    <motion.div 
      className = {`${styles.page} section__padding`}
      whileInView = {{y: [50, 0], opacity: [0,1]}}
      transition = {{duration: 0.5}}
      initial = {{y: 50, opacity: 0}}
    >
      <div className= {styles.breadcrums}>
        <Breadcrums
          product = {name}
          category = {activeCategory}
          item = {''}
        />
      </div>
      <Paper className= {styles.container} elevation = {1}>
          <div 
            className= {styles.banner}
          >
            <div className = {styles.heading}>
              <h1>{name}</h1>
            </div>
            <div className = {styles.search}>
              <Search
                term = {searchTerm}
                setTerm = {setSearchTerm}
              />
            </div>
            <div className= {styles.sort}>
              <Sort />
            </div>
            {/* <div className= {styles.search}>
              <TextField 
                size='small' 
                label = 'Search'
                variant='filled'
                inputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BsSearch />
                    </InputAdornment>
                  )
                }}
              />
            </div> */}
          </div>

          <div className= {styles.content}>
            <div className = {styles.categories}>
              <CategoryList 
                categories={categories} 
                handleChange = {handleCategoryChange}
              />
            </div>
            <motion.div 
              className = {styles.items} 
              animate = {animateItems}
              transition = {{duration: 0.5}}
            >
              {filteredItems.map((item, i) => (
                <ItemCard item = {item} key = {i} />
              ))}
            </motion.div>
          </div>
      </Paper>
    </motion.div>
  )
}

export const getStaticProps = async ({ params: { product } } : {params: any }) => {
  const productQuery= `*[_type == "product" && product == "${product.replace('-', ' ')}"]{product, categories[]->, productImage}`
  const productData = await client.fetch(productQuery)

 const productItemsData = await client.fetch(productItemsQuery(product))

  return {
    props: {
      product: productData[0],
      items: productItemsData
    }
  }
}

export const getStaticPaths = async () => {
  const productsQuery = '*[_type == "product"]{slug{current}}';
	const products = await client.fetch(productsQuery);

	const paths = products.map((product: any) => ({
		params: {
			product: product.slug.current,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
}

export default Product