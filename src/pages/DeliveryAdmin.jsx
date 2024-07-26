import React, { useEffect, useState } from "react";
import NavAdmin from "../components/molecules/navAdmin";
import CalendarComponent from "../components/atoms/calendar";
import dayjs from "dayjs";
import "../pages/Delivery.css"; // Asegúrate de que la ruta sea correcta

function DeliveryAdmin() {
    const [events, setEvents] = useState([]);

    // Función para añadir un nuevo evento
    const addEventDelivery = () => {
        const startInput = document.getElementById("start").value;
        const endInput = document.getElementById("end").value;
        const titleInput = document.getElementById("title").value;
        const purchaseOrderIdInput = document.getElementById("purchaseOrderId").value;

        if (!startInput || !endInput || !titleInput || !purchaseOrderIdInput) {
            alert("Por favor completa todos los campos.");
            return;
        }

        const newEvent = {
            start: dayjs(startInput).toDate(), // Convertir a objeto Date
            end: dayjs(endInput).toDate(),     // Convertir a objeto Date
            title: titleInput,
            created_by: "admin",
            purchaseOrder_id_fk: purchaseOrderIdInput,
        };

        fetch(`${import.meta.env.VITE_API_URL}/api/event`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                start: dayjs(startInput).format(), // Formato para la API
                end: dayjs(endInput).format(),     // Formato para la API
                title: titleInput,
                created_by: "user123",
                purchaseOrder_id_fk: purchaseOrderIdInput,
            }),
        })
        .then((response) => {
            if (response.ok) {
                console.log("Evento agregado exitosamente a la base de datos.");
                return response.json();
            } else {
                throw new Error("Error en la solicitud: " + response.statusText);
            }
        })
        .then((data) => {
            setEvents((prevEvents) => [...prevEvents, newEvent]); // Actualizar el estado con el nuevo evento
            console.log("Respuesta del servidor:", data);
        })
        .catch((error) => {
            console.error("Error al agregar evento:", error);
        });

        // Limpiar campos
        document.getElementById("start").value = "";
        document.getElementById("end").value = "";
        document.getElementById("title").value = "";
        document.getElementById("purchaseOrderId").value = "";
    };

    // Cargar eventos al montar el componente
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/event`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Failed to fetch events.");
        })
        .then((data) => {
            // Formatear los eventos para el componente del calendario
            const formattedEvents = data.map((event) => ({
                start: new Date(event.start), // Convertir a objeto Date
                end: new Date(event.end),     // Convertir a objeto Date
                title: event.title,
            }));

            setEvents(formattedEvents);
        })
        .catch((error) => {
            console.error("Error al obtener eventos:", error);
        });
    }, []);

    return (
        <>
            <NavAdmin />
            <h1 className="titleDelivery">Delivery</h1>
            <div className="calendarDelivery">
                <CalendarComponent events={events} />
                <div className="inputGroup">
                    <input type="datetime-local" id="start" placeholder="Start Date" />
                    <input type="datetime-local" id="end" placeholder="End Date" />
                    <input type="text" id="title" placeholder="Event Title" />
                    <input type="text" id="purchaseOrderId" placeholder="Purchase Order ID" />
                </div>
                <button type="button" onClick={addEventDelivery}>
                    Add Event
                </button>
            </div>
        </>
    );
}

export default DeliveryAdmin;
