import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt='' />
        <p className='font-semibold'>เปลี่ยนสินค้าได้สะดวกสบาย</p>
        <p className='text-gray-400'>"มั่นใจทุกการซื้อกับนโยบายเปลี่ยนสินค้าได้ง่าย สะดวก และรวดเร็ว ไม่ต้องกังวลเรื่องสินค้าที่ไม่ตรงความต้องการ"</p>
      </div>

      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt='' />
        <p className='font-semibold'>คืนสินค้าได้ภายใน 7 วัน</p>
        <p className='text-gray-400'>"ให้คุณมั่นใจในคุณภาพของสินค้า หากพบปัญหาหรือไม่พึงพอใจ สามารถคืนสินค้าได้ภายใน 7 วันหลังจากการซื้อ"</p>
      </div>

      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt='' />
        <p className='font-semibold'>พร้อมให้คำปรึกษาและช่วยเหลือ</p>
        <p className='text-gray-400'>"เรามีทีมงานพร้อมให้คำปรึกษาและช่วยเหลือคุณตลอดเวลา ไม่ว่าคุณจะมีคำถามหรือปัญหาใด ๆ ติดต่อเราได้เสมอ"</p>
      </div>

    </div>
  )
}

export default OurPolicy