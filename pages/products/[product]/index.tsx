import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import { Paper } from '@mui/material'
import { client } from '../../../utils/client'
import { motion } from 'framer-motion'

import styles from './Product.module.scss'
import { Contact, Item, Product } from '../../../types'
import { productItemsQuery, headQuery, productsQuery, contactQuery, itemsQuery } from '../../../utils/queries'
import { selectActiveCategory, setAllItems, setProducts } from '../../../redux/items'
import { setContact } from '../../../redux/info'

import CategoryList from '../../../components/CategoryList/CategoryList'
import Breadcrums from '../../../components/Breadcrums/Breadcrums'
import ItemCard from '../../../components/ItemCard/ItemCard'
import Search from '../../../components/Search/Search'
import Sort from '../../../components/Sort/Sort'

import MotionWrapper from '../../../wrappers/MotionWrapper'

const Product = ({ product, items, products, contact, allItems, head } : { product: Product, items: Item[], products: Product[], contact: Contact, allItems: Item[], head: any } ) => {
  const { product: name, productImage: image, categories } = product
  const activeCategory = useSelector(selectActiveCategory)
  const [animateItems, setAnimateItems] = useState({})
  const [filteredItems, setFilteredItems] = useState(items)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAllItems(allItems))
    dispatch(setProducts(products))
    dispatch(setContact(contact))
  }, [products, contact, items])

  useEffect(() => {
    setFilteredItems(items)
  }, [product, items])

  useEffect(() => {
    setAnimateItems({opacity: 0})

    setTimeout(() => {
      setAnimateItems({opacity: 1})
    }, 500);
  
    if(activeCategory === 'all'){
      setTimeout(() => {
        setFilteredItems(items)
      }, 500);
    } else{
      const filtered = items.filter((item: Item) => item.category.category === activeCategory)

      setTimeout(() => {
        setFilteredItems(filtered);
      }, 500)
    }
  }, [activeCategory, items])

  useEffect(() => {
    setFilteredItems((items.filter((item) => item.name.includes(searchTerm))))
  }, [searchTerm, items])

  useEffect(() => {
    if(sortOrder === 'acc'){
      setFilteredItems(filteredItems.sort((a,b) => a.price - b.price))
    } else if(sortOrder === 'dec'){
      setFilteredItems(filteredItems.sort((a,b) => b.price - a.price))
    }
  }, [sortOrder, filteredItems])

  const handleCategoryChange = (category: string) => {
    // setAnimateItems({opacity: 0})

    // setTimeout(() => {
    //   setAnimateItems({opacity: 1})
    // }, 500);
  
    // if(category === 'all'){
    //   setTimeout(() => {
    //     setFilteredItems(items)
    //   }, 500);
    // } else{
    //   const filtered = items.filter((item: Item) => item.category.category === category)

    //   setTimeout(() => {
    //     setFilteredItems(filtered);
    //   }, 500)
    // }
  }


  return (
    <>
      <Head>
        <title>{head.title}</title>
        <meta name = 'description' content = {head.description} />
      </Head>
      <MotionWrapper>
        <div className = {`${styles.page} section__padding`}>
          <div className= {styles.breadcrums}>
            <Breadcrums
              product = {name}
              category = {activeCategory}
              item = {''}
            />
          </div>
          <Paper className= {styles.container} elevation = {1} sx = {{ backgroundColor: 'rgb(230, 238, 246)' }}>
              <div 
                className= {styles.banner}
              >
                <div className = {styles.heading}>
                  <h1>{name}</h1>
                </div>
                <div className = {styles.search_sort}>
                  <div className = {styles.search}>
                    <Search
                      term = {searchTerm}
                      setTerm = {setSearchTerm}
                    />
                  </div>
                  <div className= {styles.sort}>
                    <Sort
                      sortOrder= {sortOrder}
                      setSortOrder = {setSortOrder}
                    />
                  </div>
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
        </div>
      </MotionWrapper>
    </>
  )
}

export const getStaticProps = async ({ params: { product } } : {params: any }) => {
  const productQuery= `*[_type == "product" && product == "${product.replace('-', ' ')}"]{product, categories[]->, productImage}`
  const productData = await client.fetch(productQuery)

 const productItemsData = await client.fetch(productItemsQuery(product))

 const headData = await client.fetch(headQuery(product.replace('-', ' ')))

 const productsData = await client.fetch(productsQuery())
 const contactdata = await client.fetch(contactQuery())
 const itemsData = await client.fetch(itemsQuery())

  return {
    props: {
      product: productData[0],
      items: productItemsData,
      head: headData[0],
      products: productsData,
      contact: contactdata[0],
      allItems: itemsData
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