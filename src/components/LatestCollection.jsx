import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    const [latestProducts,setLatesProducts] = useState([]);

    useEffect(()=>{
      setLatesProducts(products.slice(0,10));
    },[products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'สินค้าใหม่'} text2={'ล่าสุด'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        สำรวจสินค้ามาใหม่ล่าสุดของเรา! เรามีวัสดุก่อสร้างที่คัดสรรมาอย่างดีทั้งในด้านคุณภาพและดีไซน์ที่ทันสมัย เหมาะสำหรับทุกโครงการของคุณ.
        </p>
      </div>

      {/*Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection