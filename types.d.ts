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

export interface Color{
  color: string,
  code: string,

}
