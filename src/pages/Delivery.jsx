import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import CalendarComponent from "../components/atoms/calendar";
import Swal from "sweetalert2";
import HeaderEmployees from "../components/organismos/HeaderEmployees";
import "../pages/Delivery.css";

function Delivery() {
    const [events, setEvents] = useState([]);

   
    const addEventDelivery = () => {
        const startInput = document.getElementById("start").value;
        const endInput = document.getElementById("end").value;
        const titleInput = document.getElementById("title").value;
        const idPurchase = document.getElementById("PurchaseOrder").value;

        if (!startInput || !endInput || !titleInput || !idPurchase) {
            Swal.fire("Error", "Por favor completa todos los campos.", "error");
            return;
        }

        const newEvent = {
            start: dayjs(startInput).toDate(),
            end: dayjs(endInput).toDate(),
            title: titleInput,
            created_by: "admin",
            purchaseOrder_id_fk: idPurchase,
        };

        fetch(`http://localhost:3002/api/event`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                start: dayjs(startInput).format(),
                end: dayjs(endInput).format(),
                title: titleInput,
                created_by: "user123",
                purchaseOrder_id_fk: idPurchase,
            }),
        })
        .then((response) => {
            if (response.ok) {
                Swal.fire("Success", "Evento agregado exitosamente a la base de datos.", "success");
                return response.json();
            } else {
                throw new Error("Error en la solicitud: " + response.statusText);
            }
        })
        .then((data) => {
            setEvents((prevEvents) => [...prevEvents, newEvent]);
            console.log("Respuesta del servidor:", data);
        })
        .catch((error) => {
            console.error("Error al agregar evento:", error);
            Swal.fire("Error", "Hubo un problema al agregar el evento.", "error");
        });

      
        document.getElementById("start").value = "";
        document.getElementById("end").value = "";
        document.getElementById("title").value = "";
        document.getElementById("PurchaseOrder").value = "";
    };

    useEffect(() => {
        fetch(`http://localhost:3002/api/event`, {
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
            const formattedEvents = data.map((event) => ({
                start: new Date(event.start),
                end: new Date(event.end),
                title: event.title,
            }));
            setEvents(formattedEvents);
        })
        .catch((error) => {
            console.error("Error al obtener eventos:", error);
            Swal.fire("Error", "No se pudieron cargar los eventos.", "error");
        });
    }, []);

    return (
        <>
            <HeaderEmployees />
            <div className="titleDelivery">
                <h1>Delivery</h1>
            </div>
            <div className="calendarDelivery">
                <CalendarComponent events={events} />
                <div className="inputGroup">
                    <input type="datetime-local" id="start" placeholder="Start Date" />
                    <input type="datetime-local" id="end" placeholder="End Date" />
                    <input type="text" id="title" placeholder="Event Title" />
                    <input type="text" id="PurchaseOrder" placeholder="Purchase Order ID" />
                </div>
                <button type="button" onClick={addEventDelivery}>Add Event</button>
            </div>
        </>
    );
}

export default Delivery;
