import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import 'react-calendar/dist/Calendar.css';

function ReactCalendar() {
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <Calendar
                locale="ko"
                onChange={onChange}
                value={value}
                next2Label={null}
                prev2Label={null}
                selectRange={true}
                showNeighboringMonth={false}
                formatDay={(locale, date) => moment(date).format("DD")}
                // tileContent={addContent}
                // onActiveStartDateChange={({ activeStartDate }) =>
                //     getActiveMonth(activeStartDate)
                // }
            />
        </div>
    );
}

export default ReactCalendar;