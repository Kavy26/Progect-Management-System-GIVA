import React, { useState } from 'react';
import '../styles/DeleteProductForm.css';

const DeleteProductForm = () => {
  const [productId, setProductId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Product deleted:', data);
      setProductId('');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Delete Product</h2>
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
      <button type="submit">Delete Product</button>
    </form>
  );
};

export default DeleteProductForm;
