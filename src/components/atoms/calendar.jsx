import dayjs from "dayjs";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "../atoms/calendar.css"
import 'react-big-calendar/lib/css/react-big-calendar.css';

function calendar({ events }){
    const localizer = dayjsLocalizer(dayjs);
    return(
        <>
        <Calendar
        localizer={localizer}
        style={{
            height: 500,
            width:500,
        }}
        events={events}
        />

        </>
    )
}
export default calendar;