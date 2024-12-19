import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile'; // استيراد صفحة الملف الشخصي

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
});

function App() {
  const [user, setUser] = useState(null); // حالة تسجيل المستخدم
  const [cartItems, setCartItems] = useState([]); // المنتجات في السلة

  // قائمة المنتجات
  const products = [
    { id: 1, name: 'لوحة أم', price: 100, image: 'motherboard.jpg', serial: 'abc123' },
    { id: 2, name: 'معالج', price: 150, image: 'processor.jpg', serial: 'def456' },
    { id: 3, name: 'ذواكر RAM', price: 75, image: 'ram.jpg', serial: 'ghi789' },
    { id: 4, name: 'مزود طاقة', price: 120, image: 'psu.jpg', serial: 'jkl012' },
    { id: 5, name: 'كرت شاشة', price: 400, image: 'gpu.jpg', serial: 'mno345' },
  ];

  // دالة تسجيل الدخول
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // دالة تسجيل الخروج
  const handleLogout = () => {
    setUser(null);
    setCartItems([]); // مسح السلة عند تسجيل الخروج
  };

  // إضافة منتج إلى السلة
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  // إزالة منتج من السلة
  const removeFromCart = (serial) => {
    setCartItems(cartItems.filter((item) => item.serial !== serial));
  };

  // تحديث بيانات المستخدم
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  // حساب السعر الكلي
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <NavBar user={user} onLogout={handleLogout} />
        <Routes>
          {/* الصفحة الرئيسية */}
          <Route path="/" element={<Home addToCart={addToCart} />} />

          {/* صفحة تسجيل الدخول */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* صفحة المنتجات: متاحة للجميع */}
          <Route
            path="/products"
            element={<Products products={products} addToCart={addToCart} />}
          />

          {/* صفحة السلة */}
          <Route
            path="/cart"
            element={
              user ? <Cart cartItems={cartItems} removeFromCart={removeFromCart} /> : <Navigate to="/login" />
            }
          />

          {/* صفحة الدفع */}
          <Route
            path="/checkout"
            element={user ? <Checkout cartItems={cartItems} totalPrice={totalPrice} /> : <Navigate to="/login" />}
          />

          {/* صفحة الملف الشخصي */}
          <Route
            path="/profile"
            element={
              user ? (
                <UserProfile user={user} updateUser={updateUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* إذا كانت الصفحة غير موجودة، الانتقال إلى الصفحة الرئيسية */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
