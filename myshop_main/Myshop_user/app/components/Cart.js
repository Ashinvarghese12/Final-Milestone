'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems, removeItem, updateQuantity, clearCart } from '../redux/slices/cartSlice';
import CheckOut from '@/public/image/checkout.png';
import Link from 'next/link';

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      dispatch(setCartItems(savedCartItems));
      setIsLoading(false); // Set loading state to false after fetching items
    }
  }, [dispatch]);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
    dispatch(clearCart());
  };

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-4" style={{ height: 'calc(100vh - 77px)' }}>
      <h2 className="text-4xl text-black font-semibold mb-4">Shopping Cart</h2>
      {isLoading ? (
        <p className='text-center text-xl text-gray-500 font-serif'>
          Loading your cart...
        </p>
      ) : items.length === 0 ? (
        <p className='text-center text-5xl text-gray-500 font-serif'>
          Your cart is empty. <br />
          <span className='pt-1 text-base'>Shop with us for the exclusive collections</span>
        </p>
      ) : (
        <>
          <div className="px-32 gap-4 mb-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg shadow-md">
                <div className='flex gap-10'>
                  <img
                    src="https://5.imimg.com/data5/SELLER/Default/2023/2/DV/US/TX/7633002/anime-t-shirts-500x500.jpg"
                    alt="Shoes"
                    className="h-16 w-16 rounded-full"
                  />
                  <h3 className="text-xl text-black font-semibold pt-4">{item.title}</h3>
                  <p className="text-lg text-black pt-4">${item.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="text-lg text-black">{item.quantity}</span>
                  <button
                    className="btn btn-primary ml-2"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-error ml-4"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center px-32 p-4">
            <span className="text-xl text-black font-semibold">Total Amount: ${totalPrice.toFixed(2)}</span>
            <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
            <h2 className="text-3xl text-black font-bold mb-6 text-center">Have a nice day and do purchase with us again!</h2>
            <img src={CheckOut.src} alt="Thank you" className="mb-6 mx-auto" />
            <Link href='/'><button className="btn btn-primary text-black">Home</button></Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;









































// 'use client';
// import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeItem, updateQuantity, clearCart } from '../redux/slices/cartSlice';
// import CheckOut from '@/public/image/checkout.png'
// import Link from 'next/link';


// const Cart = () => {
//   const items = useSelector(state => state.cart.items);
//   const dispatch = useDispatch();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleRemoveItem = (id) => {
//     dispatch(removeItem(id));
//   };

//   const handleUpdateQuantity = (id, quantity) => {
//     if (quantity > 0) {
//       dispatch(updateQuantity({ id, quantity }));
//     }
//   };

//   const handleCheckout = () => {
//     setIsModalOpen(true);
//     dispatch(clearCart());
//   };



//   const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <div className="p-4 " style={{ height: 'calc(100vh - 77px)' }}>
//       <h2 className="text-4xl text-black font-semibold mb-4">Shopping Cart</h2>
//       {items.length === 0 ? (
//         <p className='text-center text-5xl text-gray-500 font-serif'>Your cart is empty. <br></br>
//           <span className='pt-1 text-base'>Shop with us for the exclusive collections</span></p>
//       ) : (
//         <>
//           <div className=" px-32 gap-4 mb-4">
//             {items.map(item => (
//               <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg shadow-md">
//                 <div className='flex gap-10'>
//                   <img
//                     src="https://5.imimg.com/data5/SELLER/Default/2023/2/DV/US/TX/7633002/anime-t-shirts-500x500.jpg"
//                     alt="Shoes"
//                     className="h-16 w-16 rounded-full"
//                   />
//                   <h3 className="text-xl text-black font-semibold pt-4">{item.title}</h3>
//                   <p className="text-lg text-black pt-4">${item.price}</p>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <button
//                     className="btn btn-primary mr-2"
//                     onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
//                   >
//                     -
//                   </button>
//                   <span className="text-lg text-black">{item.quantity}</span>
//                   <button
//                     className="btn btn-primary ml-2"
//                     onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
//                   >
//                     +
//                   </button>
//                   <button
//                     className="btn btn-error ml-4"
//                     onClick={() => handleRemoveItem(item.id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between items-center px-32 p-4 ">
//             <span className="text-xl text-black font-semibold">Total Amount : ${totalPrice.toFixed(2)}</span>
//             <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
//           </div>
//         </>
//       )}

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 ">
//             <h2 className="text-3xl text-black font-bold mb-6 text-center">Have a nice and do purchase with us again!</h2>
//             <img src={CheckOut.src} alt="Thank you" className="mb-6 mx-auto" />
//             <Link href='/'><button className="btn btn-primary text-black " >Home</button></Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;





