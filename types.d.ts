export interface Category{
  _type: string,
  _id: string,
  _createdAt: Date
  
}

export interface BillingInfo{
  name: string,
  surname: string,
  provice: string,
  city: string,
  phone: number,
  email: string,
  address: string
}

export interface User{
  _type: string,
  _id: string,
  _createdAt: string
  billingInfo: BillingInfo,
  wishlist: string,
  payments: string
}

export interface Item {
  _type: string,
  _id: string,
  _createdAt: Date
  name: string,
  price: number,
  category: {
    category: string,
    itemType: string
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
  description: {
    short: string,
    long: string
  },
  slug: {
    current: string
  },
  dimentions: string,
  variants: [Variant],
  colors: any
}

export interface Image{
  _type: string,
  asset:{
    _ref: string,
    _type: string
  }
}

export interface Color{
  _type: string,
  color: string,
  colorCode: string
}

export interface Variant{
  _type: string,
  id: string,
  color: Color,
  image: Image,
  inStock: boolean,
  itemQuantity: number
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
  product: Product

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

export interface CartItem{
  item: Item,
  variant: Variant,
  qty: number,
  subTotal: number
}
