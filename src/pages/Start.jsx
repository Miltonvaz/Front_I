import React from "react";
import Header from "../components/organismos/Header";
import "../pages/Start.css";
import Footer from "../components/organismos/Footer";

function Start() {
    return (
        <>
            <div className="Header">
                <Header />
            </div>
                
                <div className="slider-box">
                    <ul>
                        <li>
                            <div className="boxMinSlider">
                            <img src="/ventaStart1.png" alt="Start Empleo" id="img-civil" />
                            </div>
                        </li>
                        <li>
                        <div className="boxMinSlider">
                            <img src="/ventaStart2.png" id="img-start2"></img>
                            </div>
                        </li>
                        <li>
                        <div className="boxMinSlider">
                            <img src="/ventaStart3.png" ></img>
                            </div>
                        </li>
                    </ul>
                    
                </div>
            
            <h2 id="h2-start">Explora nuestras marcas</h2>
            <h3>Tenemos más de 13,000 productos en catálogo con 7 marcas especializadas por segmento</h3>
            <div className="box-general">
                <div className="caja" id="truper-box">
                    <p >TRUPER</p>
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

            <h2 id="h2-start">Lo mas nuevo</h2>
            <div className="container-video">
                <div className="frame-video">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/fl72NDMD6wc?si=OLmy8bgG6_ogM6g8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div className="frame-video">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/J3uv0-fZRqk?si=rdYemjhAf6EnJwG-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
            <h2 id="h2-start">Productos destacados </h2>
            <div className="container-productos">
                <div className="box-productos">
                   caja1 
                </div>
                <div className="box-productos">
                   caja2 
                </div>
                <div className="box-productos">
                   caja3 
                </div>
                <div className="box-productos">
                   caja4 
                </div>
                <div className="box-productos">
                   caja5 
                </div>
            </div>

            <Footer></Footer>
        </>
    );
}

export default Start;
