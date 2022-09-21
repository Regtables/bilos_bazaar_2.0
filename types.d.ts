export interface Category{
  _type: string,
  _id: string,
  _createdAt: Date
  
}

export interface Item {
  _type: string,
  _id: string,
  _createdAt: Date
  name: string,
  price: number,
  category: {

  },
  product: {
    slug: {
      current: string
    }
  },
  images: [itemImage: {
    color: string,
    image: {
      asset: {
        _ref: string
      }
    }
  }],
  description: string,
  slug: {
    current: string
  },
  dimentions: string
}

export interface Image{
  _type: string,
  asset:{
    _ref: string,
    _type: string
  }
}

export interface Slug{
  _type: string,
  current: string
}

export interface Product{
  _type: string,
  _id: string,
  _createdAt: Date,
  product: string,
  productImage: Image
  categories: [Category],
  slug: Slug
}

export interface Category{
  _type: string,
  _id: string,
  _createdAt: string,
  category: string,
  image: Image,
  itemType: string,
  items: [Item],
  product: string

}

export interface HeroImage{
  _id: string,
  _createdAt: Date,
  _type: string,
  image: Image,
  category: Category,
  product: Product,
  title: string,
  description: string 
}

export interface Color{
  color: string,
  code: string,

}
