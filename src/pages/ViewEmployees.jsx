import React, { useState, useEffect } from 'react';
import "../pages/ViewEmployees.css";
import Calendar from "../components/atoms/calendar";
import HeaderEmployees from "../components/organismos/HeaderEmployees";
import Swal from 'sweetalert2';
import SalesGraph from "../components/atoms/SalesGraph";
import StackedAreaCharts from "../components/atoms/StackedAreaCharts";

function getCurrentDateTime() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = today.toLocaleDateString('es-ES', options); 
    const time = today.toLocaleTimeString('es-ES'); 
    return `${date} ${time}`;
}

const processSalesData = (data) => {
    const groupedData = data.reduce((acc, item) => {
        const existing = acc.find(i => i.name === item.name);
        if (existing) {
            existing.total_sold += item.total_sold;
        } else {
            acc.push({
                name: item.name,
                total_sold: item.total_sold,
                another_metric: item.total_sold 
            });
        }
        return acc;
    }, []);

    return groupedData.map(item => ({
        name: item.name,
        total_sold: item.total_sold,
        another_metric: item.another_metric 
    }));
};

function ViewEmployees() {
    const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());
    const [events, setEvents] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [chartData, setChartData] = useState([]); 

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(getCurrentDateTime());
        }, 1000);

        return () => clearInterval(timer); 
    }, []);

    useEffect(() => {
        fetch('http://localhost:3002/api/event', {
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

    useEffect(() => {
        fetch('http://localhost:3002/api/products/view/most-sold-products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to fetch sales data.');
        })
        .then((data) => {
            setSalesData(data);
            const transformedData = processSalesData(data);
            setChartData(transformedData);
        })
        .catch((error) => {
            console.error('Error al obtener datos de ventas:', error);
            Swal.fire('Error', 'No se pudieron cargar los datos de ventas.', 'error');
        });
    }, []);

    return (
        <>
            <HeaderEmployees />
            <div className="view-employees-container">
                <div className="left-section">
                    <div className="chart-container stacked-area-chart">
                        <StackedAreaCharts data={chartData} />
                    </div>
                    <div className="chart-container sales-graph">
                        <SalesGraph data={salesData} />
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
