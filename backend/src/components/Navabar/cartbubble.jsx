import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import { mycontext } from '../Context';
import './cartbubble.css'; // Include your CSS

const CartIcon = () => {
  const { cartItems } = useContext(mycontext);
  
  const totalItems = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

  return (
<div>
    <Link to="/cart" className="cart-link">
      <BsCart4 className="cart-icon" />
      {totalItems > 0 && (
        <div className="cart-bubble">
          <span>{totalItems}</span>
        </div>
      )}
    </Link>
</div>
  );
};

export default CartIcon;
