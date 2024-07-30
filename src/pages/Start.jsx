import React, { useState, useEffect } from 'react';
import Header from '../components/organismos/Header';
import Footer from '../components/organismos/Footer';
import CardsProduct from '../components/molecules/CardsProduct';
import '../pages/Start.css';

function Start() {
    const [userImageUrl, setUserImageUrl] = useState("");
    const [loadingUser, setLoadingUser] = useState(true);
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
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
                console.log("Current user:", currentUser);  
                setUserImageUrl(currentUser.url || "/default-user-image.png");
            } else {
                setUserImageUrl("/default-user-image.png");
            }
            setLoadingUser(false);
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            setLoadingUser(false);
        });

        fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(response => response.ok ? response.json() : Promise.reject('Error en la solicitud: ' + response.statusText))
        .then(data => {
            console.log('Productos recibidos:', data); 
            setProducts(data);
            setLoadingProducts(false);
        })
        .catch(error => {
            setError(error.message);
            setLoadingProducts(false);
        });
    }, []);

    if (loadingUser || loadingProducts) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Header img={userImageUrl} />

            <div className="slider-box">
                <ul>
                    <li><img src="/ventaStart1.png" alt="Promoción 1" /></li>
                    <li><img src="/ventaStart2.png" alt="Promoción 2" /></li>
                    <li><img src="/ventaStart3.png" alt="Promoción 3" /></li>
                </ul>
            </div>

            <div className="h2-stardiv"></div>
            <h2 id="h2-start">Explora nuestras marcas</h2>
            <h3>Tenemos más de 13,000 productos en catálogo con 7 marcas especializadas por segmento</h3>

            <div className="box-general">
                <div className="caja" id="truper-box">
                    <p>TRUPER</p>
                </div>
                <div className="caja" id="pretul-box">
                    <p>PRETUL</p>
                </div>
                <div className="caja" id="foset-box">
                    <p>FOSET</p>
                </div>
                <div className="caja" id="fiero-box">
                    <p>FIERO</p>
                </div>
            </div>

            <h2 id="h2-start">Lo más nuevo</h2>

            <div className="container-video">
                <div className="frame-video">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/fl72NDMD6wc?si=OLmy8bgG6_ogM6g8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                <div className="frame-video">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/J3uv0-fZRqk?si=rdYemjhAf6EnJwG-" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
            </div>

            <h2 id="h2-start">Productos destacados</h2>

            <div className="container-productos">
                {products.slice(0, 5).map(product => (
                    <div className="box-productos" key={product.id}>
                        <CardsProduct 
                            text={product.name} 
                            imageUrl={product.url} 
                            price={product.price} 
                            stock={product.stock} 
                            id={product.product_id} 
                        />
                    </div>
                ))}
            </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            <Footer />
        </>
    );
}

export default Start;
