import React, { useState, useEffect } from 'react';
import Header from "../components/organismos/Header";
import "../pages/Contacto.css";
import Footer from "../components/organismos/Footer";

function Contacto() {
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
            console.log("Fetched Users:", users);  

 
            const email = localStorage.getItem('email');
            console.log("Stored Email:", email);  


            const currentUser = users.find(user => user.email === email);

            if (currentUser) {
                console.log("Selected User:", currentUser);  
                setUserImageUrl(currentUser.url || "/default-user-image.png");
            } else {
                console.error("User not found");
                setUserImageUrl("/default-user-image.png");
            }
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header img={userImageUrl} />
            <div className="fatherAll">
                <div className="all-contacto">
                    <div className="h1-contacto">
                        <h1>UBICACION</h1>
                    </div>
                    <div className="text-contacto">
                        <p>
                            Ferretería "Román" <br />
                            Dirección: 11A. Calle Sur Pte 11-62, Nicalocok, 30068 Comitán de Domínguez, Chis.<br />
                            Tel: 800 888 877 <br />
                            RomanFerreteria@gmail.com
                        </p>
                    </div>
                    <div className="siguenos">
                    </div>
                </div>
                <div className="img-contacto">
                    <img src="/ferreteriaContact.jpeg" alt="Ferretería Contact" />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Contacto;
