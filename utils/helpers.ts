import { Item } from "../types"

export const itemSlug = (item: Item) => {
  const slug = `/products/${item.product.slug.current}/${item.slug.current}`

  return slug
}