import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>      

      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'ติดต่อ'} text2={'เรา'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt='' />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>ร้านค้าของเรา</p>
          <p className='text-gray-500'>6/13 หมู่ที่9 <br/>ถ.สหกรณ์ ต.โคกขาม อ.เมือง จ.สมุทรสาคร </p>
          <p className='text-gray-500'>Tel: 084-3887349 <br/>Email: artitaya@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>สมัครได้ที่ มงคลสิน</p>
          <p className='text-gray-500'>ขณะนี้ปิดรับสมัครพนักงาน.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Expore Jobs</button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact