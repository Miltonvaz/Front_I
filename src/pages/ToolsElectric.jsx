import React, { useState, useEffect } from 'react';
import Header from "../components/organismos/Header";
import CardsProduct from "../components/molecules/CardsProduct";
import "../pages/ToolsElectric.css";

function ToolsElectric() {
    const [userImageUrl, setUserImageUrl] = useState("/default-user-image.png");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3002/api/users`, { 
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
        fetch(`http://localhost:3002/api/products/electricos`, {
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
            <div className="all-toolselectric">
                <div className="h2-toolsmanuals">
                    <h2 id="id-h2manuals">Productos Eléctricos</h2>
                </div>
                <div className="tools-electric-cards">
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

export default ToolsElectric;
