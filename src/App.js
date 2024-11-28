import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider,extendTheme } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';

import './App.css';

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};
const theme = extendTheme({
  config
});
function App() {
  
  const [cartItems, setCartItems] = useState([]);
  const products = [
    { id: 1, name: 'لوحة أم', price: 100, image: 'motherboard.jpg' },
    { id: 2, name: 'معالج', price: 150, image: 'processor.jpg' },
  ];

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };
  return (
    <ChakraProvider theme={theme}>
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
    </ChakraProvider>
  );
}

export default App;
