import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img src={assets.ป้ายโลโก้} className='mb-5 w-32' alt='' />
          <p className='w-full md:w-2/3 text-gray-600'>
          มงคลสินพาณิชย์เป็นร้านวัสดุก่อสร้างที่ยึดมั่นในคุณภาพและบริการที่เป็นเลิศ เรามุ่งมั่นที่จะเป็นส่วนหนึ่งในการสร้างสรรค์ทุกโครงการของคุณด้วยวัสดุที่ได้มาตรฐาน พร้อมบริการให้คำแนะนำอย่างมืออาชีพ เราใส่ใจในทุกความต้องการของลูกค้า เพื่อให้ทุกการก่อสร้างเต็มไปด้วยความมั่นใจและคุณภาพ
          </p>
        </div>  

        <div>
          <p className='text-xl font-medium mb-5  text-[#d46d2c]'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li ><NavLink to='/'>หน้าแรก</NavLink></li>
            <li><NavLink to='/about'>เกี่ยวกับเรา</NavLink></li>
            <li>นโยบายความเป็นส่วนตัว</li>
          </ul>
        </div>

        <div>
        <p className='text-xl font-medium mb-5 text-[#d46d2c]'>ติดต่อเรา</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+66-111-222-3333</li>
            <li>CONTACT@มงคลสินพาณิชย์.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center text-[#d46d2c]'>Copyright 2024@ มงคลสินพาณิชย์.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
