import React, { useState, useEffect } from 'react';
import Header from "../components/organismos/Header";
import CardsProduct from "../components/molecules/CardsProduct";
import "../pages/Materials.css";

function Materials() {
    const [userImageUrl, setUserImageUrl] = useState("/default-user-image.png");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3002/api/users/clientes`, { 
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
            } else {
                setUserImageUrl("/default-user-image.png");
            }
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3002/api/products/construccion`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then(data => {
            setData(data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header img={userImageUrl} />
            <div className="all-materials">
                <div className="h2-materials">
                    <h2 id="id-h2materials">Materiales de construcción</h2>
                </div>
                <div className="materials-cards">
                    {data.map(element => (
                        <CardsProduct 
                            key={element.id} 
                            text={element.name} 
                            imageUrl={element.url}
                            price={element.price}
                            stock={element.stock}
                            id={element.product_id}     
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Materials;
