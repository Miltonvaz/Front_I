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
                    <p>Comitan Dominguez, Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, excepturi maiores iure nulla quis totam suscipit possimus perferendis doloremque facere nostrum sapiente recusandae similique exercitationem eum nesciunt dolorum ea a?</p>
                </div>
                <div className="siguenos">
                    <p>SÍGUENOS</p>
                </div>
            </div> 
                <div className="img-contacto">
                    <img src="/ferreteriaContact.jpeg"></img>
                </div>
        </div>
        </>
    )
}

export default Contacto;