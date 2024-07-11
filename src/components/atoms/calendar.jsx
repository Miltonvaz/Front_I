import dayjs from "dayjs";
import { Calendar, dayjsLocalizer } from "react-big-calendar";

function calendar(){
    const localizer = dayjsLocalizer(dayjs);
    return(
        <>
        <Calendar
        localizer={localizer}
        style={{
            height: 500,
            width:500,
        }}
        />

        </>
    )
}
export default calendar;