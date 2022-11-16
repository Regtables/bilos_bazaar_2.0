export const productItemsQuery = (product) => {
  const query = `*[_type == "item" && product->.slug.current == "${product}"]{
    category->, 
    name, 
    images, 
    description, 
    product->, 
    slug, 
    variants[]{
      color->,
      sku,
      image,
      inStock
    }, 
    price, 
    _id,
    
  }`

  return query
}

export const productsQuery = () => {
  const query = '*[_type =="product"]{categories[]->{category, itemType, product->}, slug, product}';

  return query
}

export const categoryItemsQuery = (category) => {
  const query = `*[_type == "item" && category.category == "${category}"]{
    category->, 
    name, 
    images, 
    description, 
    product->, 
    slug, 
    variants, 
    price, 
    _id
  }`

  return query
}

export const itemsQuery = (slug) => {
  const query = `*[_type == "item"]{
    category->,
    name,
    price,
    images,
    description,
    dimentions,
    product->,
    slug,
    variants[]{
      color->,
      sku,
      image,
      inStock,
      itemQty
    }
  }`

  return query
}

export const featuredItemsQuery = () => {
  const query = '*[_type == "popularItems"]{ items[]->{category->, name, images, description, product->{product, slug}, slug, variants[]{color->, sku, image, inStock, itemQuantity}, price, _id}}'

  return query
}

export const itemQuery = (slug) => {
  const query = `*[_type == "item" && slug.current == "${slug}"]{
    category->,
    name,
    price,
    images,
    description,
    dimentions,
    product->{
      product,
      slug
    },
    slug,
    variants[]{
      color->,
      sku,
      image,
      inStock,
      itemQty
    }
  }`

  return query
}

export const contactQuery = () => {
  const query = '*[_type == "info"]'

  return query
}

export const userQuery = (id) => {
  const query = `*[_type == "user" && _id == "${id}"]{
    _id,
    username,
    billingInfo,
    payments[]{
      chargeId,
      amount,
      deliveryFee,
      date,
      items[]{
        item->,
        variant{
          color->,
          image,
          sku
        },
        qty
      }
    },
    wishlist[]->
  }`

  return query
}

export const headQuery = (page) => {
  const query = `*[_type == "seo" && page == "${page}"]`

  return query
}