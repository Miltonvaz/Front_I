import React from "react";
import Input from "../components/atoms/input";
import Button from "../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import "../pages/Register.css";


function Register(){

  const navigate = useNavigate();
  const EnterLogin = () =>{
      console.log("Enter");
      navigate("/");

  }
  return(
    <>
    <div className="container-all">
      <div className="h1-Register">
        <h1>Register</h1>
          <img src="/iconoUser.png"></img>
      </div>
      
      <div className="input-Register">
        <Input text="Name" type= "text"></Input>
        <br></br>
        <br></br>
        <Input text="Password" type= "Password"></Input>
        <br></br>
      </div>
        <br></br>
        <Button text = "Registrar" onClick={EnterLogin}></Button>
      <div className="register-Register">
          <h3>Ya cuentas con una cuenta <a href="/" id="Register">Iniciar Sesion</a></h3> 
      </div>
    </div>
    </>
  )
}

export default Register;