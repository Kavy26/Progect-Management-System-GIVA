import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">MyShop</h2>
      <ul className="nav-links">
        <li> <a href="/"> Home</a></li>
        <li><a href="/Products">Products</a></li>
        <li> <a href="/addproduct"> Add Product</a></li>
        <li> <a href="/deleteproduct"> Delete Product</a></li>
        <li> <a href="/getproduct"> Edit Product</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
