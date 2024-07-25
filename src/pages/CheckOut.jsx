import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../components/organismos/Header";
import Footer from "../components/organismos/Footer";
import Cart from '../components/organismos/Cart';
import './CheckOut.css';

function Checkout() {
    const { product_id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userImageUrl, setUserImageUrl] = useState("/default-user-image.png");

    useEffect(() => {
        if (product_id) {
            fetch(`${import.meta.env.VITE_API_URL}/api/products/${product_id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setProduct(data);
                    setTotalPrice((data.price || 0) * quantity);
                }
            })
            .catch(error => console.log(error));
        }
    }, [product_id]);

    useEffect(() => {
        if (product) {
            console.log(`Product ID: ${product.product_id}`);
            setTotalPrice((product.price || 0) * quantity);
        }
    }, [quantity, product]);
    

    const handleQuantityChange = (event) => {
        const newQuantity = Math.max(1, Math.min(event.target.value, product?.stock || 1));
        setQuantity(newQuantity);
    };

    const addToCart = (product, quantity) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.product_id === product.product_id);
    
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += quantity;
            console.log(`Updated quantity for product ID ${product.product_id}`);
        } else {
            cart.push({ ...product, quantity });
            console.log(`Added new product ID ${product.product_id} to cart`);
        }
    
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart:', cart);
    };
    
    const handleConfirm = () => {
        if (product) {
            addToCart(product, quantity);
            console.log('Product confirmed:', product);
            navigate('/order-confirmation');
        }
    };
    
    const handleContinueShopping = () => {
        if (product) {
            addToCart(product, quantity);
            navigate('/start');
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    const price = product.price || 0;
    const formattedPrice = price.toFixed(2);
    const formattedTotalPrice = totalPrice.toFixed(2);

    return (
        <>
            <Header img={userImageUrl} />
            <div className="checkout-page">
                <h2>Confirmar Compra</h2>
                <div className="checkout-item">
                    <img src={product.url || "/default-product-image.png"} alt={product.name} className="checkout-item-image" />
                    <h3>{product.name}</h3>
                    <p>Precio: ${formattedPrice}</p>
                    <p>Stock Disponible: {product.stock}</p>
                    <input
                        type="number"
                        value={quantity}
                        min="1"
                        max={product.stock}
                        onChange={handleQuantityChange}
                        className="checkout-item-quantity"
                    />
                    <p>Precio Total: ${formattedTotalPrice}</p>
                    <button className="checkout-confirm-button" onClick={handleConfirm}>
                        Confirmar Compra
                    </button>
                    <button className="checkout-continue-button" onClick={handleContinueShopping}>
                        Seguir Comprando
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Checkout;
