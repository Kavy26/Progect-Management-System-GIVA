import React from 'react';
import '../styles/Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1>Your One-Stop Online Shop</h1>
        <p>Explore exclusive deals on top-quality products tailored just for you.</p>
        <button className="shop-now-btn"><a href="/products"> Shop Now</a></button>
      </div>
    </div>
  );
};

export default Banner;
