    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import Button from './components/atoms/Button';
    import './App.css';
    import iconoUser from '../public/iconoUser.png';




    function App() {
        const navigate = useNavigate();
        const [error, setError] = useState(null);
        const enter = async () => {
            const emailLogin = document.getElementById('input-name').value;
            const passwordLogin = document.getElementById('input-pasword').value;
        
            if (!emailLogin || !passwordLogin) {
                setError('Todos los campos son obligatorios');
                return;
            }
        
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: emailLogin, password: passwordLogin })
                });
        
                if (!response.ok) {
                    throw new Error('Error en la solicitud: ' + response.statusText);
                }
        
                const data = await response.json();
                console.log('Data recibida:', data); 
        
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('email', emailLogin);
                    localStorage.setItem('userId', data.user_id);  
                    
                    console.log('Token recibido:', data.token); 
        
                    switch (data.role) {
                        case 1:
                            navigate('/Admin');
                            break;
                        case 2:
                            navigate('/ViewEmployees');
                            break;
                        case 3:
                            navigate('/Start');
                            break;
                        default:
                            navigate('/Start');  
                            break;
                    }
                } else {
                    setError('Error: No se recibió un token válido del servidor');
                }
            } catch (error) {
                setError('Error en el servidor: ' + error.message);
            }
        };
        


        return (
            <div id="Login">
                <div id="img"></div>
                <div id="welcome">
                    <h1>WELCOME BACK!</h1>
                    <span id="container-spanApp">
                        Bienvenido a Ferretería ROMAN, tu destino confiable para todas tus <br></br>
                        necesidades de construcción y bricolaje, Encuentra una amplia gama de <br></br>
                        productos de las mejores marcas del mercado.
                    </span>
                    <div className="img1">
                        <img src="/faceNew.png" alt="Facebook"></img>
                    </div>
                    <div className="img2">
                        <img src="/igNew.png" alt="Instagram"></img>
                    </div>
                    <div className="img3">
                        <img src="/twitterNew.png" alt="Twitter"></img>
                    </div>
                </div>

                <div id="LoginTwo-right">
                    <h1>LOGIN</h1>
                    <div className="img-iconoUser">
                        <img src={iconoUser} alt="User Icon"></img>
                    </div>
                    <div className="input">
                        <input id="input-name" type="email" placeholder="Email"></input>
                        <br></br>
                        <br></br>
                        <input id="input-pasword" type="password" placeholder="Password"></input>
                        <br></br>
                    </div>
                    <br></br>
                    <div className="btn">
                        <Button id="custon-btn" text="Ingresar" onClick={enter}></Button>
                    </div>
                    <div className="register">
                        <h3>
                            ¿No tienes cuenta? <a href="Register" id="Register">Registrate</a>
                        </h3>
                    </div>
                </div>
            </div>
        );
    }

    export default App;
