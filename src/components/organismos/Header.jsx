import React, { useState, useEffect } from "react";
import Nav from "../molecules/nav";
import "../organismos/Header.css";

function Header({ img, showImage = true }) {
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItemsCount(cartItems.length);
    }, []);

    const handleCartClick = () => {
        window.location.href = '/cart';
    };

    return (
        <div className="all-Header">
            <div className="img-phone">
                <div className="Nombre">
                    <h1>Ferreteria Roman</h1>
                </div>
                <div className="usuario">
                    {showImage && <img src={img || "/default-user-image.png"} alt="User" />}
                </div>
                <div className="cart-icon" onClick={handleCartClick}>
                    <img src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" alt="Carrito" />
                    {cartItemsCount > 0 && (
                        <span className="cart-count">{cartItemsCount}</span>
                    )}
                </div>
            </div>
           
            <div className="Nav">
                <Nav />
            </div>
        </div>
    );    
}

export default Header;
