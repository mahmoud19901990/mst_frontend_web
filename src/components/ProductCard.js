import React from 'react';

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} ريال</p>
      <button onClick={() => addToCart(product)}>أضف إلى السلة</button>
    </div>
  );
}

export default ProductCard;
