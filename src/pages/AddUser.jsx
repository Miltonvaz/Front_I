import React, { useState, useEffect } from 'react';
import "../pages/Employees.css";
import PlusButton from "../components/atoms/PlusBtn";
import NavAdmin from "../components/molecules/navAdmin";
import CardsEmployees from "../components/molecules/CardsEmployees";
import Button from "../components/atoms/Button";
import Swal from "sweetalert2";
import HeaderEmployees from '../components/organismos/HeaderEmployees';

function AddUser() {
    const [datos, setDatos] = useState([]);
    const [fetchError, setFetchError] = useState(null); 
    const [userIdToDelete, setUserIdToDelete] = useState(''); 
    const [bandera, setBandera] = useState(false);

    useEffect(() => {
        console.log('Fetching data...');
        fetch(`${import.meta.env.VITE_API_URL}/api/users/clientes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched:', data);
            data.forEach(user => {
                console.log('Users:', user);
                console.log('Image URL:', user.image_url); 
            });
            setDatos(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            setFetchError(error.message);
        });
    }, [bandera]); 

    const deleteUser = () => {
        if (!userIdToDelete) {
            Swal.fire({
                title: "Error",
                text: "Por favor, ingrese un ID de usuario.",
                icon: "error",
            });
            return;
        }

        Swal.fire({
            title: "¿Está seguro de eliminar?",
            text: "No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_API_URL}/api/users/${userIdToDelete}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete user.');
                    }
                    setDatos(datos.filter(user => user.id !== parseInt(userIdToDelete)));
                    setUserIdToDelete(''); 
                    setBandera(!bandera); 
                    Swal.fire({
                        title: "Eliminado!",
                        text: "El usuario ha sido eliminado.",
                        icon: "success"
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        });
    };

    const addUser = async () => {
        Swal.fire({
            title: "Agregar Usuario",
            html: `
                <img src="/iconoUserMasculino.png" alt="Icono Usuario" class="swal-img" id="img">
                <div class="custom-file-input-container">
                    <label class="custom-file-label" for="img-user">Seleccionar archivo...</label>
                    <input id="img-user" class="swal2-input custom-file-input" type="file" style="display:none;">
                    <span id="swal-file-name" class="swal-file-name">Ningún archivo seleccionado</span>
                </div>
                <input id="swal-input1" class="swal2-input" placeholder="Nombre">
                <input id="swal-input2" class="swal2-input" placeholder="Apellido">
                <input id="swal-input3" class="swal2-input" placeholder="Email">
                <input id="swal-input4" class="swal2-input" placeholder="Password">
            `,
            customClass: {
                popup: 'custom-swal-popup'
            },
            showCancelButton: true,
            confirmButtonText: 'Agregar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                const name = document.getElementById('swal-input1').value;
                const lastName = document.getElementById('swal-input2').value;
                const email = document.getElementById('swal-input3').value;
                const password = document.getElementById('swal-input4').value;
                const file = document.getElementById('img-user').files[0];
                
                const formData = new FormData();
                formData.append('first_name', name);
                formData.append('last_name', lastName);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('role_id_fk', 3);
                formData.append('created_by', "admin_user");
                
                if (file) {
                    formData.append('userImage', file);
                }else{
                    formData.append('userImage', defaultFile);
                }
                console.log('Form Data:', formData);
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
                      method: "POST",
                      headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                      },
                      body: formData,
                    });
              
                    if (response.ok) {
                        const data = await response.json();
                        console.log('Data:', data);
                        setBandera(!bandera); 
                    } else {
                     console.log("Error en la solicitud: " + response.statusText);
                    }
                  } catch (error) {
                    console.log("Error al registrar usuario: " + error.message);
                  }
               
            }
        });
    
        const defaultFile = "/iconoUserMasculino.png";
        const fileInput = document.getElementById("img-user");
        const img = document.getElementById("img");
    
        fileInput.addEventListener('change', e => {
            if (e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    img.src = e.target.result;
                }
                reader.readAsDataURL(e.target.files[0]);
            } else {
                img.src = defaultFile;
            }
        });
    }

    return (
        <>
            <div className="employees-all">
                <HeaderEmployees></HeaderEmployees>
                <div className="h1empleados">
                    <h1>Agregar Usuarios</h1>
                </div>
    
                <div className="view-Employes">
                    <div className="view-Employes-1">
                        <div className="sub-viewEmployes1">
                            <p>Usuarios existentes</p>
                        </div>
                        <div className="sub-viewEmployes1">
                            <div className="espaciadoEmployees">
                                <input 
                                    placeholder="id Usuario" 
                                    value={userIdToDelete} 
                                    onChange={(e) => setUserIdToDelete(e.target.value)}
                                />
                            </div>
                            <div className="espaciadoEmployees">
                                <Button text="Eliminar" onClick={deleteUser} />
                            </div>
                            <div className="espaciadoEmployees">
                                <Button text="+" onClick={addUser}></Button>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="view-EmployesCards">
                    {datos.map(element => (
                    <CardsEmployees key={element.id}  text={`${element.first_name} ${element.last_name} ${element.email} ${element.user_id}`} imageUrl={element.url} />
                    ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddUser;
