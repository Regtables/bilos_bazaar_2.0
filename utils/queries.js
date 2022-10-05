export const productItemsQuery = (product) => {
  const query = `*[_type == "item" && product->.slug.current == "${product}"]{
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
  const query = '*[_type == "popularItems"]{ items[]->{category->, name, images, description, product->, slug, variants[]{color->, sku, image, inStock, itemQuantity}, price, _id}}'

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