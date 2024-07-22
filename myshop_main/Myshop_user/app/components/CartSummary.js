import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/slices/cartSlice';

const CartSummary = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div>
      <h2>Cart Summary</h2>
      {cart.map(item => (
        <div key={item.id}>
          <p>{item.name} - {item.quantity}</p>
          <button onClick={() => handleRemove(item.id)}>Remove</button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default CartSummary;
