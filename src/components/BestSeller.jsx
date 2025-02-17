import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './Productitem';

const BestSeller = () => {

    const {products} = useContext(ShopContext);   // ดึงข้อมูลสินค้าออกจาก context
    const [bestSeller,setBestSeller] = useState([]);  // สร้าง state สำหรับเก็บสินค้า 'ขายดี'

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller)); // ฟิลเตอร์เอาสินค้าที่ขายดี
        setBestSeller(bestProduct.slice(0,10)) // กำหนดให้แสดง 5 สินค้าที่ขายดี
    },[products]) // เมื่อข้อมูลสินค้าใน context เปลี่ยนแปลง จะทำงานใหม่

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'สินค้า'} text2={'ขายดี'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            พบกับสินค้าขายดีที่ลูกค้าของเราต่างเลือกใช้และให้ความไว้วางใจ! วัสดุก่อสร้างเหล่านี้เป็นที่นิยมและได้รับการพิสูจน์แล้วในด้านคุณภาพและความทนทาน เหมาะสำหรับงานก่อสร้างทุกประเภท.
            </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item,index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                ))
            }
        </div>
    </div>
  )
}

export default BestSeller