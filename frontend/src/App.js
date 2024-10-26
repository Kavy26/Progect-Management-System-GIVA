import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import Banner from './components/Banner';
import DeleteProductForm from './components/DeleteProductForm';
import GetAndEditProductForm from './components/EditProduct';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Banner/>} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/addproduct" element={<AddProductForm />} />
          <Route path="/deleteproduct" element={<DeleteProductForm />} />
          <Route path="/getproduct" element={<GetAndEditProductForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
