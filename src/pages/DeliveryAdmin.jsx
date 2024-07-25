import React, { useEffect, useState } from 'react';
import NavAdmin from "../components/molecules/navAdmin";
import CalendarComponent from "../components/atoms/calendar";
import dayjs from "dayjs";

function DeliveryAdmin() {
    const [deliveryAdmin, setDeliveryAdmin] = useState([]);
    const [bandera, setBandera] = useState(false);
    const [events, setEvents] = useState([
        {
            start: dayjs("2024-07-15T12:00:00").toDate(),
            end: dayjs("2024-07-15T14:00:00").toDate(),
            title: "Event 1",
        },
    ]);

    const addEventDelivery = () => {
        const startInput = document.getElementById("start").value;
        const endInput = document.getElementById("end").value;
        const titleInput = document.getElementById("title").value;

        if (!startInput || !endInput || !titleInput) {
            alert("Por favor completa todos los campos.");
            return;
        }

        const newEvent = {
            start: dayjs(startInput).toDate(),
            end: dayjs(endInput).toDate(),
            title: titleInput,
            created_by: "admin",
            purchaseOrder_id_fk: 6 
        };

    
        fetch(`${import.meta.env.VITE_API_URL}/api/event`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                start: dayjs(startInput).format(), 
                end: dayjs(endInput).format(), 
                title: titleInput,
                created_by: 'user123',
                purchaseOrder_id_fk: 6 
                
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Evento agregado exitosamente a la base de datos.');
                return response.json();
            } else {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
        })
        .then(data => {
            setEvents([...events, newEvent]); 
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error al agregar evento:', error);
        });

        document.getElementById("start").value = "";
        document.getElementById("end").value = "";
        document.getElementById("title").value = "";
    };


    useEffect(() =>{
        fetch(`${import.meta.env.VITE_API_URL}/api/event`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            setDeliveryAdmin(data);
            setBandera(true);
            console.log(data)
        })
        .catch(error => {
            console.error('Error al obtener eventos:', error);
        })
    }, [bandera]);
    return (
        <>
            <NavAdmin />
            <h1>Delivery</h1>
            <CalendarComponent events={events} />
            <input type="datetime-local" id="start" placeholder="Start Date" />
            <input type="datetime-local" id="end" placeholder="End Date" />
            <input type="text" id="title" placeholder="Event Title" />
            <button type="button" onClick={addEventDelivery}>Add Event</button>
        </>
    );
}

export default DeliveryAdmin;
