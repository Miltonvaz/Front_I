import SalesGraph from "../components/atoms/SalesGraph";
import StackedAreaCharts from "../components/atoms/StackedAreaCharts";
import React, { useState, useEffect } from 'react';
import "../pages/ViewEmployees.css";
import Calendar from "../components/atoms/calendar";
import HeaderEmployees from "../components/organismos/HeaderEmployees";
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

function getCurrentDateTime() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = today.toLocaleDateString('es-ES', options); 
    const time = today.toLocaleTimeString('es-ES'); 
    return `${date} ${time}`;
}

function ViewEmployees() {
    const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(getCurrentDateTime());
        }, 1000);

        return () => clearInterval(timer); 
    }, []);

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
            Swal.fire("Error", "No se pudieron cargar los eventos.", "error");
        });
    }, []);

    return (
        <>
            <HeaderEmployees />
            <div className="view-employees-container">
                <div className="left-section">
                    <div className="chart-container stacked-area-chart">
                        <StackedAreaCharts />
                    </div>
                    <div className="chart-container sales-graph">
                        <SalesGraph />
                    </div>
                </div>
                <div className="right-section">
                    <div className="calendar-container">
                        <Calendar events={events} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewEmployees;
