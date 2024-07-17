import Footer from "../components/organismos/Footer";
import Header from "../components/organismos/Header";
import "../pages/Contacto.css";

function Contacto(){
    return(
        <>
        <Header />
        <div className="fatherAll">
            <div className="all-contacto">
                <div className="h1-contacto">
                    <h1>UBICACION</h1>
                </div>
                <div className="text-contacto">
                    <p>Ferretería "Román" <br></br>
                    Dirección: 11A. Calle Sur Pte 11-62, Nicalocok, 30068 Comitán de Domínguez, Chis.<br></br>
                    Tel: 800 888 877 <br></br>
                    RomanFerreteria@gmail.com
                    </p>
                </div>
                <div className="siguenos">
                   
                </div>
            </div> 
                <div className="img-contacto">
                    <img src="/ferreteriaContact.jpeg"></img>
                </div>

                
        </div>
        <Footer></Footer>
        </>
    )
}

export default Contacto;