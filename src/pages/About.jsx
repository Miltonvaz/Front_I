import React, { useState, useEffect } from 'react';
import Header from "../components/organismos/Header";
import "../pages/About.css";
import Footer from "../components/organismos/Footer";

function About() {
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
            <div className="all-about">
                <div className="right-about">
                    <h1 className="titulo">Nosotros</h1>
                    <h2 className="subtitulo">Somos una ferretería única e inigualable</h2>
                    <p id="p-about">
                        En Ferretería "Román", nos enorgullece ser tu proveedor de confianza para todas tus 
                        necesidades de construcción y mejoras del hogar. Nuestra ferretería ha crecido para convertirse en
                        un referente en la comunidad, ofreciendo productos de alta calidad y un servicio al cliente 
                        excepcional. Nuestra misión es proporcionar a nuestros clientes una amplia gama de productos de 
                        ferretería de las mejores marcas, al mismo tiempo que ofrecemos asesoramiento experto y soluciones 
                        prácticas. Nos esforzamos por ser el lugar de referencia donde los profesionales pueden encontrar 
                        todo lo que necesitan para llevar a cabo sus proyectos con éxito.
                    </p>
                </div>
                <div className="left-about">
                    <img src="https://ferreco.com/modules/hiblog/views/img/upload/original/000eba55204a0b757a380fe92df73a10.jpg" alt="Ferretería Román" className="about-image" />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;
