import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [ordersData, setorderData] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setorderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  // แปลงสถานะเป็นภาษาไทย
  const translateStatus = (status) => {
    const statusMap = {
      'Order Placed': 'รับออเดอร์แล้ว',
      'Packing': 'กำลังแพ็คสินค้า',
      'Shipped': 'จัดส่งแล้ว',
      'Out for delivery': 'อยู่ระหว่างการจัดส่ง',
      'Delivered': 'จัดส่งสำเร็จ'
    }
    return statusMap[status] || status
  }

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'การซื้อ'} text2={'ของฉัน'} />
      </div>
      
      <div>
        {
          ordersData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>จำนวน: {item.quantity}</p>
                  </div>
                  <p className='mt-1'>วันที่สั่ง: <span className='text-gray-400'>{new Date(item.date).toLocaleDateString('th-TH')}</span></p>
                  <p className='mt-1'>ชำระเงินโดย: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text:em md:text-base'>{translateStatus(item.status)}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>ติดตามสินค้า</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders