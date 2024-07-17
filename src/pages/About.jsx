import Footer from "../components/organismos/Footer";
import Header from "../components/organismos/Header";
import "../pages/About.css";

function About(){
    return(
        <>
        <Header></Header>
        <div className="all-about">
            <div className="img-civilesAbout">
                <h2 id="h2-about">NOSOTROS</h2>
                <p id="p-about">En Ferretería "Román", nos enorgullece ser tu proveedor de confianza para todas tus 
                    necesidades de construcción y mejoras del hogar. Nuestra ferretería ha crecido para convertirse en
                     un referente en la comunidad, ofreciendo productos de alta calidad y un servicio al cliente 
                     excepcional Nuestra misión es proporcionar a nuestros clientes una amplia gama de productos de ferretería 
                     de las mejores marcas, al mismo tiempo que ofrecemos asesoramiento experto y soluciones prácticas. Nos esforzamos 
                     por ser el lugar de referencia donde los profesionales pueden encontrar todo lo que necesitan para llevar a cabo 
                     sus proyectos con éxito..</p>
            </div>
        </div>
        <br></br>
        <Footer></Footer>
        </>
    )
}
export default About;