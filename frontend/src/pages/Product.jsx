import React from 'react'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'

const Product = () => {
  return (
    <div className="w-full px-4 py-16">
      <LatestCollection />
      <div className="mt-20">
        <BestSeller />
      </div>
    </div>
  )
}

export default Product
