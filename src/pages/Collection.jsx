import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem.jsx'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')
  const [currentPage, setCurrentPage] = useState(1) // สถานะหน้าปัจจุบัน
  const itemsPerPage = 16


  const toggleCategory = (e) => {  // ฟังก์ชันสำหรับสลับหมวดหมู่ที่เลือก
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {  // ฟังก์ชันสำหรับสลับประเภทย่อยที่เลือก
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {  // ฟังก์ชันกรองสินค้าตามเงื่อนไข
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
    setCurrentPage(1) // รีเซ็ตหน้ากลับไปที่หน้าแรกเมื่อมีการกรองใหม่
  };

  const sortProduct = (fpCopy) => {  // ฟังก์ชันสำหรับการเรียงลำดับสินค้า
    switch (sortType) {
      case 'low-high':
        return fpCopy.sort((a, b) => a.price - b.price);

      case 'high-low':
        return fpCopy.sort((a, b) => b.price - a.price);

      default:
        return fpCopy;  // เรียงลำดับตามค่าเริ่มต้น
    }
  };

  useEffect(() => {  // ใช้ useEffect เพื่อกรองสินค้าทุกครั้งที่หมวดหมู่, ประเภทย่อย, การค้นหา หรือสินค้ามีการเปลี่ยนแปลง
    if (products && products.length > 0) {
      applyFilter();
     // window.scrollTo(0, 0); // เลื่อนหน้าไปที่ด้านบนสุด
    }
  }, [products, category, subCategory, search, showSearch]);

  useEffect(() => {  // ใช้ useEffect เพื่อเรียงลำดับสินค้าหลังจากกรองเสร็จ
    let sortedProducts = sortProduct([...filterProducts]); // sort based on current filterProducts
    setFilterProducts(sortedProducts);

  }, [sortType]);

  // คำนวณสินค้าที่จะแสดงในหน้าปัจจุบัน
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filterProducts.slice(startIndex, endIndex)

  const totalPages = Math.ceil(filterProducts.length / itemsPerPage)

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          คัดกรองสินค้า
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt='' />
        </p>

        {/* Category Filter */}
        <div className={`border  border-black bg-orange-200 pl-5 py-3 mt-6  ${showFilter ? '' : 'hidden'} sm:block `}>
          <p className='mb-3 text-sm font-medium  '>หมวดหมู่สินค้า</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'เหล็ก'} onChange={toggleCategory} /> เหล็ก
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'วัสดุก่อสร้าง'} onChange={toggleCategory} /> วัสดุก่อสร้าง
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'งานระบบประปา'} onChange={toggleCategory} /> งานระบบประปา
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'กระเบื้อง/อุปกรณ์'} onChange={toggleCategory} /> กระเบื้อง/อุปกรณ์
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'เคมีภัณฑ์'} onChange={toggleCategory} /> เคมีภัณฑ์
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'อุปกรณ์ทาสี'} onChange={toggleCategory} /> อุปกรณ์ทาสี
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-black bg-orange-200 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block `}>
          <p className='mb-3 text-sm font-medium'>ประเภทสินค้า</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'เหล็กเพื่องานฐานราก'} onChange={toggleSubCategory} /> เหล็กเพื่องานฐานราก
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'เหล็กเพื่องานโครงสร้าง'} onChange={toggleSubCategory} /> หล็กเพื่องานโครงสร้าง
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'เหล็กแป๊ป'} onChange={toggleSubCategory} />เหล็กแป๊ป
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'สินค้าเหล็กใช้งานทั่วไป'} onChange={toggleSubCategory} />สินค้าเหล็กใช้งานทั่วไป
            </p>
            {/* วัสดุก่อสร้าง */}
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'ปูน/วัสดุเทพื้น'} onChange={toggleSubCategory} />ปูน/วัสดุเทพื้น
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'อิฐ/บล็อกปูพื้น'} onChange={toggleSubCategory} />อิฐ/บล็อกปูพื้น
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'หลังคา/อุปกรณ์หลังคา'} onChange={toggleSubCategory} />หลังคา/อุปกรณ์หลังคา
            </p>
            {/* งานระบบประปา */}
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'อุปกรณ์ประปา'} onChange={toggleSubCategory} />อุปกรณ์ประปา
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'ท่อน้ำประปา/อุปกรณ์ข้อต่อ'} onChange={toggleSubCategory} />ท่อน้ำประปา/อุปกรณ์ข้อต่อ
            </p>
            {/*กระเบื้อง/อุปกรณ์ */}
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'อุปกรณ์ติดตั้งกระเบื้อง'} onChange={toggleSubCategory} />อุปกรณ์ติดตั้งกระเบื้อง
            </p>
            {/* ฮาร์ดแวร์ เคมีภัณฑ์ */}
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'เคมีภัณฑ์ก่อสร้าง'} onChange={toggleSubCategory} />เคมีภัณฑ์ก่อสร้าง
            </p>
            {/* อุปกรณ์ทาสี*/}
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'แปรงทาสี'} onChange={toggleSubCategory} />แปรงทาสี
            </p>

          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'สินค้า'} text2={'ทั้งหมด'} />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border border-orange-400 bg-orange-100 text-sm px-2'>
            <option value="relavent">ตัวกรองราคาสินค้า</option>
            <option value="low-high">ราคา: สูง ไป ต่ำ</option>
            <option value="high-low">ราคา: ต่ำ ไป สูง</option>
          </select>
        </div>

        {/* แสดงสินค้าหลังจากกรอง */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {paginatedProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>

        {/* Pagination */}
        <div className='flex justify-center mt-6 gap-2'>
          <button
            onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); window.scrollTo(0, 100) }}
            disabled={currentPage === 1}
            className={`px-3 py-1 border ${currentPage === 1 ? 'bg-white text-gray-800' : 'bg-white text-gray-800'}`}
          >
            ก่อนหน้า
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(index + 1);
                window.scrollTo(0, 100);
              }
              }
              className={`px-3 py-1 border ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); window.scrollTo(0, 100); }}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border ${currentPage === totalPages ? 'bg-white text-gray-800' : 'bg-white text-gray-800'}`}
          >
            ถัดไป
          </button>
        </div>


      </div>
    </div>
  )
}

export default Collection
