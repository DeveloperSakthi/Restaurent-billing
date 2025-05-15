import React from 'react';

const Menu = ({ menuItems, addToCart }) => {
  return (
    <div className="menu">
      <div className="menu-list">
        {menuItems.length > 0 ? (
          menuItems.map(item => (
            <div key={item.id} className="menu-item">
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-price">₹{item.price}</span>
              </div>
              <button className="add-button" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No menu items available.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;