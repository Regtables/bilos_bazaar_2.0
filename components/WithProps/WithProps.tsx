import React from 'react'
import type { AppProps } from 'next/app'

import { itemsQuery } from '../../utils/queries'
import { client } from '../../utils/client'

const WithProps = ({ Component, props } : any) => {
  const wrappedComponent = (props: any) => (
    <>
      <Component { ...props } />
    </>
  )
  return (
    wrappedComponent
  )
}

export const getStaticProps = async () => {
  const allItems = await client.fetch(itemsQuery())

  return {
    props: {
      allItems
    },
    revalidate: 1
  }
}

export default WithProps