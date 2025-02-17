import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            category: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]); // อัปเดต cartData ทุกครั้งที่ cartItems เปลี่ยน

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'ตะกร้า'} text2={'สินค้า'} />
      </div>

      <div>
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;

            return (
              <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                <div className="flex items-start gap-6">
                  <img className="w-16 sm:w-20" src={productData?.image?.[0] || assets.placeholder_image} alt="" />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{currency}{productData.price}</p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) => {
                    const newQuantity = Number(e.target.value);
                    if (newQuantity > 0) {
                      updateQuantity(item._id, item.category, newQuantity);
                    }
                  }}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  value={item.quantity} 
                />
                <img
                  onClick={() => updateQuantity(item._id, item.category, 0)} // ไม่ต้อง setTimeout
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt="Delete"
                />
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 mt-5">ไม่มีสินค้าในตะกร้า</p>
        )}
      </div>

      {cartData.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button onClick={() => navigate('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3">
                ยืนยันการสั่งสินค้า
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
