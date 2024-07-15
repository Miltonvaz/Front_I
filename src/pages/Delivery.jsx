
import HeaderEmployees from "../components/organismos/HeaderEmployees";
import Calendar from "../components/atoms/calendar";
import React, { useState, useEffect } from 'react';

function Delivery(){
        return(
            <>
                <HeaderEmployees></HeaderEmployees>
                <h1>Delivery</h1>
                <Calendar></Calendar>
            </>
        )
}

export default Delivery;