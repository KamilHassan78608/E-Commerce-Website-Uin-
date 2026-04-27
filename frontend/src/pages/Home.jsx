import React, { useContext, useEffect, useState } from 'react'
import Hero from '../components/Hero'
import Product_Card from '../components/Product_Card';
import { ShopContext } from '../contents/ShopContext';

const Home = () => {

    const { products } = useContext(ShopContext);

    const [latestProducts, setlatestProducts] = useState([]);
    const [bestseller, setbestseller] = useState([]);

    useEffect(() => {
        setlatestProducts(products.slice(0, 8));
        setbestseller(products.slice(8));
    }, [products]);

  return (
    <div className='min-h-screen'>
       <Hero />

        <hr className='my-10'/>

       {/* Latest Collection */}
       <div>
            <h1 className='gradient-text tracking-wide'>Latest Collection</h1>

            <div className='flex flex-wrap gap-4 justify-between items-center -mx-3 my-10'>
            {
                latestProducts.map((prod) => (
                    <Product_Card id={prod._id} name={prod.name} description={prod.description} price={prod.price} image={prod.image}/>
                ))
            }
            </div>
       </div>

        <hr className='my-10 '/>
        {/* Best Sellet */}
        <div>
            <h1 className='gradient-text tracking-wide'>Best Seller</h1>

            <div className='flex flex-wrap gap-4 justify-between items-center -mx-3 my-10'>
            {
                bestseller.map((prod) => (
                    <Product_Card id={prod._id} name={prod.name} description={prod.description} price={prod.price} image={prod.image}/>
                ))
            }
            </div>
        </div>

    </div>
  )
}

export default Home
