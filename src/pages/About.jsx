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
                <p id="p-about">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis molestiae eos libero magnam nulla in hic, 
                    cupiditate vero alias quasi veniam saepe pariatur, maxime iste tempora, ab suscipit velit voluptates!
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum exercitationem quo iure obcaecati aliquam ipsum quas eum 
                    sunt rem molestias, cumque, officiis tempore sed nihil, vitae alias nemo cum non?
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas ullam id error impedit alias, aliquid vitae sint doloremque
                     quia obcaecati excepturi temporibus, rerum aspernatur deleniti hic ipsam quam ea aut.</p>
            </div>
        </div>
        <br></br>
        <Footer></Footer>
        </>
    )
}
export default About;