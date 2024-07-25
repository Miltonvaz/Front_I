import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './CardsProduct.css';
function CardsProduct({ text, imageUrl, price = 0, stock, id }) {
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (id) { 
            console.log(`Navigating to checkout with product ID ${id}`);
            navigate(`/checkout/${id}`);
        } else {
            console.error('ID del producto no definido');
        }
    };

    return (
        <div className="card-product">
            <div className="card-product-image-container">
                <img src={imageUrl || "/default-product-image.png"} alt={text} className="card-product-image" />
            </div>
            <div className="card-product-details">
                <h3 className="card-product-text">{text}</h3>
                <p className="card-product-price">Price: ${price.toFixed(2)}</p>
                <p className="card-product-stock">{stock > 0 ? `Stock: ${stock}` : "Out of stock"}</p>
                <button 
                    className="card-product-button" 
                    onClick={handleAddToCart} 
                    disabled={stock <= 0}
                >
                    Apartar
                </button>
            </div>
        </div>
    );
}


CardsProduct.propTypes = {
    text: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    stock: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
};

export default CardsProduct;
