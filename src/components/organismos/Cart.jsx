import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userImageUrl, setUserImageUrl] = useState("/default-user-image.png");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/users/clientes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            },
        })
        .then(response => response.json())
        .then(users => {
            const email = localStorage.getItem('email');
            const currentUser = users.find(user => user.email === email);

            if (currentUser) {
                setUserImageUrl(currentUser.url || "/default-user-image.png");
            }
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            setLoading(false);
        });

        const items = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(items);
        calculateTotalPrice(items);
    }, []);

    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
        setTotalPrice(total);
    };

    const handleRemoveItem = (itemId) => {
        const updatedItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        calculateTotalPrice(updatedItems);
    };

    const handleConfirmPurchase = () => {
        navigate('/order-confirmation');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header img={userImageUrl} />
            <div className="cart">
                {cartItems.length === 0 ? (
                    <p>No hay productos en el carrito.</p>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item-card">
                                    <img src={item.url || "/default-product-image.png"} alt={item.text} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h3>{item.text}</h3>
                                        <p>{item.name}</p>
                                        <p>Precio: ${Number(item.price || 0).toFixed(2)}</p>
                                        <p>Cantidad: {Number(item.quantity || 0)}</p>
                                        <p>Total: ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</p>
                                        <button className="cart-item-remove" onClick={() => handleRemoveItem(item.id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h3>Precio Total: ${totalPrice.toFixed(2)}</h3>
                            <button className="confirm-purchase-button" onClick={handleConfirmPurchase}>
                                Confirmar Compra
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Cart;
