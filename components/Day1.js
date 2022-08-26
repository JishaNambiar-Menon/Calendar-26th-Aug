import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day1({ day, rowIdx, month }) {
  const [dayEvents, setDayEvents] = useState([]);

  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
    monthIndex,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  //to highlight today's date
  function getCurrentDayClass() {
   // console.log(monthIndex);

    if (day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")) {
      return "flex flex-grow text-sm mt-0.5 pb-2 ml-24 bg-header-orange text-white items-center rounded-full w-8 h-8 font-dmsans text-md font-bmed";
    } else if (
      day.format("MM") < dayjs().month(monthIndex).format("MM") ||
      day.format("MM") > dayjs().month(monthIndex).format("MM")
    ) {
      //console.log("previous month")
      return "flex justify-end pr-2 pt-2 text-gray-400 font-dmsans text-md font-bmed";
    } else {
      return "";
    }
  }

  return (
    <div className="flex flex-col">
      <div className>
        <header className="flex flex-col items-center">
          {rowIdx === 0 && (
            <p className="font-sans text-header-medgray text-md -mt-6 ">
              {day.format("ddd")}
            </p>
          )}
        </header>
      </div>

      <div
        className="flex-1 h-[20em] cursor-pointer border border-gray-200 items-center"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        <p
          className={`flex pr-2 pt-2 font-dmsans text-md font-bmed justify-end ${getCurrentDayClass()}`}
        >
          {day.format("D")}
        </p>
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 items-center text-gray-600-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}

//className={`text-sm p-5 my-1 items-center text-center ${getCurrentDayClass()}`}
/*<div className>
        <header className="flex flex-col items-center">
          {rowIdx === 0 && (
            <p className="font-dmsans text-header-medgray text-md ">
              {day.format("ddd")}
            </p>
          )}
        </header>
      </div>*/
