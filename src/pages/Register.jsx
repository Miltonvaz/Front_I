import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.lastName || !formData.email || !formData.password || !file) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    const data = new FormData();
    data.append('first_name', formData.name);
    data.append('last_name', formData.lastName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('role_id_fk', 3);
    data.append('created_by', "admin_user");
    data.append('userImage', file);

    try {
      const response = await fetch(`http://localhost:3002/api/users`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: data,
      });

      if (response.ok) {
        setSuccess("Registro exitoso. Redirigiendo...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        throw new Error("Error en la solicitud: " + response.statusText);
      }
    } catch (error) {
      setError("Error al registrar usuario: " + error.message);
    }
  };

  return (
    <div className="container-all">
      <div className="h1-Register">
        <div className="register2titleImg">
          <h1>Register</h1>
          <img src="/iconoUser.png" alt="User Icon" />
        </div>
      </div>

      <div className="input-Register">
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <label className="file-label">
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <span className="file-name">{file ? file.name : "Choose file"}</span>
        </label>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <button className="btn-register" onClick={handleSubmit}>
        Registrar
      </button>

      <div className="register-Register">
        <h3>
          Ya tienes una cuenta? <a href="/">Iniciar Sesión</a>
        </h3>
      </div>
    </div>
  );
}

export default Register;
