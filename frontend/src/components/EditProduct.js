import React, { useState } from 'react';
import '../styles/EditProduct.css';

const GetAndEditProductForm = () => {
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleGetProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:5000/getProductDetails?id=${productId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data && Array.isArray(data) && data.length >= 4) {
        setProductData(data);
        setName(data[1]);
        setDescription(data[2]);
        setPrice(data[3]);
        setQuantity(data[4]);
      } else {
        alert('Product not found');
        setProductData(null);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Error fetching product. Please check the console for more details.');
    }
  };

const handleEditProduct = async (e) => {
    e.preventDefault();
  
    const updatedProduct = {
      id: productId,
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    };
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.log('Response:', text);
        alert(text);
        return;
      }
  
      console.log('Product updated:', data);
      alert('Product updated successfully');
      setProductId('');
      setProductData(null);
      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please check the console for more details.');
    }
  };
  

  return (
    <div>
      <form onSubmit={handleGetProduct}>
        <h2>Get Product</h2>
        <div>
          <label>
            Product ID:
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Get Product</button>
      </form>

      {productData && (
        <form onSubmit={handleEditProduct} style={{ marginTop: '20px' }}>
          <h2>Edit Product</h2>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Price:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Update Product</button>
        </form>
      )}
    </div>
  );
};

export default GetAndEditProductForm;
