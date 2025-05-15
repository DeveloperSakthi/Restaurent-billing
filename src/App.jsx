import React, { useState, useEffect } from 'react';
import Menu from './components/Menu.jsx';
import Cart from './components/Cart.jsx';
import { db } from './firebaseConfig.js';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
  });
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch menu items from Firestore
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const menuCollection = collection(db, 'menu');
        const menuSnapshot = await getDocs(menuCollection);
        const menuList = menuSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMenuItems(menuList);
      } catch (error) {
        console.error("Error fetching menu items: ", error);
        // Fallback data if Firestore fetch fails
        setMenuItems([
          { id: "1", name: "Pizza", price: 150 },
          { id: "2", name: "Burger", price: 90 },
          { id: "3", name: "Pasta", price: 120 },
          { id: "4", name: "Salad", price: 80 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const addNewItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) {
      alert("Please fill in all item details.");
      return;
    }

    const itemToAdd = {
      name: newItem.name,
      price: parseInt(newItem.price),
    };

    try {
      const docRef = await addDoc(collection(db, 'menu'), itemToAdd);
      setMenuItems([...menuItems, { id: docRef.id, ...itemToAdd }]);
      setNewItem({ name: '', price: '' });
      setShowAddItemForm(false);
      alert("Item added successfully!");
    } catch (error) {
      console.error("Error adding new item: ", error);
      alert("Failed to add item. Please try again.");
    }
  };

  const handleCheckout = async () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0, 0);
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!showCheckoutForm) {
      setShowCheckoutForm(true);
      return;
    }

    // Validate customer details
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.email) {
      alert("Please fill in all customer details.");
      return;
    }

    // Prepare order data
    const order = {
      items: cart,
      total: total,
      customer: customerDetails,
      timestamp: new Date().toISOString(),
    };

    try {
      // Save order to Firestore
      await addDoc(collection(db, 'orders'), order);
      alert(`Order placed successfully! Total: ₹${total}`);
      setCart([]);
      setCustomerDetails({ name: '', phone: '', email: '' });
      setShowCheckoutForm(false);
    } catch (error) {
      console.error("Error saving order: ", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const cancelCheckout = () => {
    setShowCheckoutForm(false);
    setCustomerDetails({ name: '', phone: '', email: '' });
  };

  const cancelAddItem = () => {
    setShowAddItemForm(false);
    setNewItem({ name: '', price: '' });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <h1 className="app-title">
        <span role="img" aria-label="plate">🍽️</span> Restaurant Billing System
      </h1>
      <div className="content">
        <div className="menu-section">
          <div className="menu-header">
            <h2>Menu</h2>
            <button className="add-item-button" onClick={() => setShowAddItemForm(true)}>
              Add New Item
            </button>
          </div>
          {showAddItemForm && (
            <form className="add-item-form" onSubmit={addNewItem}>
              <h3>Add New Menu Item</h3>
              <input
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleNewItemChange}
                placeholder="Item Name"
                required
              />
              <input
                type="number"
                name="price"
                value={newItem.price}
                onChange={handleNewItemChange}
                placeholder="Price (₹)"
                required
              />
              <div className="form-buttons">
                <button type="submit">Add Item</button>
                <button type="button" onClick={cancelAddItem}>Cancel</button>
              </div>
            </form>
          )}
          <Menu menuItems={menuItems} addToCart={addToCart} />
        </div>
        <div className="cart-section">
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            onCheckout={handleCheckout}
            showCheckoutForm={showCheckoutForm}
            customerDetails={customerDetails}
            handleCustomerDetailsChange={handleCustomerDetailsChange}
            cancelCheckout={cancelCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default App;