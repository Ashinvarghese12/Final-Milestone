import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    dispatch(addItem(item));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const truncateDescription = (description, maxLength = 100) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src="https://5.imimg.com/data5/SELLER/Default/2023/2/DV/US/TX/7633002/anime-t-shirts-500x500.jpg"
          alt="Shoes"
          className="h-60 w-full"
        />
      </figure>
      <div className="card-body bg-white">
        <h2 className="card-title text-black">{item.title}</h2>
        <p className='text-black'>{truncateDescription(item.description)}</p>
        <p className="text-lg text-black font-medium">{item.category?.name}</p>
        <p className="text-2xl text-black font-medium">${item.price}</p>
        <div className="card-actions justify-end">
          <button
            className={`btn ${addedToCart ? 'btn-accent' : 'btn-primary'} text-black`}
            onClick={handleAddToCart}
            disabled={addedToCart}
            
          >
            {addedToCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;







































// // components/ProductCard.js
// import { useDispatch } from 'react-redux';
// import { addItem } from '../redux/slices/cartSlice';

// const ProductCard = ({ item }) => {
//   const dispatch = useDispatch();

//   const handleAddToCart = () => {
//     dispatch(addItem(item));
//   };

//   const truncateDescription = (description, maxLength = 100) => {
//     if (description.length > maxLength) {
//       return description.substring(0, maxLength) + '...';
//     }
//     return description;
//   };

//   return (
//     <div className="card card-compact bg-base-100 w-96 shadow-xl">
//       <figure>
//         <img
//           src="https://5.imimg.com/data5/SELLER/Default/2023/2/DV/US/TX/7633002/anime-t-shirts-500x500.jpg"
//           alt="Shoes"
//           className="h-60 w-full"
//         />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">{item.title}</h2>
//         <p>{truncateDescription(item.description)}</p>
//         <p className="text-2xl font-medium">${item.price}</p>
//         <div className="card-actions justify-end">
//           <button className="btn btn-primary" onClick={handleAddToCart}>
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;