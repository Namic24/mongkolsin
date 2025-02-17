import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency,delivery_fee,getCartAmount}  = useContext(ShopContext); //ใช้ useContext hook เพื่อดึงข้อมูลจาก ShopContext

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'ตะกร้าสินค้า'}  />
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
            <p>ราคาสินค้า</p>
            <p>{currency} {getCartAmount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>ค่าจัดส่ง</p>
                <p>{currency} {delivery_fee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>รวมทั้งหมด</b>
                <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal