import React, { useState } from 'react';
import '../styles/AddProductForm.css'


const AddProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      price: parseFloat(price),  // Ensure price is a number
      quantity: parseInt(quantity, 10), // Ensure quantity is an integer
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Product added:', data);
      // Reset form fields after successful submission
      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} enctype="multipart/form-data">
      <h2>Add New Product</h2>
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
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
