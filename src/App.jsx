import Button from "./components/atoms/Button";
import { useNavigate } from "react-router-dom";
import Input from "./components/atoms/input";
import Label from "./components/atoms/label";
import "./App.css"
import iconoUser from "../public/iconoUser.png";
import facebook from "../public/facebook.png";
import ig from "../public/ig.png";
import twitter from "../public/twitter.png"

function App(){

    const navigate = useNavigate();
    const Enter = () =>{
        console.log("Enter");
        navigate("/Start");

    }

    const Enter2 = () =>{
        console.log("Enter");
        navigate("/Admin");

    }
    return(
    <div id="Login">
        <div id="img"></div>
        <div id="welcome">
            <h1>WELCOME BACK!</h1>
            <span>Bienvenido a Ferretería ------, tu destino confiable para todas tus <br></br>necesidades de construcción y bricolaje, 
                Encuentra una amplia gama de  <br></br> productos de las mejores marcas del mercado.
            </span>
            <div className="img1">
                <img src={facebook}></img>
            </div>
            <div className="img2">    
                <img src={ig}></img>
            </div>
            <div className="img3">
                <img src={twitter}></img>
            </div>
        </div>
        
        <div id="LoginTwo-right">
            <h1>LOGIN</h1>
            <div className="img-iconoUser">
                <img src={iconoUser}></img>
            </div>
            <div className="input">
                <Input text="Name" type= "text"></Input>
                <br></br>
                <br></br>
                <Input text="Password" type= "Password"></Input>
                <br></br>
            </div>
            <br></br>
            <div className="btn">
                <Button className="custom-btn" text = "Ingresar" onClick={Enter}></Button>
            </div>
            <div className="btn">
                <Button className="custom-btn1" text = "Ingresar-admin" onClick={Enter2}></Button>
            </div>
            <div className="register">
                <h3>¿No tienes cuenta? <a href="Register" id="Register">Registrate</a></h3> 
            </div>
        </div>

    </div>
    )
    
}




export default App;