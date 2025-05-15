import React from 'react';

const Cart = ({ cart, removeFromCart, onCheckout, showCheckoutForm, customerDetails, handleCustomerDetailsChange, cancelCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0, 0);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="cart-list">
        {cart.length > 0 ? (
          <>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">₹{item.price}</span>
                </div>
                <button className="remove-button" onClick={() => removeFromCart(index)}>
                  Remove
                </button>
              </div>
            ))}
            <div className="cart-total">
              <strong>Total: ₹{total}</strong>
            </div>
            {showCheckoutForm && (
              <div className="checkout-form">
                <h3>Customer Details</h3>
                <input
                  type="text"
                  name="name"
                  value={customerDetails.name}
                  onChange={handleCustomerDetailsChange}
                  placeholder="Name"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={customerDetails.phone}
                  onChange={handleCustomerDetailsChange}
                  placeholder="Phone Number"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={customerDetails.email}
                  onChange={handleCustomerDetailsChange}
                  placeholder="Email"
                  required
                />
                <div className="form-buttons">
                  <button onClick={onCheckout}>Confirm Order</button>
                  <button onClick={cancelCheckout}>Cancel</button>
                </div>
              </div>
            )}
            {!showCheckoutForm && (
              <button className="checkout-button" onClick={onCheckout}>
                Checkout
              </button>
            )}
          </>
        ) : (
          <p>Cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;