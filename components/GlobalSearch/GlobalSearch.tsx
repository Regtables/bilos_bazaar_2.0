import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllItems, selectProducts, setActiveCategory } from '../../redux/items'
import { Category, Item, Product } from '../../types'

import styles from './GlobalSearch.module.scss'

const GlobalSearch = () => {
  const [term, setTerm] = useState('')
  const [itemResults, setItemResults] = useState<Item[]>([])
  const [categoryResults, setCategoryResults] = useState <Category[]>([])
  const allItems = useSelector(selectAllItems)
  const products= useSelector(selectProducts)
  const router = useRouter()
  const dispatch = useDispatch()

  const getCategories = () => {
    let categories: Category[] = []
    for(let i = 0; i < products.length; i++){
      for(let k = 0; k <products[i].categories.length; k++){
        categories.push(products[i].categories[k])
      }
    }

    return categories
  }

  useEffect(() => {

    if(term === ''){
      setItemResults([])
      setCategoryResults([])
    } else {
      const items = allItems.filter((item: Item) => item.name.toLowerCase().includes(term.toLowerCase()) || item.category.category.toLowerCase().includes(term.toLowerCase()))

      const categories = getCategories().filter((category: Category) => category.category.toLowerCase().includes(term.toLowerCase()))
  
      setItemResults(items)
      setCategoryResults(categories)
    }
  }, [term])

  const handleItemClick = (item: Item) =>{
    router.push(`/products/${item.product.slug.current}/${item.slug.current}`)
    setItemResults([])
    setCategoryResults([])
    setTerm('')
  }

  const handleCategoryClick = (category: Category) =>{
    dispatch(setActiveCategory(category.category))
    router.push(`/products/${category.product.slug.current}`)
    setItemResults([])
    setCategoryResults([])
    setTerm('')
  }

  return (
    <div className= {styles.container}>
      {/* <BsSearch /> */}
      <input 
        value = {term}
        onChange = {(e) => setTerm(e.target.value)}
        placeholder = 'What are you looking for?'
        autoFocus
      />
      {(itemResults.length > 0 || categoryResults.length > 0 )&& (
        <div className= {styles.results}>
          <div className= {styles.itemResults}>
            <div className= {styles.heading}>
              <h3>Items</h3>
            </div>
            <div className= {styles.items}>
              {itemResults.map((item: Item, i) => (
                <div className = {styles.item} key = {i} onClick = {() => handleItemClick(item)}>
                    <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className = {styles.categoryResults}>
          <div className= {styles.heading}>
              <h3>Categories</h3>
            </div>
            <div className= {styles.categories}>
              {categoryResults.map((category: Category, i) => (
                <div className= {styles.category} onClick = {() => handleCategoryClick(category)}>
                  <p>{category.category}</p>
                </div>  
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GlobalSearch