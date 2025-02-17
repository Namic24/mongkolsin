import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);

  // ฟังก์ชันดึงข้อมูลสินค้าจาก productId
  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image?.[0] || ''); // ตั้งค่ารูปภาพเริ่มต้น
    }
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo(0, 0); // เลื่อนหน้าไปที่ด้านบนสุด
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10">
      {/* -------- ข้อมูลสินค้า ---------- */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* รูปภาพสินค้า */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full">
            {productData.image?.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                src={item}
                alt={`รูปภาพสินค้า ${index + 1}`}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="รูปภาพที่เลือก" />
          </div>
        </div>

        {/* ข้อมูลสินค้า */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122 รีวิว)</p>
          </div>
          
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {selectedSize?.price || productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {/* ตัวเลือกขนาดสินค้า 
          <div className="flex flex-col gap-4 my-8">
            <p>เลือกขนาด</p>
            <div className="flex gap-2">
              {productData.sizes?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === selectedSize ? 'border-orange-500' : ''
                  }`}
                >
                  {item.size} - {currency}
                  {item.price}
                </button>
              ))}
            </div>
          </div>
          */}

          {/* ปุ่มเพิ่มในตะกร้า */}
          <button
            onClick={() => {
              const sizeToAdd = selectedSize || productData.sizes?.[0]; // ใช้ไซต์แรกหากไม่ได้เลือกไซต์
              addToCart(productData._id, sizeToAdd || {});
            }}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 mt-4"
          >
            เพิ่มในตะกร้า
          </button>

          {/* ข้อมูลเพิ่มเติม */}
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>สินค้าของแท้ 100%</p>
            <p>ชำระเงินปลายทางได้สำหรับสินค้านี้</p>
            <p>นโยบายการคืนและเปลี่ยนสินค้าภายใน 7 วัน</p>
          </div>
        </div>
      </div>

      {/* คำอธิบายและรีวิวสินค้า */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">คำอธิบาย</b>
          <p className="border px-5 py-3 text-sm">รีวิว (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            เว็บไซต์อีคอมเมิร์ซคือแพลตฟอร์มออนไลน์ที่ช่วยให้การซื้อขายสินค้าและบริการบนอินเทอร์เน็ตสะดวกและง่ายขึ้น...
          </p>
        </div>
      </div>

      {/* สินค้าที่เกี่ยวข้อง */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
