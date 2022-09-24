export const productItemsQuery = (product) => {
  const query = `*[_type == "item" && product->.slug.current == "${product}"]`

  return query
}

export const itemsQuery = (slug) => {
  const query = `*[_type == "item"]`
}