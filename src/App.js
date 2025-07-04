import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './Pages/Home';
import Products from './Pages/Products';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import View from './Pages/View';
import Tickets from './Pages/Tickets';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div>
      <BrowserRouter>
        <Header />
<ToastContainer
position="top-right"
autoClose={3000}

theme="colored"

/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/view" element={<View />} />
          <Route path="/tickets" element={<Tickets />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
