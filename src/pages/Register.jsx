import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Register.css";

function Register() {
  const navigate = useNavigate();

  const EnterLogin = () => {
    const nameUser = document.getElementById("nameUser").value;
    const lastNameUser = document.getElementById("lastNameUser").value;
    const emailUser = document.getElementById("emailUser").value;
    const passwordUser = document.getElementById("passwordUser").value;

    fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: nameUser,
        last_name: lastNameUser,
        email: emailUser,
        password: passwordUser,
        role_id_fk: 3,
        created_by: "admin_user",
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Error en la solicitud: " + response.statusText);
      })
      .then((datos) => {
        console.log("Datos recibidos:", datos);
        navigate("/"); // Navegar a la página principal después del registro exitoso
      })
      .catch((error) => {
        console.error("Error al registrar usuario:", error);
      });
  };

  return (
    <>
      <div className="container-all">
        <div className="h1-Register">
          <h1>Register</h1>
          <img src="/iconoUser.png" alt="User Icon" />
        </div>

        <div className="input-Register">
          <input type="text" placeholder="First Name" id="nameUser" />
          <br />
          <br />
          <input type="text" placeholder="Last Name" id="lastNameUser" />
          <br />
          <br />
          <input type="email" placeholder="Email" id="emailUser" />
          <br />
          <br />
          <input type="password" placeholder="Password" id="passwordUser" />
        </div>
        <br />
        <button className="btn-register" onClick={EnterLogin}>
          Registrar
        </button>
        <div className="register-Register">
          <h3>
            Ya tienes una cuenta? <a href="/">Iniciar Sesión</a>
          </h3>
        </div>
      </div>
    </>
  );
}

export default Register;
