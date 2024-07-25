import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organismos/Header';
import Footer from '../components/organismos/Footer';
import Swal from 'sweetalert2'; 
import './OrderConfirmation.css';
import PayPalButton from '../components/atoms/PayPalButton';

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const [userImageUrl, setUserImageUrl] = useState("/default-user-image.png");
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState({ street: '', city: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        })
        .catch(error => console.error("Error fetching user data:", error))
        .finally(() => setLoading(false));

        const items = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(items);
    }, []);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress(prevAddress => ({ ...prevAddress, [name]: value }));
    };

    const handleFinishOrder = () => {
        const invalidProducts = cartItems.filter(item => !item.product_id);
        if (invalidProducts.length > 0) {
            setError('Algunos productos tienen un ID no definido.');
            Swal.fire('Error', 'Algunos productos tienen un ID no definido.', 'error'); 
            return;
        }

        const order = { 
            products: cartItems.map(item => ({
                id: item.product_id,  
                cantidad: item.quantity
            })),
            user_id_fk: parseInt(localStorage.getItem('userId')), 
            street: address.street,
            city: address.city
        };

        console.log("Enviando orden:", order);

        fetch(`${import.meta.env.VITE_API_URL}/api/purchaseOrders`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(order),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
        })
        .then(data => {
            if (data.message === 'Invalid user_id_fk') {
                setError('El ID de usuario es inválido.');
                Swal.fire('Error', 'El ID de usuario es inválido.', 'error');
            } else if (data.message === 'Product with ID undefined not found') {
                setError('Uno o más productos no se encontraron.');
                Swal.fire('Error', 'Uno o más productos no se encontraron.', 'error'); 
            } else {
                console.log("Order placed successfully:", data);
                Swal.fire('Éxito', 'Su pedido ha sido realizado con éxito.', 'success'); 
                localStorage.removeItem('cart');
                navigate('/start');
            }
        })
        .catch(error => {
            console.error("Error placing order:", error);
            setError('Error al realizar el pedido.');
            Swal.fire('Error', 'Error al realizar el pedido.', 'error');
        });
    };

    const handleCancelOrder = () => {
        localStorage.removeItem('cart');
        navigate('/start'); // Redirige al usuario a la página de inicio o a otra página de tu elección
    };
    
    const totalValue = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header img={userImageUrl} />
            <div className="order-confirmation-page">
                <h2>Confirmación de Pedido</h2>
                <p>¡Gracias por su compra! Su pedido ha sido procesado con éxito.</p>

                {error && <div className="error-message">{error}</div>}

                {cartItems.length > 0 && (
                    <div className="order-summary">
                        <h3>Resumen de su Pedido</h3>
                        <div className="order-summary-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="order-summary-item">
                                    <img src={item.url || "/default-product-image.png"} alt={item.text} className="order-summary-item-image" />
                                    <div className="order-summary-item-details">
                                        <h4>{item.text}</h4>
                                        <p>Precio: ${item.price.toFixed(2)}</p>
                                        <p>Cantidad: {item.quantity}</p>
                                        <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="order-confirmation-summary">
                            <h3>Total: ${totalValue}</h3>
                        </div>
                    </div>
                )}

                <div className="address-form">
                    <h3>Detalles de Envío</h3>
                    <label>
                        Calle:
                        <input type="text" name="street" value={address.street} onChange={handleAddressChange} />
                    </label>
                    <label>
                        Ciudad:
                        <input type="text" name="city" value={address.city} onChange={handleAddressChange} />
                    </label>
                </div>

                <button className="finish-order-button" onClick={handleFinishOrder}>
                    Finalizar Pedido
                </button>

                <button className="cancel-order-button" onClick={handleCancelOrder}>
                    Cancelar
                </button>

                <div className="paypal-button-container">
                    <PayPalButton totalValue={totalValue} invoice="Productos"/>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default OrderConfirmation;
