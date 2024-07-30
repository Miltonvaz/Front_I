import React, { useEffect, useState } from "react";
import NavAdmin from "../components/molecules/navAdmin";
import CalendarComponent from "../components/atoms/calendar";
import dayjs from "dayjs";
import "../pages/Delivery.css"; 
import Swal from 'sweetalert2';

function DeliveryAdmin() {
    const [events, setEvents] = useState([]);

    
    const addEventDelivery = () => {
        const startInput = document.getElementById("start").value;
        const endInput = document.getElementById("end").value;
        const titleInput = document.getElementById("title").value;
        const purchaseOrderIdInput = document.getElementById("purchaseOrderId").value;

        
        if (!startInput || !endInput || !titleInput || !purchaseOrderIdInput) {
            Swal.fire({
                icon: 'error',
                title: 'Por favor completa todos los campos.',
            });
            return;
        }

        Swal.fire({
            title: "¿Quieres guardar los cambios?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: `No guardar`
        }).then((result) => {
            if (result.isConfirmed) {
                const newEvent = {
                    start: dayjs(startInput).toDate(), 
                    end: dayjs(endInput).toDate(),     
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
                        start: dayjs(startInput).format(), 
                        end: dayjs(endInput).format(),     
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
                    setEvents((prevEvents) => [...prevEvents, newEvent]); 
                    Swal.fire("Guardado!", "El evento ha sido agregado.", "success");
                    console.log("Respuesta del servidor:", data);
                })
                .catch((error) => {
                    console.error("Error al agregar evento:", error);
                    Swal.fire("Error", "Hubo un error al agregar el evento.", "error");
                });

                document.getElementById("start").value = "";
                document.getElementById("end").value = "";
                document.getElementById("title").value = "";
                document.getElementById("purchaseOrderId").value = "";
            } else if (result.isDenied) {
                Swal.fire("Los cambios no fueron guardados", "", "info");
            }
        });
    };

   
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
            
            const formattedEvents = data.map((event) => ({
                start: new Date(event.start), 
                end: new Date(event.end),     
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
