import React from 'react'
import ProductVegetable from './ProductVegetable'
import ProductFruit from './ProductFruit'
import ProductGroscry from './ProductGroscry'

export default function Porduct() {
    return (
        <Layout>
            <div className='pt-5 mt-5'></div>
            <ProductVegetable />
            <ProductFruit />
            <ProductGroscry />
        </Layout>
    )
}
